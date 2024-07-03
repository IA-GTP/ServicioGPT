import OpenAI from "openai";


interface Options{
    threadId: string;
    assistantId?: string;
}

export const createRunUseCase = async(openAI: OpenAI, options: Options) => {
    const { threadId, assistantId = 'asst_JtMbqbVbYUfz4jqCFMXlfj2g'} = options;

    const run = await openAI.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
        // instruccions: // Ojo, todo lo que hagas aqui sobreescribira al asistente

    });

    //console.log('creacion assist:',run.assistant_id);
    //console.log('creacion thread:',run.thread_id);
    return run;
}
