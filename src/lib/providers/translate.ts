import {
  TranslateClient,
  TranslateTextCommand,
  TranslateTextCommandInput,
} from '@aws-sdk/client-translate';

const translateClient = new TranslateClient({ region: 'us-east-1' });

export { translateClient, TranslateTextCommand, TranslateTextCommandInput };
