package models

import "gorm.io/gorm"

type Property struct {
	gorm.Model
	UnitType     string      `json:"unitType"`
	PropertyType string      `json:"propertyType"`
	Street       string      `json:"street"`
	City         string      `json:"city"`
	State        string      `json:"state"`
	Zip          int         `json:"zip"`
	Lat          float32     `json:"lat"`
	Lng          float32     `json:"lng"`
	BedroomLow   int         `json:"bedroomLow"`
	BedroomHigh  int         `json:"bedroomHigh"`
	BathroomLow  float32     `json:"bathroomLow"`
	BathroomHigh float32     `json:"bathroomHigh"`
	UserID       uint        `json:"userID"`
	Apartments   []Apartment `json:"apartments"`
}
