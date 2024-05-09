package routes

import (
	"apartments-clone-server/models"
	"apartments-clone-server/storage"
	"fmt"
	"strings"

	"github.com/kataras/iris/v12"
	"golang.org/x/crypto/bcrypt"
)

func Register(ctx iris.Context) {
	var userInput RegisterUserInput
	err := ctx.ReadJSON(&userInput)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	var newUser models.User
	userExists, userExistErr := getAndHandleUserExists(&newUser, userInput.Email)
	if userExistErr != nil {
		fmt.Println(userExistErr.Error())
		return
	}

	if userExists == true {
		fmt.Println("User exists")
		return
	}

	hashedPassword, hashErr := hashAndHandleUserExists(userInput.Password)
	if hashErr != nil {
		fmt.Println(hashErr.Error())
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

func hashAndHandleUserExists(password string) (hashedPassword string, err error) {
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
