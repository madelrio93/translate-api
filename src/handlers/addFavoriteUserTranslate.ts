import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { jwtValidate } from '../lib/utils/jwtValidate';
import { translateService } from '../services/translate';

export const addFavoriteUserTranslateHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const token = event.headers.authorization;
    const body = event.body ? JSON.parse(event.body) : null;

    if (!token) throw new Error('Authorization token is missing');
    if (!body) throw new Error('Missing request body');

    const userId = await jwtValidate(token);
    const data = await translateService.addFavoriteByUser(userId, body);

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
