/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { google } from '@google-cloud/text-to-speech/build/protos/protos';

export class GoogleTextToSpeechAdapter {
  private textToSpeechClient: InstanceType<
    typeof TextToSpeechClient
  >;

  public constructor(
    googleCloudProjectId: string,
    googleCloudServiceAccount: string
  ) {
    this.textToSpeechClient = new TextToSpeechClient({
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
  ): Promise<[google.cloud.texttospeech.v1.ISynthesizeSpeechResponse, google.cloud.texttospeech.v1.ISynthesizeSpeechRequest | undefined, {} | undefined]> {
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
