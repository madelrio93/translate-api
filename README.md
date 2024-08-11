# Translate API
A RESTful API for managing translations and user favorites.
This project provides an API for translating text and saving favorite translations. Users can register, log in, and manage their favorite translations using this API.

## Features
- User registration and authentication with Cognito
- Text translation using AWS Translate
- Manage favorite translations
- Secure endpoints with JWT authentication

## Technologies Used
- AWS Lambda
- Amazon DynamoDB
- AWS Cognito
- AWS Translate
- Serverless Framework
- Node.js
- TypeScript

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/madelrio93/translate-api.git
   cd translate-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   COGNITO_USER_POOL_ID=your_user_pool_id
   COGNITO_USER_POOL_CLIENT_ID=your_user_pool_client_id
   FAV_TRANSLATE_TABLE=your_dynamodb_table_name
   ```

4. **Deploy to AWS:**
   ```bash
   serverless deploy
   ```

   ## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Create a new Pull Request.

## Contact

If you have any questions, feel free to reach out to me at [madelrio93@gmail.com](mailto:madelrio93@gmail.com).
