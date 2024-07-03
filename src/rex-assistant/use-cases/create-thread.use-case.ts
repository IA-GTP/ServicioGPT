import OpenAI from "openai";

export const CreateThreadUseCase = async (openAI: OpenAI) =>{
    const { id } = await openAI.beta.threads.create();
    return {id};
}