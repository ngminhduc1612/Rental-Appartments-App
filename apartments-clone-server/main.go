package main

import (
	"apartments-clone-server/routes"
	"apartments-clone-server/storage"
	"apartments-clone-server/utils"
	"os"

	"github.com/go-playground/validator/v10"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/jwt"
	"github.com/lpernett/godotenv"
)

func main() {
	godotenv.Load()
	storage.InitializeDB()
	storage.InitializeS3()

	app := iris.Default()
	app.Validator = validator.New() //validate

	resetTokenVerifier := jwt.NewVerifier(jwt.HS256, []byte(os.Getenv("EMAIL_TOKEN_SECRET")))
	resetTokenVerifier.WithDefaultBlocklist()
	resetTokenVerifierMiddleware := resetTokenVerifier.Verify(func() interface{} {
		return new(utils.ForgotPasswordToken)
	})

	location := app.Party("/api/location")
	{
		location.Get("/autocomplete", routes.Autocomplete)
		location.Get("/search", routes.Search)
	}
	user := app.Party("/api/user")
	{
		user.Post("/register", routes.Register)
		user.Post("/login", routes.Login)
		user.Post("/forgotpassword", routes.ForgotPassword)
		user.Post("/resetpassword", resetTokenVerifierMiddleware, routes.Resetpassword)
	}
	property := app.Party("/api/property")
	{
		property.Post("/create", routes.CreateProperty)
		property.Get("/{id}", routes.GetProperty)
		property.Get("/userid/{id}", routes.GetPropertiesByUserID)
		property.Delete("/{id}", routes.DeleteProperty)
		property.Patch("/update/{id}", routes.UpdateProperty)
	}

	app.Listen(":4000")
}
