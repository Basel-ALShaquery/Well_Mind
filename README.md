# Well Mind

A modern mental health platform built with React & Flask.

[![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.1.1-000000?style=flat-square&logo=flask)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776ab?style=flat-square&logo=python)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## ✨ Features

- **Mood Tracking** - Daily mood logging with AI recommendations
- **Therapy Sessions** - Book appointments with certified psychologists
- **Educational Content** - Articles, podcasts, and psychological tests
- **AI Chatbot** - MindHelper for 24/7 mental health support
- **Secure Authentication** - Safe user registration and login
- **Responsive Design** - Works perfectly on all devices

## 🛠️ Tech Stack

**Frontend:**
- React 19.1.0
- Vite 6.3.5
- Tailwind CSS 4.1.7
- Radix UI Components
- React Router DOM 7.6.1
- Recharts 2.15.3

**Backend:**
- Flask 3.1.1
- SQLAlchemy 2.0.41
- SQLite Database
- Flask-CORS 6.0.0

## 📁 Project Structure

```
wellmind_-main/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and helpers
│   │   └── assets/          # Static assets
│   ├── public/              # Public static files
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── backend/                 # Flask backend
│   ├── src/
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── static/          # Served static files
│   │   └── extensions.py    # Flask extensions
│   ├── main.py             # Application entry point
│   ├── requirements.txt    # Python dependencies
│   └── database/           # SQLite database files
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- npm or pnpm

### Installation

```bash
# Clone the repo
git clone <repository-url>
cd wellmind_-main

# Setup frontend
cd frontend
npm install
npm run build
cd ..

# Setup backend
cd backend
pip install -r requirements.txt
cd ..

# Copy built frontend to backend
cp -r frontend/dist/* backend/src/static/
```

### Running the App

**Development:**
```bash
# Terminal 1: Frontend
cd frontend && npm run dev

# Terminal 2: Backend
cd backend && python main.py
```

**Production:**
```bash
cd backend && python main.py
```

## 🌐 Deployment

### Docker Deployment
```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install Node.js for building frontend
RUN apt-get update && apt-get install -y nodejs npm

# Copy and build frontend
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

# Copy backend
COPY backend/ ./backend/

# Install Python dependencies
RUN pip install -r backend/requirements.txt

# Copy built frontend to backend static folder
RUN cp -r frontend/dist/* backend/src/static/

# Expose port
EXPOSE 5000

# Run the application
CMD ["python", "backend/main.py"]
```

### Heroku Deployment
Create `Procfile` in root directory:
```
web: cd backend && python main.py
```

Heroku buildpacks:
- `heroku/nodejs`
- `heroku/python`

### Environment Variables

Create a `.env` file in the backend directory:

```env
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///app.db
```

## 📋 API

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login

### Mood Tracking
- `GET /api/mood` - Get mood history
- `POST /api/mood` - Log new mood entry

## 🤖 AI Chatbot (MindHelper)

The platform includes an AI-powered chatbot built with Google's Gemini API:

- **Friendly Interface**: Warm, supportive conversations
- **Mental Health Focus**: Specialized in mental health topics
- **Quick Actions**: Predefined conversation starters
- **Smart Recommendations**: Context-aware responses

## 🎨 UI/UX Features

- **Dark/Light Mode**: Theme switching capability
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: Enhanced user experience
- **Accessibility**: WCAG compliant components
- **Modern Design**: Clean, professional interface

## 🔒 Security Features

- **Password Hashing**: Secure password storage
- **CORS Protection**: Configured cross-origin policies
- **Input Validation**: Client and server-side validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Sanitized user inputs

## 📈 Performance

- **Lazy Loading**: Components load on demand
- **Code Splitting**: Optimized bundle sizes
- **Caching**: Efficient static asset delivery
- **Database Optimization**: Indexed queries

## 🧪 Testing

```bash
# Backend tests
cd backend && pytest

# Frontend tests
cd frontend && npm run test
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Disclaimer:** Well Mind is not a substitute for professional mental health care. Please consult qualified healthcare providers for medical advice.

## 🙏 Acknowledgments

- **Basel Hossam Alshawqery** - Creator & Developer
- React, Flask, and all the amazing open-source libraries

---

**Well Mind** - Supporting mental health through technology. 🌟

*Made by Basel Hossam Alshawqery*