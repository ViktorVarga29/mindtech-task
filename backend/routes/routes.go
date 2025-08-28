package routes

import (
	"github.com/gin-gonic/gin"
	"viktorvarga.dev/poke/middlewares"
)

func RegisterRoutes(server *gin.Engine) {
	server.POST("/signup", signup)
	server.POST("/login", login)

	authenticated := server.Group("/")
	authenticated.Use(middlewares.Authenticate)
	authenticated.POST("/catch", createCatch)
	authenticated.POST("/release", deleteCatch)
	authenticated.GET("/list", getCatches)
}
