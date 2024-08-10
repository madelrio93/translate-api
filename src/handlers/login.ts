import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { authService } from '../services/auth';

export const loginHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) throw new Error('Request body is missing');
    const { email, password } = JSON.parse(event.body);

    const data = await authService.loginUser({
      email,
      password,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        data,
        message: 'User sign in successfully',
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
