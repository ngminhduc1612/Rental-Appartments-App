package models

import "gorm.io/gorm"

type User struct {
	gorm.Model            // bao gom ID, UpdatedAt, DeletedAt, Created
	FirstName      string `json:"firstName"`
	LastName       string `json:"lastName"`
	Email          string `json:"email"`
	Password       string `json:"password"`
	SocialLogin    bool   `json:"socialLogin"`
	SocialProvider string `json:"socialProvider"`
}
