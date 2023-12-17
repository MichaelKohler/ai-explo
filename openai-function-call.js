import "dotenv/config"
import OpenAI from "openai";

const openai = new OpenAI({});

async function main() {
  const runner = openai.beta.chat.completions
    .runTools({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "How is the weather this week?" }],
      tools: [
        {
          type: "function",
          function: {
            function: getLocation,
            parameters: {
              type: "object",
              properties: {},
            },
          },
        },
        {
          type: "function",
          function: {
            function: getWeather,
            parse: JSON.parse,
            parameters: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                },
              },
            },
          },
        },
      ],
    })
    .on("message", (message) => console.log(message));

  const finalContent = await runner.finalContent();
  console.log(finalContent);
}

async function getLocation() {
  return "Berlin";
}

async function getWeather({ location }) {
  console.log("Passed location:", location)
  const temperature = 24;
  const precipitation = 20;
  return { temperature, precipitation };
}

main();