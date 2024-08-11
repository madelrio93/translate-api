import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { jwtValidate } from '../lib/utils/jwtValidate';
import { translateService } from '../services/translate';
import { ERRORS } from '../utils/constants';
import { handleErrors } from '../utils/handleErrors';
import { successResponse } from '../utils/response';

export const addFavoriteUserTranslateHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const token = event.headers.authorization;
    const body = event.body ? JSON.parse(event.body) : null;

    if (!token) throw new Error(ERRORS.AUTHORIZATION_TOKEN_MISSING);
    if (!body) throw new Error(ERRORS.MISSING_REQUEST_BODY);

    const userId = await jwtValidate(token);
    const data = await translateService.addFavoriteByUser(userId, body);

    return successResponse(200, { data });
  } catch (error: any) {
    console.log(error);
    return handleErrors(error);
  }
};