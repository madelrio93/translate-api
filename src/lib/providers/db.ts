import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  DeleteCommand,
  ScanCommand
} from '@aws-sdk/lib-dynamodb';
import { region } from '../config';

const ddbDocClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region }),
);

export { ddbDocClient, PutCommand, DeleteCommand, ScanCommand };

