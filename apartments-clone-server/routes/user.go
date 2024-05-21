package routes

import (
	"apartments-clone-server/models"
	"apartments-clone-server/storage"
	"apartments-clone-server/utils"
	"strings"

	"github.com/kataras/iris/v12"
	jsonWT "github.com/kataras/iris/v12/middleware/jwt"
	"golang.org/x/crypto/bcrypt"
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
		"ID":        newUser.ID,
		"firstName": newUser.FirstName,
		"lastName":  newUser.LastName,
		"email":     newUser.Email,
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
		"ID":        existingUser.ID,
		"firstName": existingUser.FirstName,
		"lastName":  existingUser.LastName,
		"email":     existingUser.Email,
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

		link := "exp://192.168.88.223:8081/--/resetpassword/"
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
