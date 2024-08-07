package routes

import (
	"apartments-clone-server/models"
	"apartments-clone-server/storage"
	"apartments-clone-server/utils"
	"encoding/json"
	"strconv"
	"strings"

	"github.com/kataras/iris/v12"
	jsonWT "github.com/kataras/iris/v12/middleware/jwt"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/exp/slices"
)

func Register(ctx iris.Context) {
	var userInput RegisterUserInput
	err := ctx.ReadJSON(&userInput)
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}

	var newUser models.User
	userExists, userExistErr := getAndHandleUserExists(&newUser, userInput.Email)
	if userExistErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	if userExists == true {
		utils.CreateError(
			iris.StatusConflict,
			"Conflict",
			"Email already registerd.",
			ctx,
		)
		return
	}

	hashedPassword, hashErr := hashAndSaltPassword(userInput.Password)
	if hashErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	newUser = models.User{
		FirstName:   userInput.FirstName,
		LastName:    userInput.LastName,
		Email:       strings.ToLower(userInput.Email),
		Password:    hashedPassword,
		SocialLogin: false}

	storage.DB.Create(&newUser)

	ctx.JSON(iris.Map{
		"ID":                  newUser.ID,
		"firstName":           newUser.FirstName,
		"lastName":            newUser.LastName,
		"email":               newUser.Email,
		"savedProperties":     newUser.SavedProperties,
		"allowsNotifications": newUser.AllowsNotifications,
	})
}

func Login(ctx iris.Context) {
	var userInput LoginUserInput
	err := ctx.ReadJSON(&userInput)
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}

	var existingUser models.User
	errorMsg := "Invalid email or password."
	userExists, userExistsErr := getAndHandleUserExists(&existingUser, userInput.Email)
	if userExistsErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	if userExists == false {
		utils.CreateError(iris.StatusUnauthorized, "Credentials Error", errorMsg, ctx)
		return
	}

	// Cho người sử dụng biết họ đã log kiểu socialLog rồi
	if existingUser.SocialLogin == true {
		utils.CreateError(iris.StatusUnauthorized, "Credentials Error", "Social Login Account", ctx)
		return
	}

	passwordErr := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(userInput.Password))
	if passwordErr != nil {
		utils.CreateError(iris.StatusUnauthorized, "Credentials Error", errorMsg, ctx)
		return
	}

	ctx.JSON(iris.Map{
		"ID":                  existingUser.ID,
		"firstName":           existingUser.FirstName,
		"lastName":            existingUser.LastName,
		"email":               existingUser.Email,
		"savedProperties":     existingUser.SavedProperties,
		"allowsNotifications": existingUser.AllowsNotifications,
	})
}

func ForgotPassword(ctx iris.Context) {
	var emailInput EmailRegisteredInput
	err := ctx.ReadJSON(&emailInput)
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}

	var user models.User
	userExists, userExistsErr := getAndHandleUserExists(&user, emailInput.Email)

	if userExistsErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	if !userExists {
		utils.CreateError(iris.StatusUnauthorized, "Credentials Error", "Invalid email.", ctx)
		return
	}

	if userExists {
		if user.SocialLogin {
			utils.CreateError(iris.StatusUnauthorized, "Credentials Error", "Social Login Account", ctx)
			return
		}

		link := "exp://192.168.145.108:8081/--/resetpassword/"
		token, tokenErr := utils.CreateForgotPasswordToken(user.ID, user.Email)

		if tokenErr != nil {
			utils.CreateInternalServerError(ctx)
			return
		}

		link += token
		subject := "Forgot Your Password?"

		html := `
		<p>It looks like you forgot your password.
		If you did, please click the link below to reset it.
		If you did not, disregard this email. Please update your password
		within 10 minutes, otherwise you will have to repeat this
		process. <a href=` + link + `>Click to Reset Password</a>
		</p><br />`

		emailSent, emailSentErr := utils.SendMail(user.Email, subject, html)
		if emailSentErr != nil {
			utils.CreateInternalServerError(ctx)
			return
		}

		if emailSent {
			ctx.JSON(iris.Map{
				"emailSent": true,
			})
			return
		}

		ctx.JSON(iris.Map{"emailSent": false})
	}
}

func Resetpassword(ctx iris.Context) {
	var password ResetPasswordInput
	err := ctx.ReadJSON(&password)
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}

	hashedPassword, hashErr := hashAndSaltPassword(password.Password)
	if hashErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	claims := jsonWT.Get(ctx).(*utils.ForgotPasswordToken)

	var user models.User
	storage.DB.Model(&user).Where("id = ?", claims.ID).Update("password", hashedPassword)

	ctx.JSON(iris.Map{
		"passwordReset": true,
	})
}

func GetUserSavedProperties(ctx iris.Context) {
	params := ctx.Params()
	id := params.Get("id")

	user := getUserByID(id, ctx)
	if user == nil {
		return
	}

	var properties []models.Property
	var savedProperties []uint
	unmarshalErr := json.Unmarshal(user.SavedProperties, &savedProperties)
	if unmarshalErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	propertiesExist := storage.DB.Where("id IN ?", savedProperties).Find(&properties)

	if propertiesExist.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	ctx.JSON(properties)
}

func AlterUserSavedProperties(ctx iris.Context) {
	params := ctx.Params()
	id := params.Get("id")

	user := getUserByID(id, ctx)
	if user == nil {
		return
	}

	var req AlterSavedPropertiesInput
	err := ctx.ReadJSON(&req)
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}

	propertyID := strconv.FormatUint(uint64(req.PropertyID), 10)

	validPropertyID := GetPropertyAndAssociationsByPropertyID(propertyID, ctx)

	if validPropertyID == nil {
		return
	}

	var savedProperties []uint
	var unMarshalledProperties []uint

	if user.SavedProperties != nil {
		unmarshalErr := json.Unmarshal(user.SavedProperties, &unMarshalledProperties)

		if unmarshalErr != nil {
			utils.CreateInternalServerError(ctx)
			return
		}
	}

	if req.Op == "add" {
		if !slices.Contains(unMarshalledProperties, req.PropertyID) {
			savedProperties = append(unMarshalledProperties, req.PropertyID)
		} else {
			savedProperties = unMarshalledProperties
		}
	} else if req.Op == "remove" && len(unMarshalledProperties) > 0 {
		for _, propertyID := range unMarshalledProperties {
			if req.PropertyID != propertyID {
				savedProperties = append(savedProperties, propertyID)
			}
		}
	}

	marshalledProperties, marshalErr := json.Marshal(savedProperties)

	if marshalErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	user.SavedProperties = marshalledProperties

	rowsUpdated := storage.DB.Model(&user).Updates(user)

	if rowsUpdated.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	ctx.StatusCode(iris.StatusNoContent)
}

func GetUserContactedProperties(ctx iris.Context) {
	params := ctx.Params()
	id := params.Get("id")

	var conversations []models.Conversation
	conversationsExist := storage.DB.Where("tenant_id = ?", id).Find(&conversations)
	if conversationsExist.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	if conversationsExist.RowsAffected == 0 {
		utils.CreateNotFound(ctx)
		return
	}

	var properties []models.Property
	var propertyIDs []uint
	for _, conversation := range conversations {
		propertyIDs = append(propertyIDs, conversation.PropertyID)
	}

	propertiesExist := storage.DB.Where("id IN ?", propertyIDs).Find(&properties)

	if propertiesExist.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	ctx.JSON(properties)
}

func AlterPushToken(ctx iris.Context) {
	params := ctx.Params()
	id := params.Get("id")

	user := getUserByID(id, ctx)
	if user == nil {
		return
	}

	var req AlterPushTokenInput
	err := ctx.ReadJSON(&req)
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}

	var unMarshalledTokens []string
	var pushTokens []string

	if user.PushTokens != nil {
		unmarshalErr := json.Unmarshal(user.PushTokens, &unMarshalledTokens)

		if unmarshalErr != nil {
			utils.CreateInternalServerError(ctx)
			return
		}
	}

	if req.Op == "add" {
		if !slices.Contains(unMarshalledTokens, req.Token) {
			pushTokens = append(unMarshalledTokens, req.Token)
		} else {
			pushTokens = unMarshalledTokens
		}
	} else if req.Op == "remove" && len(unMarshalledTokens) > 0 {
		for _, token := range unMarshalledTokens {
			if req.Token != token {
				pushTokens = append(pushTokens, token)
			}
		}
	}

	marshalledTokens, marshalErr := json.Marshal(pushTokens)

	if marshalErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	user.PushTokens = marshalledTokens

	rowsUpdated := storage.DB.Model(&user).Updates(user)

	if rowsUpdated.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	ctx.StatusCode(iris.StatusNoContent)
}

func AllowsNotifications(ctx iris.Context) {
	params := ctx.Params()
	id := params.Get("id")

	user := getUserByID(id, ctx)
	if user == nil {
		return
	}

	var req AllowsNotificationsInput
	err := ctx.ReadJSON(&req)
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}

	user.AllowsNotifications = req.AllowsNotifications

	rowsUpdated := storage.DB.Model(&user).Updates(user)

	if rowsUpdated.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	ctx.StatusCode(iris.StatusNoContent)
}

func getAndHandleUserExists(user *models.User, email string) (exists bool, err error) {
	userExistQuery := storage.DB.Where("email = ?", strings.ToLower(email)).Limit(1).Find(&user)

	if userExistQuery.Error != nil {
		return false, userExistQuery.Error
	}

	userExists := userExistQuery.RowsAffected > 0

	if userExists == true {
		return true, nil
	}

	return false, nil
}

func hashAndSaltPassword(password string) (hashedPassword string, err error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(bytes), nil
}

func getUserByID(id string, ctx iris.Context) *models.User {
	var user models.User
	userExist := storage.DB.Where("id = ?", id).Find(&user)

	if userExist.Error != nil {
		utils.CreateInternalServerError(ctx)
		return nil
	}

	if userExist.RowsAffected == 0 {
		utils.CreateError(iris.StatusNotFound, "Not Found", "User not found", ctx)
		return nil
	}

	return &user
}

type RegisterUserInput struct {
	FirstName string `json:"firstName" validate:"required,max=256"`
	LastName  string `json:"lastName" validate:"required,max=256"`
	Email     string `json:"email" validate:"required,max=256,email"`
	Password  string `json:"password" validate:"required,min=8,max=256"`
}

type LoginUserInput struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type EmailRegisteredInput struct {
	Email string `json:"email" validate:"required"`
}

type ResetPasswordInput struct {
	Password string `json:"password" validate:"required,min=8,max=256"`
}

type AlterSavedPropertiesInput struct {
	PropertyID uint   `json:"propertyID" validate:"required"`
	Op         string `json:"op" validate:"required"`
}

type AlterPushTokenInput struct {
	Token string `json:"token" validate:"required"`
	Op    string `json:"op" validate:"required"`
}

type AllowsNotificationsInput struct {
	AllowsNotifications *bool `json:"allowsNotifications" validate:"required"`
}
