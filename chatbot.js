// Knowledge base
const knowledge = [
  {
    keywords: ["name", "who are you"],
    answer: "I'm Enejan, a Machine Learning Engineer specializing in AI and RAG systems."
  },
  {
    keywords: ["skills", "technologies", "tech stack"],
    answer: "My main skills include Python, TensorFlow, PyTorch, OpenCV, NLP, RAG systems, and web development."
  },
  {
    keywords: ["projects", "portfolio", "work"],
    answer: "I have worked on projects like a Flower Detection Deep Learning Model and a RAG chatbot using ChromaDB and Ollama."
  },
  {
    keywords: ["experience", "career"],
    answer: "I have experience building AI models, machine learning pipelines, and web applications."
  },
  {
    keywords: ["contact", "email", "linkedin", "github"],
    answer: "You can contact me via LinkedIn: https://linkedin.com/in/enejan or GitHub: https://github.com/enejan"
  }
];

// Find answer function
function findAnswer(question) {
  question = question.toLowerCase();
  for (let item of knowledge) {
    for (let keyword of item.keywords) {
      if (question.includes(keyword)) return item.answer;
    }
  }
  return "I’m not sure about that. Please check my portfolio or GitHub!";
}

// Send message function
function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (!message) return;

  const chat = document.getElementById("chat-messages");

  // User message
  chat.innerHTML += `<div class="msg user"><div class="msg-bubble">${message}</div></div>`;

  // Bot response
  const reply = findAnswer(message);
  chat.innerHTML += `<div class="msg"><div class="msg-bubble">${reply}</div></div>`;

  chat.scrollTop = chat.scrollHeight;
  input.value = "";
}

// Toggle chatbot visibility (for header link)
function toggleChat() {
  const chat = document.getElementById("chatbot");
  chat.style.display = chat.style.display === "none" ? "flex" : "none";
}
