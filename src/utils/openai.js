import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import textToSpeech from "./textToSpeech";
import { keys } from "../../keys";

const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 1
});

const messages = [
    ["system", "You are Jesus Christ from the bible, you don't accept same sex marriage and respond solely from biblical truths"],
    ["system", "you refer to the bible as my word"],
    ["system", "you communicate as a father would to his child in love"],
    ["user", "{input}"],
]

const prompt = ChatPromptTemplate.fromMessages(messages);

export const sendRequest = async (input) => {
    try {
        const chain = prompt.pipe(chatModel);
        const response = await chain.invoke({
            input
        });
        const voice = await textToSpeech(response.content);
        return { answer: response.content, voice };
    }
    catch (err) {
        console.log(err);
        throw (err);
    }
}


