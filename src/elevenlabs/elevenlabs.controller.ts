import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ElevenlabsService } from './elevenlabs.service';

@Controller('api/elevenlabs')
export class ElevenlabsController {
  constructor(private readonly elevenlabsService: ElevenlabsService) {}

  @Post('text-to-speech')
  async textToSpeech(
    @Body() body: { text: string; voiceId?: string },
    @Res() res: Response,
  ) {
    try {
      const audioBuffer = await this.elevenlabsService.textToSpeech(
        body.text,
        body.voiceId,
      );

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length,
      });

      return res.status(HttpStatus.OK).send(audioBuffer);
    } catch (error) {
      console.error('Text-to-speech error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to generate speech',
        message: error.message,
      });
    }
  }
}