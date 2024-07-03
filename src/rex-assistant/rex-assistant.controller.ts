import { Body, Controller, Post } from '@nestjs/common';
import { RexAssistantService } from './rex-assistant.service';
import { QuestionDTO } from './DTOs/question.dto';

@Controller('rex-assistant')
export class RexAssistantController {
  constructor(private readonly rexAssistantService: RexAssistantService) {}

  @Post('create-thread')
  async createThread(){
    return await this.rexAssistantService.createThread();
  }

  @Post('user-question')
  async userQuestion(
    @Body() questionDTO: QuestionDTO
  ){ 
    return await this.rexAssistantService.userQuestion(questionDTO);
  }
}
