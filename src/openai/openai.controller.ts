import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { ChatRequestDto } from './dto/chat-request.dto';

@Controller('api/openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('chat')
  async generateChatCompletion(@Body() chatRequest: ChatRequestDto) {
    return this.openaiService.generateCompletion(chatRequest);
  }
}