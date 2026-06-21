import "react-native-get-random-values";
import { Amplify } from "aws-amplify";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: "eu-west-2_l5Ct8DM5i",
            userPoolClientId: "8tfil3s3ocanqg7i27i2ti3ru",
            loginWith: {
                email: true,
            },
            signUpVerificationMethod: "code",
            userAttributes: {
                email: {
                    required: true,
                },
            },
        },
    },
});

console.log("Amplify configured");