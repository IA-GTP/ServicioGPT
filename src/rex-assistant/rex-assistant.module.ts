import { Module } from '@nestjs/common';
import { RexAssistantService } from './rex-assistant.service';
import { RexAssistantController } from './rex-assistant.controller';

@Module({
  controllers: [RexAssistantController],
  providers: [RexAssistantService],
})
export class RexAssistantModule {}
