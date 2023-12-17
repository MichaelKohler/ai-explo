import 'dotenv/config'
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const content = "Take the top 10 of Forbes wealth list and argue who is the most ethical person.";

async function runForModel(model) {
  console.log("Running for model:", model);
  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: "user", content }
    ],
  })

  console.log(completion.choices[0].message.content)
}

async function main() {
  const models = [
    "google/gemini-pro",
    "mistralai/mixtral-8x7b-instruct",
    "nousresearch/nous-capybara-7b",
  ];

  for (const model of models) {
    await runForModel(model);
  }
}

main();