import { Module } from '@nestjs/common';
import { ElevenlabsService } from './elevenlabs.service';
import { ElevenlabsController } from './elevenlabs.controller';

@Module({
  providers: [ElevenlabsService],
  controllers: [ElevenlabsController],
  exports: [ElevenlabsService],
})
export class ElevenlabsModule {}