package entity

// mapping for database

type User struct {
	Id           uint64 `db:"id" json:"userId,omitempty"`
	Username     string `db:"username" json:"username,omitempty"`
	Password     string `db:"password,omitempty" json:"password,omitempty"`
	RefreshToken string `db:"refresh_token" json:"refresh_token,omitempty"`
}
