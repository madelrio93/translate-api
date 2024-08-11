import { randomUUID } from 'crypto';
import {
  ddbDocClient,
  DeleteCommand,
  PutCommand,
  ScanCommand,
} from '../lib/providers/db';
import {
  translateClient,
  TranslateTextCommand,
  TranslateTextCommandInput,
} from '../lib/providers/translate';
import { ERRORS } from '../utils/constants';

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
      new ScanCommand({
        TableName: process.env.FAV_TRANSLATE_TABLE,
        FilterExpression: 'userId = :userId',
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

    if (!res) throw new Error(ERRORS.FAILED_TO_ADD_FAV);

    return fav;
  }

  public async removeFavoriteByUser(id: string) {
    const res = await ddbDocClient.send(
      new DeleteCommand({
        TableName: process.env.FAV_TRANSLATE_TABLE,
        Key: {
          id,
        },
      }),
    );

    if (!res) throw new Error(ERRORS.FAILED_TO_REMOVE_FAV);

    return id;
  }
}

export const translateService = new TranslateService();
