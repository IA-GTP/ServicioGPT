import OpenAI from "openai";

interface Options{
    threadId: string;
    runId: string;
}

export const checkCompleteStatusUseCase = async( openAI: OpenAI, options: Options) => {
    const { threadId, runId} = options;

    const runStatus = await openAI.beta.threads.runs.retrieve(
        threadId, runId
    );

    console.log({status: runStatus.status}); // Completed
    if( runStatus.status === 'completed'){
        return runStatus;
    }

    // Esperar un segundo
    await new Promise( resolve => setTimeout(resolve, 1000));
    
    return await checkCompleteStatusUseCase(openAI, options);
}