import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { translateService } from '../services/translate';
import { ERRORS } from '../utils/constants';
import { handleErrors } from '../utils/handleErrors';
import { successResponse } from '../utils/response';

export const getTranslateHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) throw new Error(ERRORS.MISSING_REQUEST_BODY);

    const { text, source, target } = JSON.parse(event.body);

    if (text.length > 1000) throw new Error(ERRORS.TRANSLATE_LIMIT_VALIDATE);

    const { TranslatedText: translatedText } =
      await translateService.getTranslateText({
        text,
        target,
        source,
      });

    return successResponse(200, { translatedText });
  } catch (error: any) {
    console.log(error);
    return handleErrors(error);
  }
};
