import "dotenv/config"
import OpenAI from "openai";

const openai = new OpenAI({});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{
      role: "user",
      content: "What is the best way to do function calling in OpenAI APIs?",
    }],
    model: "gpt-3.5-turbo",
    temperature: 0.3,
  });
  console.log(chatCompletion.choices[0].message.content);
}

main();