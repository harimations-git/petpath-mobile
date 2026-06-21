import { signIn, fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export async function loginUser(email: string, password: string) {
  const result = await signIn({
    username: email.trim().toLowerCase(),
    password,
  });

  if (!result.isSignedIn) {
    return {
      isSignedIn: false,
      nextStep: result.nextStep,
    };
  }

  const user = await getCurrentUser();
  const session = await fetchAuthSession();

  return {
    isSignedIn: true,
    user,
    tokens: session.tokens,
  };
}