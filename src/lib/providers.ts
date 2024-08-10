import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({
  region: 'us-east-1',
});

const createUserCommand = SignUpCommand;
const signInUserCommand = InitiateAuthCommand;

export { cognitoClient, createUserCommand, signInUserCommand };
