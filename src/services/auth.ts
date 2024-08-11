import {
  cognitoClient,
  createUserCommand,
  signInUserCommand,
} from '../lib/providers/cognito';

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

  public async loginUser({
    email,
    password,
  }: Pick<Type.User, 'email' | 'password'>) {
    const res = await cognitoClient.send(
      new signInUserCommand({
        ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      }),
    );

    if (!res.AuthenticationResult) throw new Error();

    const { AccessToken, ExpiresIn } = res.AuthenticationResult;

    return { AccessToken, ExpiresIn };
  }
}

export const authService = new AuthService();
