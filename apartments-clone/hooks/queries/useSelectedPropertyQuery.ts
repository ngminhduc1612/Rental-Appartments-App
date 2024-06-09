import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { Property } from "../../types/property";
import { useAuth } from "../useAuth";

const fetchProperty = async (propertyID: number): Promise<Property> => {
  const response = await axios.get(`${endpoints.getPropertyByID}${propertyID}`);

  const data: Property = response.data;
  return data;
};

export const useSelectedPropertyQuery = (propertyID: number) => {
  const { user } = useAuth();
  const queryInfo = useQuery(queryKeys.selectedProperty, () =>
    fetchProperty(propertyID)
  );

  const data = queryInfo?.data;
  if (data) if (user?.savedProperties?.includes(data.ID)) data.liked = true;

  return {
    ...queryInfo,
    data,
  };
};