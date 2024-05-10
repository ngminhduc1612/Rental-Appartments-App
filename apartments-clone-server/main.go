package main

import (
	"apartments-clone-server/routes"
	"apartments-clone-server/storage"

	"github.com/go-playground/validator/v10"
	"github.com/kataras/iris/v12"
	"github.com/lpernett/godotenv"
)

func main() {
	godotenv.Load()
	storage.InitializeDB()

	app := iris.Default()
	app.Validator = validator.New() //validate

	location := app.Party("/api/location")
	{
		location.Get("/autocomplete", routes.Autocomplete)
		location.Get("/search", routes.Search)
	}
	user := app.Party("/api/user")
	{
		user.Post("/register", routes.Register)
		user.Post("/login", routes.Login)
	}

	app.Listen(":4000")
}
