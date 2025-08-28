package models

import (
	"viktorvarga.dev/poke/db"
)

type Catch struct {
	UserID  int64  `json:"user_id"`
	Pokemon string `json:"pokemon"`
}

type CatchInput struct {
	Pokemon string `json:"pokemon" binding:"required"`
}

func (c *Catch) Save() error {
	query := "INSERT INTO catches(user_id, pokemon) VALUES(?,?)"

	result, err := db.DB.Exec(query, c.UserID, c.Pokemon)

	if err != nil {
		return err
	}

	_, err = result.LastInsertId()
	return err
}

func GetCatchesByUser(userId int64) ([]string, error) {
	query := `
	SELECT pokemon
	FROM catches
	WHERE user_id = ?`

	rows, err := db.DB.Query(query, userId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var pokemons []string

	for rows.Next() {
		var pokemon string
		err := rows.Scan(&pokemon)

		if err != nil {
			return nil, err
		}
		pokemons = append(pokemons, pokemon)
	}

	return pokemons, nil
}

func (c Catch) Delete() error {
	query := "DELETE FROM catches WHERE user_id = ? AND pokemon = ?"
	_, err := db.DB.Exec(query, c.UserID, c.Pokemon)
	return err
}
