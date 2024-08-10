import {
  CognitoIdentityProviderClient,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({
  region: 'us-east-1',
});

const createUserCommand = SignUpCommand;

export { cognitoClient, createUserCommand };
