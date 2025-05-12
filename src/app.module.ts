import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { ElevenlabsModule } from './elevenlabs/elevenlabs.module';

@Module({
  imports: [
    OpenaiModule,
    ElevenlabsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}