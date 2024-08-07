import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getTranslate } from '../services/translate';

export const getTranslateHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) throw new Error('Request body is missing');

    const { text, source, target } = JSON.parse(event.body);

    if (text.length > 1000)
      throw new Error('Text cannot exceed 1000 characters');

    const { TranslatedText: translatedText } = await getTranslate({
      text,
      target,
      source,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ translatedText }),
    };
  } catch (error: any) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
