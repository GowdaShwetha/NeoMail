# 🚀 NeoMail – AI Email Writer

NeoMail is an AI-powered email assistant that helps users compose professional, personalized emails in seconds. Powered by GeminiAPI and built using Spring Boot, React, and a Chrome Extension, NeoMail brings the power of AI to your inbox.

# ✨ Features

🧠 AI-Powered Email Writing

✉️ Smart Email Templates & Tone Adjustments

🌐 Chrome Extension for Gmail Integration

📦 Backend with Spring Boot and Gemini API

⚛️ Responsive Frontend in React

🔒 Secure Authentication (JWT + OAuth optional)

# 🔧 Tech Stack

Frontend: React, Tailwind CSS, Axios

Backend: Spring Boot, REST API, JWT

Gemini API

Extension: JavaScript, Chrome Extension APIs

Others: GitHub Actions

⚙️ Setup & Installation
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/neomail.git
cd neomail
2. Backend (Spring Boot)
bash
Copy
Edit
cd backend
./mvnw spring-boot:run
Configure your application.properties with:

properties
Copy
Edit
openai.api.key=your_openai_key
spring.datasource.url=...
3. Frontend (React)
bash
Copy
Edit
cd frontend
npm install
npm start
4. Chrome Extension
Load the /extension folder in Chrome via chrome://extensions/

Enable "Developer Mode" and click "Load Unpacked"
