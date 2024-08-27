import OpenAI from "openai";

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async( openai: OpenAI, options: Options ) => {

  const { threadId, assistantId = 'asst_qHVz3kSEgQfYkjLc14VOrRDy' } = options;

  const run = await openai.beta.threads.runs.create( threadId, {
    assistant_id: assistantId,
    // instructions: //sobrescribe al asistente
  });

  return run;
}