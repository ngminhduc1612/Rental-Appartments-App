import { useAuth } from "@/hooks/useAuth";
import SignUpOrSignInScreen from "./signUpOrSignInScreen";
import { AddPropertySection } from "@/components/AddPropertySection";


export default function AddPropertyScreen() {
    // const route = useRoute();
    const { user } = useAuth();

    if (!user) return <SignUpOrSignInScreen />;

    return <AddPropertySection />;
};

