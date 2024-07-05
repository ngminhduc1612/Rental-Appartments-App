import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "@/constants";
import { Apartment } from "@/types/apartment";

const fetchApartment = async (apartmentID: number): Promise<Apartment> => {
    const response = await axios.get(
        `${endpoints.getApartmentByApartmentID}${apartmentID}`
    );

    const data: Apartment = response.data;
    return data;
};

export const useApartmentQuery = (apartmentID: number) =>
    useQuery(queryKeys.apartment, () => fetchApartment(apartmentID));