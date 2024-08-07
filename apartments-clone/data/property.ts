import { Property } from "@/types/property";

export const properties: Property[] = [
  {
    ID: 1,
    unitType: "single",
    images: [
      "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
      "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
    ],
    about:
      "At 7 West, urban apartment-life decadence extends beyond your front door. Elevate your lifestyle with gracious concierge services including packages and dry cleaning delivered straight to your door. Enjoy the fun and frequent resident activities like our weekly “Wake Up with Weidner” that includes a free breakfast and “Pizza Night.” Grab a slice, get to know your neighbors and make new friends. Get healthy in our state-of-the-art fitness center and achieve enlightenment in our calming yoga studio. Take advantage of the gorgeous resident lounge complete with kitchen and free wifi to relax, work and study. Challenge your neighbor to a billiards match in the game room, and entertain friends and family on the rooftop terrace or reserve the clubhouse for special occasions. You can also rest assured with controlled access to the building, an underground heated parking garage and a courtesy security patrol. We have furnished apartments available, and we’re a pet-friendly apartment community, complete with a “Yappy Hour” for residents and their dogs to mingle and make friends.",
    rentLow: 3750,
    rentHigh: 31054,
    bedroomLow: 1,
    bedroomHigh: 5,
    name: "The Duly",
    street: "London 35th St",
    city: "Miami",
    state: "Ha Noi",
    zip: 33137,
    tags: ["Parking"],
    lat: 21.005667164666153,
    lng: 105.84725432718425,
    apartments: [
      {
        CreatedAt: "2022-05-09T19:27:23.084252-05:00",
        DeletedAt: null,
        ID: 1,
        UpdatedAt: "2022-05-09T19:28:03.572996-05:00",
        bathrooms: 2,
        bedrooms: 2,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/1/0"],
        propertyID: 1,
        rent: 4524,
        sqFt: 1404,
        unit: "0204",
      },
    ],
    phoneNumber: "09434637463",
    website: "www.adias.com",
    fee: [
      {
        heading: "Parking",
        body: ["Others"]
      },
      {
        heading: "Electric",
        body: [
          "Free",
        ],
      },
      {
        heading: "Water",
        body: [
          "Not Free",
        ],
      },
    ],
    stars: 0,
  },
  {
    ID: 2,
    unitType: "multiple",
    about:
      "At 7 West, urban apartment-life decadence extends beyond your front door. Elevate your lifestyle with gracious concierge services including packages and dry cleaning delivered straight to your door. Enjoy the fun and frequent resident activities like our weekly “Wake Up with Weidner” that includes a free breakfast and “Pizza Night.” Grab a slice, get to know your neighbors and make new friends. Get healthy in our state-of-the-art fitness center and achieve enlightenment in our calming yoga studio. Take advantage of the gorgeous resident lounge complete with kitchen and free wifi to relax, work and study. Challenge your neighbor to a billiards match in the game room, and entertain friends and family on the rooftop terrace or reserve the clubhouse for special occasions. You can also rest assured with controlled access to the building, an underground heated parking garage and a courtesy security patrol. We have furnished apartments available, and we’re a pet-friendly apartment community, complete with a “Yappy Hour” for residents and their dogs to mingle and make friends.",
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
    apartments: [
      {
        CreatedAt: "2022-05-09T19:27:23.084252-05:00",
        DeletedAt: null,
        ID: 1,
        UpdatedAt: "2022-05-09T19:28:03.572996-05:00",
        bathrooms: 2,
        bedrooms: 2,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/1/0"],
        propertyID: 1,
        rent: 4524,
        sqFt: 1404,
        unit: "0204",
      },
      {
        CreatedAt: "2022-05-09T20:26:32.877701-05:00",
        DeletedAt: null,
        ID: 2,
        UpdatedAt: "2022-05-09T20:26:38.80651-05:00",
        bathrooms: 1.5,
        bedrooms: 1,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/2/0"],
        propertyID: 1,
        rent: 3750,
        sqFt: 1036,
        unit: "0201",
      },
      {
        CreatedAt: "2022-05-09T20:40:15.232309-05:00",
        DeletedAt: null,
        ID: 3,
        UpdatedAt: "2022-05-09T20:40:22.450926-05:00",
        bathrooms: 1,
        bedrooms: 0,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/3/0"],
        propertyID: 1,
        rent: 3250,
        sqFt: 800,
        unit: "0100",
      },
      {
        CreatedAt: "2022-05-09T20:40:59.063726-05:00",
        DeletedAt: null,
        ID: 4,
        UpdatedAt: "2022-05-09T20:41:04.850414-05:00",
        bathrooms: 0.5,
        bedrooms: 0,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/4/0"],
        propertyID: 1,
        rent: 3000,
        sqFt: 500,
        unit: "0101",
      },
      {
        CreatedAt: "2022-05-09T20:41:31.523136-05:00",
        DeletedAt: null,
        ID: 5,
        UpdatedAt: "2022-05-09T20:41:37.877753-05:00",
        bathrooms: 1.5,
        bedrooms: 3,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/5/0"],
        propertyID: 1,
        rent: 4000,
        sqFt: 1300,
        unit: "0308",
      },
    ],
    features: [
      "Studio, 1 Bedroom, and 2 Bedroom and Bathroom Apartments",
      "Amazing Views of Downtown Miami",
      "14 Private Offices",
      "40 Meeting Tables",
      "Flaming Kitchen",
      "Balcony Views Of 4th Street Se",
      "Spa",
      "Underground Parking",
    ],
    phoneNumber: "0912316767",
    website: "www.helloasda.com",
    pets: [
      {
        type: "Dog",
        allowed: true,
        details: "Some breed restrictions",
        limit: 2,
        fee: 25,
        deposit: 100,
        rent: 50,
      },
      {
        type: "Cat",
        allowed: true,
        details: "Some breed restrictions",
        limit: 2,
        fee: 25,
        deposit: 100,
        rent: 50,
      },
    ],
    fee: [
      {
        heading: "Parking",
        body: ["Others"]
      },
      {
        heading: "Electric",
        body: [
          "Free",
        ],
      },
      {
        heading: "Water",
        body: [
          "Not Free",
        ],
      },
    ],
    stars: 3.5,
    reviews: [
      {
        body: "Kind of feels like living in a hotel. That's very nice in some ways, but a bit cold at the same time.",
        CreatedAt: "2022-05-09T21:56:18.422866-05:00",
        ID: 1,
        propertyID: 1,
        stars: 3,
        title: "Neither here nor there",
        userID: 1,
        DeletedAt: null,
        UpdatedAt: null,
      },
      {
        body: "I really appreciate the amenities and particularly how responsive maintenance is when they break down.",
        CreatedAt: "2022-07-09T21:56:18.422866-05:00",
        ID: 2,
        propertyID: 1,
        stars: 4,
        title: "I really appreciate",
        userID: 2,
        DeletedAt: null,
        UpdatedAt: null,
      },
    ],
  },
  {
    ID: 3,
    unitType: "multiple",
    images: [
      "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
      "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
    ],
    about:
      "At 7 West, urban apartment-life decadence extends beyond your front door. Elevate your lifestyle with gracious concierge services including packages and dry cleaning delivered straight to your door. Enjoy the fun and frequent resident activities like our weekly “Wake Up with Weidner” that includes a free breakfast and “Pizza Night.” Grab a slice, get to know your neighbors and make new friends. Get healthy in our state-of-the-art fitness center and achieve enlightenment in our calming yoga studio. Take advantage of the gorgeous resident lounge complete with kitchen and free wifi to relax, work and study. Challenge your neighbor to a billiards match in the game room, and entertain friends and family on the rooftop terrace or reserve the clubhouse for special occasions. You can also rest assured with controlled access to the building, an underground heated parking garage and a courtesy security patrol. We have furnished apartments available, and we’re a pet-friendly apartment community, complete with a “Yappy Hour” for residents and their dogs to mingle and make friends.",
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
    apartments: [
      {
        CreatedAt: "2022-05-09T19:27:23.084252-05:00",
        DeletedAt: null,
        ID: 1,
        UpdatedAt: "2022-05-09T19:28:03.572996-05:00",
        bathrooms: 2,
        bedrooms: 2,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/1/0"],
        propertyID: 1,
        rent: 4524,
        sqFt: 1404,
        unit: "0204",
      },
      {
        CreatedAt: "2022-05-09T20:26:32.877701-05:00",
        DeletedAt: null,
        ID: 2,
        UpdatedAt: "2022-05-09T20:26:38.80651-05:00",
        bathrooms: 1.5,
        bedrooms: 1,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/2/0"],
        propertyID: 1,
        rent: 3750,
        sqFt: 1036,
        unit: "0201",
      },
      {
        CreatedAt: "2022-05-09T20:40:15.232309-05:00",
        DeletedAt: null,
        ID: 3,
        UpdatedAt: "2022-05-09T20:40:22.450926-05:00",
        bathrooms: 1,
        bedrooms: 0,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/3/0"],
        propertyID: 1,
        rent: 3250,
        sqFt: 800,
        unit: "0100",
      },
      {
        CreatedAt: "2022-05-09T20:40:59.063726-05:00",
        DeletedAt: null,
        ID: 4,
        UpdatedAt: "2022-05-09T20:41:04.850414-05:00",
        bathrooms: 0.5,
        bedrooms: 0,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/4/0"],
        propertyID: 1,
        rent: 3000,
        sqFt: 500,
        unit: "0101",
      },
      {
        CreatedAt: "2022-05-09T20:41:31.523136-05:00",
        DeletedAt: null,
        ID: 5,
        UpdatedAt: "2022-05-09T20:41:37.877753-05:00",
        bathrooms: 1.5,
        bedrooms: 3,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/5/0"],
        propertyID: 1,
        rent: 4000,
        sqFt: 1300,
        unit: "0308",
      },
    ],
    features: [
      "Studio, 1 Bedroom, and 2 Bedroom and Bathroom Apartments",
      "Amazing Views of Downtown Miami",
      "14 Private Offices",
      "40 Meeting Tables",
      "Flaming Kitchen",
      "Balcony Views Of 4th Street Se",
      "Spa",
      "Underground Parking",
    ],
    phoneNumber: "34532454235",
    website: "www.abcwewe.com",
    pets: [
      {
        type: "Dog",
        allowed: true,
        details: "Some breed restrictions",
        limit: 2,
        fee: 25,
        deposit: 100,
        rent: 50,
      },
    ],
    fee: [
      {
        heading: "Parking",
        body: ["Others"]
      },
      {
        heading: "Electric",
        body: [
          "Free",
        ],
      },
      {
        heading: "Water",
        body: [
          "Not Free",
        ],
      },
    ],
    stars: 0,
  },
  {
    ID: 4,
    unitType: "multiple",
    images: [
      "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
      "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
    ],
    about:
      "At 7 West, urban apartment-life decadence extends beyond your front door. Elevate your lifestyle with gracious concierge services including packages and dry cleaning delivered straight to your door. Enjoy the fun and frequent resident activities like our weekly “Wake Up with Weidner” that includes a free breakfast and “Pizza Night.” Grab a slice, get to know your neighbors and make new friends. Get healthy in our state-of-the-art fitness center and achieve enlightenment in our calming yoga studio. Take advantage of the gorgeous resident lounge complete with kitchen and free wifi to relax, work and study. Challenge your neighbor to a billiards match in the game room, and entertain friends and family on the rooftop terrace or reserve the clubhouse for special occasions. You can also rest assured with controlled access to the building, an underground heated parking garage and a courtesy security patrol. We have furnished apartments available, and we’re a pet-friendly apartment community, complete with a “Yappy Hour” for residents and their dogs to mingle and make friends.",
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
    apartments: [
      {
        CreatedAt: "2022-05-09T19:27:23.084252-05:00",
        DeletedAt: null,
        ID: 1,
        UpdatedAt: "2022-05-09T19:28:03.572996-05:00",
        bathrooms: 2,
        bedrooms: 2,
        images: ["https://xaynhadeponline.com/_next/image?url=https%3A%2F%2Fapi.xaynhadeponline.com%2Fuploads%2Fban_ve_tang_lung_nha_cap_4_mai_bang_9f0da50266.jpg%3Fwidth%3D750%26height%3D515&w=1920&q=75"],
        propertyID: 1,
        rent: 4524,
        sqFt: 1404,
        unit: "0204",
      },
      {
        CreatedAt: "2022-05-09T20:26:32.877701-05:00",
        DeletedAt: null,
        ID: 2,
        UpdatedAt: "2022-05-09T20:26:38.80651-05:00",
        bathrooms: 1.5,
        bedrooms: 1,
        images: ["https://xaynhadeponline.com/_next/image?url=https%3A%2F%2Fapi.xaynhadeponline.com%2Fuploads%2Fban_ve_tang_lung_nha_cap_4_mai_bang_9f0da50266.jpg%3Fwidth%3D750%26height%3D515&w=1920&q=75"],
        propertyID: 1,
        rent: 3750,
        sqFt: 1036,
        unit: "0201",
      },
      {
        CreatedAt: "2022-05-09T20:40:15.232309-05:00",
        DeletedAt: null,
        ID: 3,
        UpdatedAt: "2022-05-09T20:40:22.450926-05:00",
        bathrooms: 1,
        bedrooms: 0,
        images: ["https://xaynhadeponline.com/_next/image?url=https%3A%2F%2Fapi.xaynhadeponline.com%2Fuploads%2Fban_ve_tang_lung_nha_cap_4_mai_bang_9f0da50266.jpg%3Fwidth%3D750%26height%3D515&w=1920&q=75"],
        propertyID: 1,
        rent: 3250,
        sqFt: 800,
        unit: "0100",
      },
      {
        CreatedAt: "2022-05-09T20:40:59.063726-05:00",
        DeletedAt: null,
        ID: 4,
        UpdatedAt: "2022-05-09T20:41:04.850414-05:00",
        bathrooms: 0.5,
        bedrooms: 0,
        images: ["https://xaynhadeponline.com/_next/image?url=https%3A%2F%2Fapi.xaynhadeponline.com%2Fuploads%2Fban_ve_tang_lung_nha_cap_4_mai_bang_9f0da50266.jpg%3Fwidth%3D750%26height%3D515&w=1920&q=75"],
        propertyID: 1,
        rent: 3000,
        sqFt: 500,
        unit: "0101",
      },
      {
        CreatedAt: "2022-05-09T20:41:31.523136-05:00",
        DeletedAt: null,
        ID: 5,
        UpdatedAt: "2022-05-09T20:41:37.877753-05:00",
        bathrooms: 1.5,
        bedrooms: 3,
        images: ["https://xaynhadeponline.com/_next/image?url=https%3A%2F%2Fapi.xaynhadeponline.com%2Fuploads%2Fban_ve_tang_lung_nha_cap_4_mai_bang_9f0da50266.jpg%3Fwidth%3D750%26height%3D515&w=1920&q=75"],
        propertyID: 1,
        rent: 4000,
        sqFt: 1300,
        unit: "0308",
      },
    ],
    features: [
      "Studio, 1 Bedroom, and 2 Bedroom and Bathroom Apartments",
      "Amazing Views of Downtown Miami",
      "14 Private Offices",
      "40 Meeting Tables",
      "Underground Parking",
    ],
    phoneNumber: "0912316767",
    website: "www.asdadsaa.com",
    pets: [
      {
        type: "Dog",
        allowed: true,
        details: "Some breed restrictions",
        limit: 2,
        fee: 25,
        deposit: 100,
        rent: 50,
      },
      {
        type: "Cat",
        allowed: true,
        details: "Some breed restrictions",
        limit: 2,
        fee: 25,
        deposit: 100,
        rent: 50,
      },
    ],
    fee: [
      {
        heading: "Parking",
        body: ["Others"]
      },
      {
        heading: "Electric",
        body: [
          "Free",
        ],
      },
      {
        heading: "Water",
        body: [
          "Not Free",
        ],
      },
    ],
    scores: [
      { type: "Walk", description: "Very Walkable", score: 73 },
      { type: "Bike", description: "Very Bikeable", score: 72 },
    ],
    stars: 3.5,
    reviews: [
      {
        body: "Kind of feels like living in a hotel. That's very nice in some ways, but a bit cold at the same time.",
        CreatedAt: "2022-05-09T21:56:18.422866-05:00",
        ID: 1,
        propertyID: 1,
        stars: 3,
        title: "Neither here nor there",
        userID: 1,
        DeletedAt: null,
        UpdatedAt: null,
      },
      {
        body: "Căn hộ vô cùng tuyệt vời. Minh rất thích nó",
        CreatedAt: "2022-07-09T21:56:18.422866-05:00",
        ID: 2,
        propertyID: 1,
        stars: 4,
        title: "Rất thích view của căn hộ này",
        userID: 2,
        DeletedAt: null,
        UpdatedAt: null,
      },
    ],
  },
  {
    ID: 5,
    unitType: "multiple",
    about:
      "At 7 West, urban apartment-life decadence extends beyond your front door. Elevate your lifestyle with gracious concierge services including packages and dry cleaning delivered straight to your door. Enjoy the fun and frequent resident activities like our weekly “Wake Up with Weidner” that includes a free breakfast and “Pizza Night.” Grab a slice, get to know your neighbors and make new friends. Get healthy in our state-of-the-art fitness center and achieve enlightenment in our calming yoga studio. Take advantage of the gorgeous resident lounge complete with kitchen and free wifi to relax, work and study. Challenge your neighbor to a billiards match in the game room, and entertain friends and family on the rooftop terrace or reserve the clubhouse for special occasions. You can also rest assured with controlled access to the building, an underground heated parking garage and a courtesy security patrol. We have furnished apartments available, and we’re a pet-friendly apartment community, complete with a “Yappy Hour” for residents and their dogs to mingle and make friends.",
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
    apartments: [
      {
        CreatedAt: "2022-05-09T19:27:23.084252-05:00",
        DeletedAt: null,
        ID: 1,
        UpdatedAt: "2022-05-09T19:28:03.572996-05:00",
        bathrooms: 2,
        bedrooms: 2,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/1/0"],
        propertyID: 1,
        rent: 4524,
        sqFt: 1404,
        unit: "0204",
      },
      {
        CreatedAt: "2022-05-09T20:26:32.877701-05:00",
        DeletedAt: null,
        ID: 2,
        UpdatedAt: "2022-05-09T20:26:38.80651-05:00",
        bathrooms: 1.5,
        bedrooms: 1,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/2/0"],
        propertyID: 1,
        rent: 3750,
        sqFt: 1036,
        unit: "0201",
      },
      {
        CreatedAt: "2022-05-09T20:40:15.232309-05:00",
        DeletedAt: null,
        ID: 3,
        UpdatedAt: "2022-05-09T20:40:22.450926-05:00",
        bathrooms: 1,
        bedrooms: 0,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/3/0"],
        propertyID: 1,
        rent: 3250,
        sqFt: 800,
        unit: "0100",
      },
      {
        CreatedAt: "2022-05-09T20:40:59.063726-05:00",
        DeletedAt: null,
        ID: 4,
        UpdatedAt: "2022-05-09T20:41:04.850414-05:00",
        bathrooms: 0.5,
        bedrooms: 0,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/4/0"],
        propertyID: 1,
        rent: 3000,
        sqFt: 500,
        unit: "0101",
      },
      {
        CreatedAt: "2022-05-09T20:41:31.523136-05:00",
        DeletedAt: null,
        ID: 5,
        UpdatedAt: "2022-05-09T20:41:37.877753-05:00",
        bathrooms: 1.5,
        bedrooms: 3,
        images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/5/0"],
        propertyID: 1,
        rent: 4000,
        sqFt: 1300,
        unit: "0308",
      },
    ],
    features: [
      "Studio, 1 Bedroom, and 2 Bedroom and Bathroom Apartments",
      "Amazing Views of Downtown Miami",
      "14 Private Offices",
      "40 Meeting Tables",
      "Flaming Kitchen",
      "Balcony Views Of 4th Street Se",
      "Spa",
      "Underground Parking",
    ],
    phoneNumber: "0912345678",
    website: "www.google.com",
    pets: [
      {
        type: "Dog",
        allowed: true,
        details: "Some breed restrictions",
        limit: 2,
        fee: 25,
        deposit: 100,
        rent: 50,
      },
      {
        type: "Cat",
        allowed: true,
        details: "Some breed restrictions",
        limit: 2,
        fee: 25,
        deposit: 100,
        rent: 50,
      },
    ],
    fee: [
      {
        heading: "Parking",
        body: ["Others"]
      },
      {
        heading: "Electric",
        body: [
          "Free",
        ],
      },
      {
        heading: "Water",
        body: [
          "Not Free",
        ],
      },
    ],
    scores: [
      { type: "Walk", description: "Very Walkable", score: 73 },
      { type: "Bike", description: "Very Bikeable", score: 72 },
    ],
    // stars: 4.2,
    // reviews: [
    //   {
    //     body: "The building itself was great. Surrounding streets, however, were constantly loud, torn up, inaccessible, dangerous, and full of construction debris essentially for the entire two plus years I lived there. Constant sirens, thumping, vibrations, jackhammers, etc. was intolerable. Weekend evenings sirens were non-stop.",
    //     CreatedAt: "2022-05-09T21:56:18.422866-05:00",
    //     ID: 1,
    //     propertyID: 1,
    //     stars: 3,
    //     title: "Neither here nor there",
    //     userID: 1,
    //     DeletedAt: null,
    //     UpdatedAt: null,
    //   },
    //   {
    //     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum id venenatis a condimentum vitae sapien pellentesque. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Porta non pulvinar neque laoreet. Egestas dui id ornare arcu odio ut sem. Ut eu sem integer vitae. Lorem sed risus ultricies tristique nulla. Neque viverra justo nec ultrices dui sapien eget. Tempus quam pellentesque nec nam aliquam. Mattis pellentesque id nibh tortor id aliquet. Egestas integer eget aliquet nibh praesent tristique magna. Nisl vel pretium lectus quam. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Gravida quis blandit turpis cursus in hac habitasse. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. At lectus urna duis convallis convallis tellus id interdum.Lorem donec massa sapien faucibus et molestie. Enim nunc faucibus a pellentesque. Mus mauris vitae ultricies leo integer malesuada. Mi tempus imperdiet nulla malesuada pellentesque. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Non consectetur a erat nam. Venenatis cras sed felis eget velit aliquet sagittis. Eget lorem dolor sed viverra ipsum nunc. Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Sed euismod nisi porta lorem mollis aliquam ut porttitor. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh. Blandit aliquam etiam erat velit. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Vel eros donec ac odio tempor orci dapibus ultrices in.",
    //     CreatedAt: "2022-05-21T21:56:18.422866-05:00",
    //     ID: 2,
    //     propertyID: 1,
    //     stars: 5,
    //     title: "Staff is great",
    //     userID: 2,
    //     DeletedAt: null,
    //     UpdatedAt: null,
    //   },
    //   {
    //     body: "Downtown has crime concerns, and it is expensive because of that, but it's a good place.",
    //     CreatedAt: "2022-06-09T21:56:18.422866-05:00",
    //     ID: 3,
    //     propertyID: 1,
    //     stars: 5,
    //     title: "Downtown has crime",
    //     userID: 3,
    //     DeletedAt: null,
    //     UpdatedAt: null,
    //   },
    //   {
    //     body: "I really appreciate the amenities and particularly how responsive maintenance is when they break down.",
    //     CreatedAt: "2022-07-09T21:56:18.422866-05:00",
    //     ID: 2,
    //     propertyID: 1,
    //     stars: 4,
    //     title: "I really appreciate",
    //     userID: 2,
    //     DeletedAt: null,
    //     UpdatedAt: null,
    //   },
    // ],
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
