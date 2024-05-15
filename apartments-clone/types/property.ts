import { Apartment } from "./apartment";
import { Pet } from "./pet";
import { Review } from "./review";
import { Score } from "./score";

export type Property = {
    id: number;
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
    pets: Pet[];
    stars: number;
    reviews: Review[];
    features?: string[];
    apartments?: Apartment[];
    fee?: string[];
    detail?: string[],
    scores?: Score[],
};