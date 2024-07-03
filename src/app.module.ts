import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { RexAssistantModule } from './rex-assistant/rex-assistant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GptModule,
    RexAssistantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
