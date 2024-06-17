import { useContext } from "react";
import * as SecureStore from "expo-secure-store"
import { useQueryClient } from "react-query";

import { AuthContext } from "@/context";
import { User } from "@/types/user";
import { queryKeys } from "@/constants";
import { Property } from "@/types/property";

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const login = (user: User) => {
        let stringUser = JSON.stringify(user);
        setUser(user);
        SecureStore.setItemAsync("user", stringUser);
        // queryClient.refetchQueries();
        const searchedProperties: Property[] | undefined = queryClient.getQueryData(
            queryKeys.searchProperties
        );
        if (searchedProperties) { // xử lý khi người dùng chưa đăng nhập mà search, sau đó login thì các thông tin đã search sẽ có thông tin về việc đã like hoặc không
            for (let i of searchedProperties) {
                i.liked = false;
                if (user.savedProperties?.includes(i.ID)) i.liked = true;
            }
            queryClient.setQueryData(queryKeys.searchProperties, searchedProperties);
        }
    };

    const logout = () => {
        setUser(null);
        SecureStore.deleteItemAsync("user");
        queryClient.clear();
    };

    const setSavedProperties = (savedProperties: number[]) => {
        if (user) {
            const newUser = {...user};
            newUser.savedProperties = savedProperties;
            setUser(newUser);
            let stringUser = JSON.stringify(newUser);
            SecureStore.setItemAsync("user", stringUser);
        }
    };

    return { user, login, logout, setSavedProperties };
}