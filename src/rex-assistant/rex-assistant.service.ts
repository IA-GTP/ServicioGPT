import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CreateThreadUseCase, checkCompleteStatusUseCase, createMessageUseCase, createRunUseCase, getMessageListUseCase } from './use-cases';
import { QuestionDTO } from './DTOs/question.dto';

@Injectable()
export class RexAssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await CreateThreadUseCase(this.openai);
  }

//   async userQuestion(questionDTO: QuestionDTO) {
//     const { threadId, question } = questionDTO;

//     const message = await createMessageUseCase(this.openai, {
//       threadId,
//       question,
//     });

//     const run = await createRunUseCase(this.openai, {threadId});

//     await checkCompleteStatusUseCase(this.openai, {runId: run.id, threadId: threadId});

//     const messages = await getMessageListUseCase(this.openai, {threadId});

//     return messages;
//   }
async userQuestion( questionDto: QuestionDTO ) {
    const { threadId, question } = questionDto;

    const message = await createMessageUseCase(this.openai, { threadId, question });
    
    const run = await createRunUseCase( this.openai, { threadId } );

    await checkCompleteStatusUseCase( this.openai, { runId: run.id, threadId: threadId } );

    const messages = await getMessageListUseCase(this.openai, { threadId });
    
    return messages.reverse();
  }
}
