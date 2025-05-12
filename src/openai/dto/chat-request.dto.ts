export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }
  
  export class ChatRequestDto {
    messages: ChatMessage[];
    model: string;
    stream: boolean;
  }