package db

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error

	DB, err = sql.Open("sqlite3", "./pokemons.db?_foreign_keys=on")

	if err != nil {
		panic("Failed to connect to the database: " + err.Error())
	}

	DB.SetMaxOpenConns(10)
	DB.SetMaxIdleConns(5)

	createTables()

}

func createTables() {
	createUsersTable := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
	)`

	_, err := DB.Exec(createUsersTable)

	if err != nil {
		panic("Failed to create users table: " + err.Error())
	}

	createCatchesTable := `
	CREATE TABLE IF NOT EXISTS catches (
		user_id INTEGER NOT NULL,
		pokemon TEXT,
		PRIMARY KEY (user_id, pokemon),
		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	)`

	_, err = DB.Exec(createCatchesTable)

	if err != nil {
		panic("Failed to create catches table: " + err.Error())
	}


}
