package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"viktorvarga.dev/poke/db"
	"viktorvarga.dev/poke/routes"
)

func main() {
	db.InitDB()
	server := gin.Default()

	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
	}))

	routes.RegisterRoutes(server)

	server.Run(":8080")
}
