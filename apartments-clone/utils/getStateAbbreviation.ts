import { states } from "@/constants/VNProvinces";

export const getStateAbbreviation = (state: any) => {
    const stateAbrev = states[state as "Ha Noi"];

    if (stateAbrev) return stateAbrev;
    return state;
};