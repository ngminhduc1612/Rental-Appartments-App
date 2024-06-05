import { Dimensions, Platform, StatusBar } from "react-native";

export const LISTMARGIN = 10;
export const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2;

export const PHOTOS_STR = "photos";
export const AMENITIES_STR = "amenities";
export const DESCRIPTION_STR = "description";

const baseHeight = 160;
const iosNotch = 40;
const iosHeight = baseHeight + iosNotch;
let androidHeight = baseHeight;
let androidNotch = 0;
if (StatusBar.currentHeight) androidNotch = StatusBar.currentHeight;
androidHeight += androidNotch;

export const HEADERHEIGHT = Platform.OS === "ios" ? iosHeight : androidHeight;

const serverURL = "http://192.168.88.223:4000/api";
const location = "/location";
const user = "/user";
const property = "/property";
const locationEndpoint = serverURL + location;
const userEndpoint = serverURL + user;
const propertyEndpoint = serverURL + property;

export const endpoints = {
    autoComplete: locationEndpoint + "/autocomplete",
    search: locationEndpoint + "/search", 
    register: userEndpoint + "/register",
    login: userEndpoint + "/login",
    forgotPassword: userEndpoint + "/forgotpassword",
    resetPassword: userEndpoint + "/resetpassword",
    createProperty: propertyEndpoint + "/create",
    getPropertyById: propertyEndpoint + "/",
    getPropertiesByUserID: propertyEndpoint + "/userid/",
    deleteProperty: propertyEndpoint + "/",
    updateProperty: propertyEndpoint + "/update/",
};