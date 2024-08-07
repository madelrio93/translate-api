import { TranslateTextCommandOutput } from '@aws-sdk/client-translate';
import {
  TranslateClient,
  TranslateTextCommand,
  TranslateTextCommandInput,
} from '@aws-sdk/client-translate';

const translateClient = new TranslateClient({ region: 'us-east-1' });

export const getTranslate = async ({
  text,
  target,
  source,
}: Types.TranslateParams): Promise<TranslateTextCommandOutput> => {
  const params: TranslateTextCommandInput = {
    Text: text,
    SourceLanguageCode: source ?? 'auto',
    TargetLanguageCode: target,
  };
  return await translateClient.send(new TranslateTextCommand(params));
};
