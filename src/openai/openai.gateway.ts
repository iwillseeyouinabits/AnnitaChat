import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OpenaiService } from './openai.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { ElevenlabsService } from '../elevenlabs/elevenlabs.service';

@WebSocketGateway({ cors: true })
export class OpenaiGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly openaiService: OpenaiService,
    private readonly elevenlabsService: ElevenlabsService,
  ) {}

  @SubscribeMessage('chat')
  async handleChat(
    @MessageBody() chatRequest: ChatRequestDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (chatRequest.stream) {
        const stream = await this.openaiService.generateStreamCompletion(chatRequest);
        
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            client.emit('chat_response_chunk', { content });
          }
        }
        
        client.emit('chat_response_done');
      } else {
        const response = await this.openaiService.generateCompletion(chatRequest);
        client.emit('chat_response', response);
      }
    } catch (error) {
      client.emit('chat_error', { 
        message: error.message || 'An error occurred during chat completion' 
      });
    }
  }

  @SubscribeMessage('status')
  handleStatus() {
    return { status: 'OpenAI WebSocket is connected' };
  }
}