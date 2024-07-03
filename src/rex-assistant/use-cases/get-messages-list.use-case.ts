import OpenAI from "openai";

interface Options {
    threadId: string;
}

export const getMessageListUseCase = async(openAI: OpenAI, options: Options) =>{
    const { threadId } = options;
    const messageList = await openAI.beta.threads.messages.list(threadId);

    //console.log(messageList.data[0]);

    const message = messageList.data.map(message => ({
        role: message.role,
        content: message.content.map( content => (content as any).text.value )
    }));

    return message;
}