import TextToSpeech, {
  SynthesizeSpeechResponse,
} from '@google-cloud/text-to-speech';

export class GoogleTextToSpeechAdapter {
  private textToSpeechClient: InstanceType<
    typeof TextToSpeech.TextToSpeechClient
  >;

  public constructor(
    googleCloudProjectId: string,
    googleCloudServiceAccount: string
  ) {
    this.textToSpeechClient = new TextToSpeech.TextToSpeechClient({
      projectId: googleCloudProjectId,
      keyFilename: googleCloudServiceAccount,
    });
  }

  public checkSynthesizeSpeech(): Promise<void> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try {
          await this.synthesizeSpeechByLanguageCodeAndVoiceName('test', 'en');
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    );
  }

  public synthesizeSpeechByLanguageCodeAndVoiceName(
    text: string,
    languageCode: string,
    voiceName?: string
  ): Promise<[SynthesizeSpeechResponse]> {
    return this.textToSpeechClient.synthesizeSpeech({
      input: {
        text,
      },
      voice: {
        languageCode,
        name: voiceName,
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
    });
  }
}