import { cognitoClient, createUserCommand } from '../lib/providers';

class AuthService {
  public async registerUser({
    email,
    firstName,
    lastName,
    password,
  }: Type.User) {
    await cognitoClient.send(
      new createUserCommand({
        ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
          {
            Name: 'custom:first_name',
            Value: firstName,
          },
          {
            Name: 'custom:last_name',
            Value: lastName,
          },
        ],
      }),
    );
  }
}

export const authService = new AuthService();
