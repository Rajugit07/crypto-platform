# AI-Powered Crypto Market Analyst

A real-time crypto tracking dashboard with an AI chatbot that provides insights, latest prices, gas fees, and news!

## ✅ Features

-   🔹 **Live Crypto Price Tracker:** Get real-time prices for Bitcoin, Ethereum, and more.
-   ⛽ **Ethereum Gas Tracker:** Know the latest gas fees using the Etherscan API.
-   🤖 **AI Chatbot for Crypto Queries:** Ask about market trends, coins, and more using Gemini AI.
-   📰 **Crypto News Feed (Optional):** Get the latest updates from the crypto world.
-   🎨 **Beautiful, Responsive UI:** Styled with animations & effects for an engaging experience.

---

## 🗂️ Folder Structure (Backend)

```
/server
├── config/
│   └── key.js
├── controllers/
│   ├── chatController.js  # AI chatbot integration
│   ├── cryptoController.js  # Fetch crypto prices
│   ├── gasController.js  # Fetch Ethereum gas fees
│   └── userController.js  # Login and logout
├── database/
│   └── db.js  # Connect MongoDB
├── middleware/
│   └── isAuthenticate.js  # Authentication check
├── models/
│   └── (Schema files for MongoDB)
├── routes/
│   ├── cryptoRoutes.js  # Crypto price routes
│   ├── gasRoutes.js  # Gas tracker routes
│   └── chatRoutes.js  # Chatbot routes
├── server.js  # Main Express server
├── package.json  # Backend dependencies
└── .env  # Store API keys securely
```

---

## ⚙️ Dependencies

```json
{
    "@google/generative-ai": "^0.24.0",
    "axios": "^1.8.2",
    "bcryptjs": "^3.0.2",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.12.1",
    "nodemon": "^3.1.9"
}
```

---

## 🚀 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Rajugit07/crypto-platform.git
```

2. **Navigate to the backend directory:**

```bash
cd server
```

3. **Install dependencies:**

```bash
npm install
```

4. **Set up environment variables:**

-   Create a `.env` file in the root directory and add:

```
MONGO_URI=your_mongo_connection_string
ETHERSCAN_API_KEY=your_etherscan_api_key
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
```

5. **Run the server:**

```bash
npm run dev
nodemon
```

---

## 🧠 Usage

-   Access the app at `http://localhost:8080`
-   Use the AI chatbot to query market trends.
-   Check live prices and gas fees.

---

## 📡 API Documentation (Postman)

https://go.postman.co/workspace/My-Workspace~9ceb3eaf-7450-44fb-8575-3717bc268f2c/documentation/40293109-ea9239eb-c2a4-4c03-830b-ee95d7a40c26?entity=request-79820c8c-b229-46ba-9ea3-cbc2a513e4a1

---
