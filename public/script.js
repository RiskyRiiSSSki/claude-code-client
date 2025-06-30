async function sendPrompt() {
  const prompt = document.getElementById("prompt").value;

  const responseBox = document.getElementById("response");
  responseBox.textContent = "Claude is thinking...";

  const res = await fetch("/api/claude", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  responseBox.textContent = data.reply;
}
