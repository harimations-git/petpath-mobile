export const routes = {
  legal: {
    tos: "/(legal)/terms-of-service",
    privacyPolicy: "/(legal)/privacy-policy"
  },
  auth: {
    login: "/(auth)/login",
    accountType: "/(auth)/account-type",
    createAccount: "/(auth)/create-account",
    verifyEmail: "/(auth)/verify-email",
    forgotPassword: "/(auth)/forgot-password",
  },
  onboarding: {
    lifestyle: "/(onboarding)/lifestyle-questionnaire",
    location: "/(onboarding)/location-permission",
  },
  tabs: {
    home: "/(tabs)/home",
    matches: "/(tabs)/matches",
    savedPets: "/(tabs)/saved-pets",
    learn: "/(tabs)/learn",
    settings: "/(tabs)/settings",
  },
  settings:{
    account: "/(settings)/account",
    lifestyle: "/(settings)/lifestyle"
  }
};