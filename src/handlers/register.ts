import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { authService } from '../services/auth';
import { ERRORS } from '../utils/constants';
import { handleErrors } from '../utils/handleErrors';
import { successResponse } from '../utils/response';

export const registerHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) throw new Error(ERRORS.MISSING_REQUEST_BODY);
    const { email, password, firstName, lastName } = JSON.parse(event.body);

    await authService.registerUser({
      email,
      password,
      firstName,
      lastName,
    });

    return successResponse(200, {
      message: ERRORS.USER_REGISTERED_SUCCESS,
    });
  } catch (error: any) {
    console.log(error);
    return handleErrors(error);
  }
};
