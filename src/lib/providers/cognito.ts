import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { region } from '../config';

const cognitoClient = new CognitoIdentityProviderClient({
  region
});

const createUserCommand = SignUpCommand;
const signInUserCommand = InitiateAuthCommand;

const verifierJwt = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID ?? '',
});

export { cognitoClient, createUserCommand, signInUserCommand, verifierJwt };
