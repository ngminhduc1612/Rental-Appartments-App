import { Property } from "@/types/property";

export const properties: Property[] = [
    {
        id: 1,
        images: [
            "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
            "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
        ],
        rentLow: 3750,
        rentHigh: 31054,
        bedroomLow: 1,
        bedroomHigh: 5,
        name: "The Duly",
        street: "London 35th St",
        city: "Miami",
        state: "Floria",
        zip: 33137,
        tags: ["Parking"],
        lat: 21.005667164666153, 
        lng: 105.84725432718425,
    },
    {
        id: 2,
        images: [
            "https://www.hoteljob.vn/uploads/images/19-03-29-13/khu-nghi-duong-co-canh-quan-dep-nam-2018-04.png",
            "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
        ],
        rentLow: 3750,
        rentHigh: 31054,
        bedroomLow: 1,
        bedroomHigh: 5,
        name: "The Duly 2",
        street: "Hola 35th St",
        city: "Miami",
        state: "Floria",
        zip: 33137,
        tags: ["Parking"],
        lat: 21.004656719659277,
        lng: 105.8457292038445,
    },
    {
        id: 3,
        images: [
            "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
            "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
        ],
        rentLow: 3750,
        rentHigh: 31054,
        bedroomLow: 1,
        bedroomHigh: 5,
        name: "The Duly 2",
        street: "Hola 35th St",
        city: "Miami",
        state: "Floria",
        zip: 33137,
        tags: ["Parking"],
        lat: 21.00278666067967, 
        lng: 105.84202083045692,
    },
    {
        id: 4,
        images: [
            "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
            "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
        ],
        rentLow: 3750,
        rentHigh: 31054,
        bedroomLow: 1,
        bedroomHigh: 5,
        name: "The Duly 2",
        street: "Hola 35th St",
        city: "Miami",
        state: "Floria",
        zip: 33137,
        tags: ["Parking"],
        lat: 21.006333667275026, 
        lng: 105.84258799817174,
    },
    {
        id: 5,
        images: [
            "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
            "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
        ],
        rentLow: 3750,
        rentHigh: 31054,
        bedroomLow: 1,
        bedroomHigh: 5,
        name: "The Duly 2",
        street: "Hola 35th St",
        city: "Miami",
        state: "Floria",
        zip: 33137,
        tags: ["Parking"],
        lat: 20.999182210390845, 
        lng: 105.84256654050041,
    }
]

export const getPropertiesInArea = (boundingBox: number[]): Property[] => {
    const minLat = boundingBox[0];
    const maxLat = boundingBox[1];
    const minLng = boundingBox[2];
    const maxLng = boundingBox[3];
  
    const propertiesInArea: Property[] = [];
  
    for (let i in properties) {
      if (
        properties[i].lat <= maxLat &&
        properties[i].lat >= minLat &&
        properties[i].lng <= maxLng &&
        properties[i].lng >= minLng
      )
        propertiesInArea.push(properties[i]);
    }
  
    return propertiesInArea;
  };
