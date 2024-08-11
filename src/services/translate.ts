import { randomUUID } from 'crypto';
import { ddbDocClient, PutCommand, QueryCommand } from '../lib/providers/db';
import {
  translateClient,
  TranslateTextCommand,
  TranslateTextCommandInput,
} from '../lib/providers/translate';

class TranslateService {
  public async getTranslateText({
    text,
    target,
    source,
  }: Type.TranslateParams) {
    const params: TranslateTextCommandInput = {
      Text: text,
      SourceLanguageCode: source ?? 'auto',
      TargetLanguageCode: target,
    };
    return await translateClient.send(new TranslateTextCommand(params));
  }

  public async getFavoritesByUser(userId: string) {
    const res = await ddbDocClient.send(
      new QueryCommand({
        TableName: process.env.FAV_TRANSLATE_TABLE,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      }),
    );

    return res.Items;
  }

  public async addFavoriteByUser(userId: string, data: Type.TranslateParams) {
    const fav = {
      id: randomUUID(),
      ...data,
    };
    const res = await ddbDocClient.send(
      new PutCommand({
        TableName: process.env.FAV_TRANSLATE_TABLE,
        Item: {
          userId,
          ...fav,
        },
      }),
    );

    if (!res) throw new Error('Failed to add fav translate');

    return fav;
  }
}

export const translateService = new TranslateService();
