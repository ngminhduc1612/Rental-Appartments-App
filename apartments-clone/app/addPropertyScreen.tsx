import { useUser } from "@/hooks/useUser";
import SignUpOrSignInScreen from "./signUpOrSignInScreen";
import { AddPropertySection } from "@/components/AddPropertySection";


export default function AddPropertyScreen() {
    // const route = useRoute();
    const { user } = useUser();

    if (!user) return <SignUpOrSignInScreen />;

    return <AddPropertySection />;
};

