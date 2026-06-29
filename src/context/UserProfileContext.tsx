import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { getCurrentUserProfile } from "../services/user/userService";

export type UserProfile = {
    userId?: string;
    fullName?: string;
    email?: string;
    currentStep?: string;
    onboardingComplete?: boolean;
    onboardingVersion?: number;
};

type UserProfileContextValue = {
    userProfile: UserProfile | null;
    isLoadingProfile: boolean;
    refreshUserProfile: () => Promise<void>;
};

const UserProfileContext = createContext<UserProfileContextValue | undefined>(
    undefined
);

export function UserProfileProvider({
    children,
} : {
    children: React.ReactNode;
}) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    async function refreshUserProfile(){
        try{
            setIsLoadingProfile(true);

            const profile = await getCurrentUserProfile();
            setUserProfile(profile);
        } catch (error) {
            console.error("Could not load user profile: ", error);
            setUserProfile(null);
        } finally {
            setIsLoadingProfile(false);
        }
    }

    useEffect(() => {
        refreshUserProfile();
    }, []);

    return(
        <UserProfileContext.Provider
        value={{
            userProfile,
            isLoadingProfile,
            refreshUserProfile
        }}
        >
            {children}
        </UserProfileContext.Provider>
    );
}

export function useUserProfile() {
    const context = useContext(UserProfileContext);

    if(!context){
        throw new Error(
            "useUserProfile must be used inside UserProfileProvider"
        );
    }

    return context;
}