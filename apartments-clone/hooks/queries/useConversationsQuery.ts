import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { TransformedConversation } from "../../types/conversation";
import { Message } from "../../types/message";
import { getStateAbbreviation } from "../../utils/getStateAbbreviation";
import { useUser } from "../useUser";

const fetchConversations = async (
    userID?: number,
): Promise<TransformedConversation[]> => {
    if (!userID) return [];

    const response = await axios.get(
        `${endpoints.getConversationsByUserID}${userID}`,
    );

    const conversations: ConversationsRes[] = response.data;
    const data: TransformedConversation[] = [];
    for (let i of conversations) {
        // recipientName represents the person other than curr user in the conversation
        let recipientName = "";
        if (userID === i.tenantID)
            // có thể chuyển thành owner name
            recipientName = i.propertyName
                ? i.propertyName
                : `${i.street}, ${i.city}, ${getStateAbbreviation(i.state)}`;
        else
            recipientName =
                i.tenantFirstName && i.tenantLastName
                    ? `${i.tenantFirstName} ${i.tenantLastName}`
                    : i.tenantEmail;

        data.push({
            ID: i.ID,
            propertyID: i.propertyID,
            recipientName,
            messages: i.messages,
        });
    }

    return data;
};

export const useConversationsQuery = () => {
    const { user } = useUser();

    return useQuery(
        queryKeys.conversations,
        () => fetchConversations(user?.ID),
        {
            retry: false,
        }
    );
};

type ConversationsRes = {
    ID: number;
    CreatedAt: string;
    tenantID: number;
    ownerID: number;
    propertyID: number;
    propertyName: string;
    street: string;
    city: string;
    state: string;
    ownerFirstName: string;
    ownerLastName: string;
    ownerEmail: string;
    tenantFirstName: string;
    tenantLastName: string;
    tenantEmail: string;
    messages: Message[];
};