# 🤖 Riva AI – Smart Voice Assistant for Websites

Riva AI is a **full-stack MERN-based AI voice assistant platform** that allows users to embed an intelligent, voice-enabled assistant into any website. It supports **speech recognition, text-to-speech, AI responses via Gemini, navigation commands, authentication, and billing system integration.**

It is designed as a **plug-and-play AI widget system** for businesses to enhance user interaction on their websites.

---
## ✨ Features
### 🧠 AI Capabilities
- Gemini-powered intelligent responses
- Context-aware business assistant
- Short, voice-friendly responses optimized for speech output
- Custom assistant personality per business
### 🎤 Voice Assistant
- Speech-to-text (Web Speech API)
- Text-to-speech response system
- Real-time voice interaction
- Wave animation feedback during listening
### 🌐 Website Integration
- Embeddable assistant via script tag
- Dynamic assistant loading using userId
- Custom branding per business
- Floating assistant UI widget
### 🧭 Smart Navigation
- AI-powered navigation commands:
 - "open pricing page"
 - "go to home"
- Auto-detects website routes using keywords
- Prevents redundant navigation
### 🔐 Authentication System
- Secure user authentication
- JWT-based session handling
- Protected API routes
### 💳 Billing System
- Razorpay integration
- Free & Pro plan support
- Message quota system for free users
- Subscription expiry handling
### ⚙️ Admin Config System
- Custom assistant name
- Business-specific configuration
- Theme customization (dark, light, glass, neon)
  
---
## 🏗️ Tech Stack
![MongoDB](https://shields.io)
![Express](https://shields.io)
![React](https://shields.io)
![Node.js](https://shields.io)

### Frontend (Client)
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- Web Speech API
### Backend (Server)
- Node.js
- Express.js
- MongoDB + Mongoose
- Gemini API (Google Generative AI)
- Razorpay API
- JWT Authentication
  
---
## 📁 Project Structure

```text
Riva-AI/
├── Client/                 
│   ├── public/              
│   ├── src/                 
│   ├── package.json         
│   └── vite.config.js       
└── Server/                  
    ├── Configs/            
    ├── Controllers/         
    ├── Middleware/          
    ├── Models/              
    ├── index.js             
    └── package.json         
```

---
## ⚙️ Installation & Setup
### 1. Clone Repository

```bash
git clone https://github.com/your-username/Riva-AI.git
cd Riva-AI
```
---
### 2. Setup Server

```bash
cd Server
npm install
```

Create a `.env` file in the `Server` root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
GEMINI_API_KEY=your_gemini_key
RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret
```

Run the backend server:
```bash
npm start
```
---
### 3. Setup Client

```bash
cd Client
npm install
npm run dev
```
---
## 🔗 Embedding Riva AI in Any Website
Add this script tag right before the closing `</body>` tag
```html
<script 
  src="https://your-domain.com/assistant.js" 
  data-user-id="USER_ID">
</script>
```

---
## 🧠 How It Works
1. User installs script on website
2. Script loads assistant UI dynamically
3. User interacts via voice
4. Speech → Text (Web Speech API)
5. Backend processes request
6. Gemini generates response
7. Response → Speech output
8. Optional navigation triggers

---
## 🌐 API Overview
### Auth
* `POST /api/auth/register`
* `POST /api/auth/login`

### Assistant
* `GET /api/assistant/config/:userId`
* `POST /api/assistant/ask`

### Billing
* `POST /api/billing/create-order`
* `POST /api/billing/verify`

---
## 🎯 Key Highlights
- 🔥 Full-stack SaaS AI product
- 🔥 Real-time voice AI assistant
- 🔥 Embeddable widget architecture (like Intercom / Crisp)
- 🔥 Gemini LLM integration
- 🔥 Subscription-based SaaS model
- 🔥 Multi-theme UI system
- 🔥 Navigation-aware AI responses
- 🔥 Production-ready backend structure

---
## 🚀 Future Improvements
- WebSocket-based real-time streaming responses
- Multi-language support
- Analytics dashboard for businesses
- Fine-tuned assistant personalities
- Chrome extension version
- AI memory per user session
  
---
## 🔒 Security Considerations
- JWT authentication for APIs
- API key protection for Gemini
- Rate limiting for free users
- Protected billing endpoints

---
## 👨‍💻 Author
**Sainath**
- Full Stack MERN Developer
- Focus: Backend + AI Systems + SaaS Products
  
---
## ⭐ Final Note
Riva AI is designed as a **scalable SaaS AI assistant platform**, combining modern web technologies with LLM-powered intelligence and voice interaction.







