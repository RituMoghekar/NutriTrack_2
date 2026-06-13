# NutriTrack 🥗

NutriTrack is a full-stack nutrition and wellness platform designed to help users build healthier food habits through interactive meal planning, nutrition education, community support, and accessibility-focused features.

The application combines a modern React-based frontend with a Node.js/Express backend and MongoDB database integration to provide a responsive and user-friendly health companion.

---

## ✨ Features

### 🥗 Smart Meal Planner
- Personalized weekly meal planning interface
- Breakfast, lunch, and dinner scheduling
- Ingredient-based meal cards
- Estimated meal cost calculation
- Budget-friendly food alternatives

### 🔊 Voice Assisted Nutrition
- Text-to-speech support using browser Speech Synthesis API
- Listen to:
  - Meal summaries
  - Cooking instructions
  - Recipe details

### 🌐 Multilingual Support
- Language switching support
- Translation context management
- Voice output based on selected language

### 🍳 Interactive Cooking Assistant
- Step-by-step cooking workflow
- Cooking checklist
- Completion tracking
- Celebration animation using confetti

### 📄 Meal Plan Export & Sharing
- Generate weekly meal plan PDF
- Share meal plans through WhatsApp

### 🧠 Nutrition Learning Activities
- Interactive nutrition quizzes
- Memory matching activities
- Build-a-plate learning module
- Guess nutrient challenges

### 👩‍⚕️ Community Health Support
- Community posts
- Health-related discussions
- Questions and answers
- Health worker interaction support

### 📱 Progressive Web App Support
- PWA configuration
- Installable application support

---

# 🛠 Tech Stack

## Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- ShadCN UI
- React Router
- React Query
- Framer Motion
- Zustand
- Firebase integration
- i18next internationalization

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- dotenv
- CORS

## Additional Libraries
- html2canvas
- jsPDF
- canvas-confetti
- Lucide Icons

---

# 📂 Project Structure

```
NutriTrack_2/

│
├── public/
│   ├── sounds/              # Application audio files
│   ├── stories/             # Educational nutrition videos
│   └── PWA assets
│
├── src/
│   │
│   ├── components/          # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Quiz.tsx
│   │   ├── BuildAPlateCard.tsx
│   │   ├── MemoryMatchCard.tsx
│   │   └── UI components
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── TranslationContext.tsx
│   │
│   ├── data/
│   │   └── Static application data
│   │
│   ├── hooks/
│   │   └── Custom React hooks
│   │
│   ├── pages/
│   │   └── Application pages
│   │
│   ├── firebase.ts
│   ├── i18n.ts
│   └── App.tsx
│
├── server/
│   │
│   ├── models/
│   │   ├── Post.js
│   │   └── Question.js
│   │
│   ├── routes/
│   │   ├── posts.js
│   │   └── questions.js
│   │
│   └── server.js
│
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone <repository-url>

cd NutriTrack_2
```

---

# Frontend Setup

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Backend Setup

Move into server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
```

Start backend:

```bash
npm start
```

Backend runs using Express server.

---

# 🔌 Backend API Modules

## Posts API

### Get posts

```
GET /api/posts
```

### Create post

```
POST /api/posts
```

---

## Questions API

### Get questions

```
GET /api/questions
```

### Ask question

```
POST /api/questions
```

### Add answer

```
POST /api/questions/:id/answer
```

---

# 🔐 Environment Variables

Create:

```
.env
```

Example:

```
MONGO_URI=your_database_url
```

Do not upload `.env` files to GitHub.

---

# 🚀 Running the Complete Project

Open two terminals.

Terminal 1:

```bash
npm run dev
```

Terminal 2:

```bash
cd server
npm start
```

---

# 🎯 Project Highlights (Resume)

- Developed a full-stack nutrition and wellness platform using React, TypeScript, Node.js, Express, and MongoDB.
- Implemented interactive meal planning, voice-assisted cooking guidance, multilingual support, and nutrition learning modules.
- Built REST APIs for community posts and health-related discussions.
- Integrated PDF generation, browser speech synthesis, animations, and responsive UI components.

---

# Future Improvements

- AI-based personalized diet recommendation
- Nutrition tracking dashboard
- User authentication improvements
- Cloud deployment
- Real-time community updates

---

## Author

Developed as a full-stack web application project.
