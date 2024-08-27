import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { checkCompleteStatusUseCase, createMessageUseCase, createRunUseCase, createThreadUseCase, getMessageListUseCase } from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class SamAssistantService {

  private openia = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return createThreadUseCase( this.openia );
  }

  async userQuestion( questionDto: QuestionDto ) {
    const { threadId, question } = questionDto;

    const message = await createMessageUseCase(this.openia, { threadId, question });

    const run = await createRunUseCase( this.openia, { threadId });

    await checkCompleteStatusUseCase( this.openia, { runId: run.id, threadId: threadId });

    const messages = await getMessageListUseCase(this.openia, { threadId });
    return messages.reverse();
  }
}
