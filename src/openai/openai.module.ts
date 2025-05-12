import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { OpenaiGateway } from './openai.gateway';
import { ElevenlabsModule } from '../elevenlabs/elevenlabs.module';

@Module({
  imports: [ElevenlabsModule],
  providers: [OpenaiService, OpenaiGateway],
  controllers: [OpenaiController],
  exports: [OpenaiService],
})
export class OpenaiModule {}