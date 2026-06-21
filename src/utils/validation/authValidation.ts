type CreateAccountData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

export function validateCreateAccount(data: CreateAccountData) {
  if (
    !data.fullName.trim() ||
    !data.email.trim() ||
    !data.password ||
    !data.confirmPassword
  ) {
    return "Please complete all required fields.";
  }

  if (data.password !== data.confirmPassword) {
    return "Your passwords do not match.";
  }

  if (!data.acceptedTerms) {
    return "You must accept the Terms of Service and Privacy Policy.";
  }

  return null;
}