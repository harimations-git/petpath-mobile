import { signIn, signUp, fetchAuthSession, getCurrentUser, resendSignUpCode, confirmSignUp, signOut, resetPassword, confirmResetPassword, autoSignIn } from "aws-amplify/auth";

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

export async function registerUser(
    fullName: string,
    email: string,
    password: string
) {
    const normalisedEmail = email.trim().toLowerCase();
    return await signUp({
        username: normalisedEmail,
        password,
        options: {
            userAttributes: {
                email: normalisedEmail,
                name: fullName.trim()
            },
            autoSignIn: true,
        }
    });
}

export function getSignUpErrorMessage(error: unknown) {
    const errorName =
        error instanceof Error ? error.name : "";

    switch (errorName) {
        case "UsernameExistsException":
            return "An account already exists with this email address.";
        case "InvalidPasswordException":
            return "Use 8+ characters with uppercase, lowercase, a number and a symbol.";
        case "LimitExceededException":
            return "Too many attempts. Please wait and try again.";
        default:
            return "We couldn't create your account. Please try again.";
    }
}

export async function verifyEmail(
    email: string,
    verificationCode: string
) {
    const result = await confirmSignUp({
        username: email.trim().toLowerCase(),
        confirmationCode: verificationCode.trim(),
    });

    if (
        result.nextStep.signUpStep ===
        "COMPLETE_AUTO_SIGN_IN"
    ) {
        const signInResult = await autoSignIn();

        if (!signInResult.isSignedIn) {
            throw new Error(
                "Account verified, but automatic sign-in failed."
            );
        }
    }

    return result;
}

export async function resendVerificationCode(email: string) {
    return resendSignUpCode({
        username: email.trim().toLowerCase(),
    });
}

export async function logoutUser() {
    await signOut();
}

export async function requestPasswordReset(email: string) {
    return resetPassword({
        username: email.trim().toLowerCase(),
    });
}

export async function completePasswordReset(
    email: string,
    code: string,
    newPassword: string
) {
    await confirmResetPassword({
        username: email.trim().toLowerCase(),
        confirmationCode: code.trim(),
        newPassword,
    });
}