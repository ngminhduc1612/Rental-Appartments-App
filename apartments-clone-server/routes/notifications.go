package routes

import (
	"apartments-clone-server/utils"

	"github.com/kataras/iris/v12"
)

func TestMessageNotification(ctx iris.Context) {
	data := map[string]string{
		"url": "exp:/192.168.145.108:8081/--/messages/101",
	}

	err := utils.SendNotification(
		"ExponentPushToken[oUtzqxMyx8g6VMmhnelHp-]",
		"Push Title", "Push body is this message", data)
	if err != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	ctx.JSON(iris.Map{
		"sent": true,
	})
}
