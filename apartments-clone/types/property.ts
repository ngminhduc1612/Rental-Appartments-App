import { Apartment } from "./apartment";
import { generalType } from "./generalType";
import { Pet } from "./pet";
import { Review } from "./review";
import { Score } from "./score";

export type Property = {
    ID: number;
    images: string[];
    rentLow: number;
    rentHigh: number;
    bedroomLow: number;
    bedroomHigh: number;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: number;
    tags: string[];
    lat: number;
    lng: number;
    about: string;
    phoneNumber: string;
    website: string;
    unitType: "single" | "multiple";
    pets?: Pet[];
    stars: number;
    onMarket?: boolean;
    reviews?: Review[];
    features?: string[];
    apartments: Apartment[];
    fee?: generalType[];
    detail?: generalType[];
    scores?: Score[];
};

export type CreateProperty = {
    unitType: string;
    propertyType: string;
    street: string;
    city: string;
    state: string;
    zip: number;
    lat: number;
    lng: number;
    userID: number;
    apartments: {unit?: string; bedrooms: number; bathrooms: number}[];
}