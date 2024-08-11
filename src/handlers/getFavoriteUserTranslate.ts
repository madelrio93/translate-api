import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { jwtValidate } from '../lib/utils/jwtValidate';
import { translateService } from '../services/translate';

export const getFavoriteUserTranslateHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const token = event.headers.authorization;

    if (!token) throw new Error('Authorization token is missing');

    const userId = await jwtValidate(token);
    const data = await translateService.getFavoritesByUser(userId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    };
  } catch (error: any) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
