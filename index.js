require("dotenv").config();
const axios = require("axios");
const readline = require("readline");

// Setup CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askPrompt() {
  rl.question("Enter your coding prompt for Claude: ", async (userPrompt) => {
    try {
      const response = await axios.post(
        "https://api.anthropic.com/v1/messages",
        {
          model: "claude-3-opus-20240229",
          max_tokens: 1024,
          temperature: 0.5,
          system: "You are a helpful code assistant. Respond with code when appropriate.",
          messages: [
            {
              role: "user",
              content: userPrompt
            }
          ]
        },
        {
          headers: {
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
          }
        }
      );

      const message = response.data.content[0].text;
      console.log("\nClaude's Response:\n");
      console.log(message);
    } catch (error) {
      console.error("Error talking to Claude:", error.response?.data || error.message);
    }

    rl.close();
  });
}

askPrompt();
