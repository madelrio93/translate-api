import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { translateService } from '../services/translate';
import { ERRORS } from '../utils/constants';
import { handleErrors } from '../utils/handleErrors';
import { successResponse } from '../utils/response';

export const removeFavoriteUserTranslateHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const body = event.body ? JSON.parse(event.body) : null;

    if (!body) throw new Error(ERRORS.MISSING_REQUEST_BODY);

    const data = await translateService.removeFavoriteByUser(body.id);

    return successResponse(200, { data });
  } catch (error: any) {
    console.log(error);
    return handleErrors(error);
  }
};
