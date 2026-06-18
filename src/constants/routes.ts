export const routes = {
  auth: {
    login: "/(auth)/login",
    createAccount: "/(onboarding)/create-account",
    verifyEmail: "/(auth)/verify-email",
    forgotPassword: "/(auth)/forgot-password",
  },
  onboarding: {
    lifestyle: "/(onboarding)/lifestyle-questionnaire",
    location: "/(onboarding)/location-permission",
  },
  tabs: {
    home: "/(tabs)",
    matches: "/(tabs)/matches",
    savedPets: "/(tabs)/saved-pets",
    learn: "/(tabs)/learn",
    profile: "/(tabs)/profile",
  },
};