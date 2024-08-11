import { ddbDocClient, QueryCommand } from '../lib/providers/db';
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
}

export const translateService = new TranslateService();
