import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatRequestDto } from './dto/chat-request.dto';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateCompletion(chatRequest: ChatRequestDto): Promise<any> {
    try {
      return await this.openai.chat.completions.create({
        model: chatRequest.model || 'gpt-3.5-turbo',
        messages: chatRequest.messages,
        stream: false,
      });
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }

  async generateStreamCompletion(chatRequest: ChatRequestDto) {
    try {
      return await this.openai.chat.completions.create({
        model: chatRequest.model || 'gpt-3.5-turbo',
        messages: chatRequest.messages,
        stream: true,
      });
    } catch (error) {
      console.error('OpenAI API Stream Error:', error);
      throw error;
    }
  }
}