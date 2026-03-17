function findAnswer(question) {
  question = question.toLowerCase();
  for (let item of knowledge) {
    for (let keyword of item.keywords) {
      if (question.includes(keyword)) {
        return item.answer;
      }
    }
  }
  return "I’m not sure about that. Please check my portfolio or GitHub!";
}

function sendMessage() {
  let input = document.getElementById("chat-input");
  let message = input.value.trim();
  if (!message) return;

  const chat = document.getElementById("chat-messages");
  chat.innerHTML += `<p><b>You:</b> ${message}</p>`;

  const reply = findAnswer(message);
  chat.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;

  chat.scrollTop = chat.scrollHeight;
  input.value = "";
}
