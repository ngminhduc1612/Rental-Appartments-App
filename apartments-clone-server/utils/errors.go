package utils

import (
	"fmt"

	"github.com/go-playground/validator/v10"
	"github.com/kataras/iris/v12"
)

func CreateError(statusCode int, title string, detail string, ctx iris.Context) {
	ctx.StopWithProblem(statusCode, iris.NewProblem().Title(title).Detail(detail))
}

func CreateInternalServerError(ctx iris.Context) { //status code 500
	CreateError(iris.StatusInternalServerError,
		"Internal Server Error",
		"Internal Server Error",
		ctx)
}

func HandleValidationErrors(err error, ctx iris.Context) {
	if errs, ok := err.(validator.ValidationErrors); ok {
		validationErrors := wrapValidationErrors(errs)

		fmt.Println("validationErrors", validationErrors)
		ctx.StopWithProblem(
			iris.StatusBadRequest,
			iris.NewProblem().
				Title("Validation error").
				Detail("One or more fields failed to be validated").
				Key("errors", validationErrors))

		return
	}
	CreateInternalServerError(ctx)
}

func wrapValidationErrors(errs validator.ValidationErrors) []validationError {
	validationErrors := make([]validationError, 0, len(errs))
	for _, validationErr := range errs {
		validationErrors = append(validationErrors, validationError{
			ActualTag: validationErr.ActualTag(),
			Namespace: validationErr.Namespace(),
			Kind:      validationErr.Kind().String(),
			Type:      validationErr.Type().String(),
			Value:     fmt.Sprintf("%v", validationErr.Value()),
			Param:     validationErr.Param(),
		})
	}

	return validationErrors
}

func CreateNotFound(ctx iris.Context) {
	ctx.StatusCode(iris.StatusNotFound)
	ctx.Text("Not Found")
}

type validationError struct {
	ActualTag string `json:"tag"`
	Namespace string `json:"namespace"`
	Kind      string `json:"kind"`
	Type      string `json:"type"`
	Value     string `json:"value"`
	Param     string `json:"param"`
}
