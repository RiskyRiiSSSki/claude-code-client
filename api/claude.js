export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      temperature: 0.5,
      system: "You are a helpful coding assistant. Respond with clean, useful code.",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const result = await response.json();
  const reply = result.content?.[0]?.text || "[No response from Claude]";
  res.status(200).json({ reply });
}
