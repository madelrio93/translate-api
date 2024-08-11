import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { translateService } from '../services/translate';

export const removeFavoriteUserTranslateHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const body = event.body ? JSON.parse(event.body) : null;

    if (!body) throw new Error('Missing request body');

    const data = await translateService.removeFavoriteByUser(body.id);

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
