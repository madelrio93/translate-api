import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { authService } from '../services/auth';
import { ERRORS } from '../utils/constants';
import { handleErrors } from '../utils/handleErrors';
import { successResponse } from '../utils/response';

export const loginHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) throw new Error(ERRORS.MISSING_REQUEST_BODY);
    const { email, password } = JSON.parse(event.body);

    const data = await authService.loginUser({
      email,
      password,
    });

    return successResponse(200, {
      data,
      message: ERRORS.USER_SIGN_IN_SUCCESS,
    });
  } catch (error: any) {
    console.log(error);
    return handleErrors(error);
  }
};
