package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"viktorvarga.dev/poke/models"
)

func createCatch(context *gin.Context) {
	var catchInput models.CatchInput
	err := context.ShouldBindJSON(&catchInput)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input: " + err.Error()})
		return
	}

	userId := context.GetInt64("userId")

	catch := models.Catch{
		UserID:  userId,
		Pokemon: catchInput.Pokemon,
	}

	err = catch.Save()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to save catch"})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": "Caught pokemon successfully"})
}

func deleteCatch(context *gin.Context) {
	var catchInput models.CatchInput
	err := context.ShouldBindJSON(&catchInput)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input: " + err.Error()})
		return
	}

	userId := context.GetInt64("userId")

	catch := models.Catch{
		UserID:  userId,
		Pokemon: catchInput.Pokemon,
	}

	err = catch.Delete()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to release"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Released successfully"})
}

func getCatches(context *gin.Context) {
	userId := context.GetInt64("userId")

	pokemons, err := models.GetCatchesByUser(userId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to retrieve catches"})
		return
	}
	context.JSON(http.StatusOK, gin.H{"catches": pokemons})
}
