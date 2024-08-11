import { verifierJwt } from "../providers/cognito";

export const jwtValidate = async (token: string): Promise<string> => {
  const { sub: userId } = await verifierJwt.verify(token, {
    tokenUse: 'access',
    clientId: process.env.COGNITO_USER_POOL_CLIENT_ID ?? '',
  });

  return userId;
};
