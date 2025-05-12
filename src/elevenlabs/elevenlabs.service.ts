import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ElevenlabsService {
  private readonly apiKey: string| undefined;
  private readonly baseUrl = 'https://api.elevenlabs.io/v1';
  private readonly defaultVoiceId = '21m00Tcm4TlvDq8ikWAM'; // Rachel voice

  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY;
    if (!this.apiKey) {
      console.warn('ELEVENLABS_API_KEY not found in environment variables');
    }
  }

  async textToSpeech(text: string, voiceId?: string): Promise<Buffer> {
    try {
      const selectedVoiceId = voiceId || this.defaultVoiceId;
      
      const response = await axios({
        method: 'post',
        url: `${this.baseUrl}/text-to-speech/${selectedVoiceId}`,
        data: {
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        },
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      });

      return Buffer.from(response.data);
    } catch (error) {
      console.error('Eleven Labs API error:', error.response?.data || error.message);
      throw new Error('Failed to generate speech from Eleven Labs');
    }
  }
}