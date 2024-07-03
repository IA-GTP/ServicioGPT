import OpenAI from "openai";


interface Options{
    threadId: string;
    question: string;
}

export const createMessageUseCase = async (openAI: OpenAI, options: Options) =>{
    const {threadId, question} = options;

    const message = await openAI.beta.threads.messages.create(threadId, {
        role: 'user',
        content: question,
    });
    //console.log('mensaje asist:',message.assistant_id);
    //console.log('mensaje thread:',message.thread_id);
    return message;
}