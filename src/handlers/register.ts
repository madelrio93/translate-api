import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { authService } from '../services/auth';

export const registerHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) throw new Error('Request body is missing');
    const { email, password, firstName, lastName } = JSON.parse(event.body);

    await authService.registerUser({
      email,
      password,
      firstName,
      lastName,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User registered successfully' }),
    };
  } catch (error: any) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
