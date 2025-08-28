package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"viktorvarga.dev/poke/models"
	"viktorvarga.dev/poke/utils"
)

func signup(context *gin.Context) {
	var userCreate models.UserInput

	err := context.ShouldBindJSON(&userCreate)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input: " + err.Error()})
		return
	}

	user := models.User{
		Email:    userCreate.Email,
		Password: userCreate.Password,
	}

	err = user.Save()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create user: " + err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": "User created successfully"})
}

func login(context *gin.Context) {
	var userLogin models.UserInput

	err := context.ShouldBindJSON(&userLogin)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	user := models.User{
		Email:    userLogin.Email,
		Password: userLogin.Password,
	}

	err = user.ValidateCredentials()

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials"})
		return
	}

	token, err := utils.GenerateToken(user.Email, user.ID)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate token"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Login successful", "token": token})

}

func checkUser(context *gin.Context) {
	userId := context.GetInt64("userId")

	_, err := models.GetUser(userId)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "User doesn't exist"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "User exists"})
}
