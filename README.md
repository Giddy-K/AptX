# APTX - AI-Powered Learning Platform

An accessible, adaptive learning platform designed for students with Down syndrome, leveraging Google Cloud AI services to provide personalized education with support from teachers and guardians.

## Overview

APTX uses advanced AI technologies to transform traditional curriculum into accessible, engaging learning materials:

- **Document AI**: Extracts and structures content from uploaded materials
- **Vertex AI (Gemini)**: Simplifies complex content and generates adaptive assessments
- **Cloud Text-to-Speech**: Creates audio narration for all learning materials
- **Firestore**: Real-time progress tracking and data management
- **Cloud Storage**: Secure media and file management

## Key Features

### For Teachers
- Upload curriculum materials (PDF, DOCX)
- AI-powered content simplification
- Automatic generation of visual learning cards
- Track student progress and performance
- Manage lesson structure and content

### For Guardians
- Monitor student learning progress
- Receive notifications and updates
- Access detailed analytics
- Support students in their learning journey
- Set reminders and goals

### For Students
- **Accessible Interface**: Large buttons, high contrast, emoji feedback
- **Audio Support**: Text-to-speech for all content
- **Visual Learning**: Engaging visual cards and graphics
- **Adaptive Exams**: AI-generated questions that adjust to ability
- **Encouraging Feedback**: Positive reinforcement and support

## Technology Stack

### Backend
- **Runtime**: Node.js 18+ with Express.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication (JWT)
- **File Storage**: Google Cloud Storage
- **AI Services**: Vertex AI, Document AI, Cloud Text-to-Speech

### Architecture
- **RESTful API**: Versioned API endpoints
- **Microservices**: Modular service architecture
- **Cloud Functions**: Serverless AI processing
- **Cloud Run**: Scalable container deployment

## Project Structure

```
AptX/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── controllers/    # Request handlers
│   │   │   ├── routes/         # API routes
│   │   │   └── services/       # Business logic & AI services
│   │   ├── config/             # Configuration files
│   │   ├── middleware/         # Express middleware
│   │   ├── models/             # Data models
│   │   └── utils/              # Utility functions
│   ├── tests/                  # Test files
│   ├── logs/                   # Application logs
│   └── uploads/                # Temporary uploads
├── CLAUDE.md                   # Claude Code guidelines
├── SYSTEM_ARCHITECTURE.md      # System design documentation
└── SETUP_GUIDE.md             # Setup instructions

## Quick Start

### Prerequisites

- Node.js 18+
- Google Cloud Platform account
- Firebase project
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd AptX/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. **Set up Google Cloud** (See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions)
- Enable required APIs
- Create service account
- Set up Document AI processor
- Create Cloud Storage buckets

5. **Run the application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

6. **Verify installation**
```bash
curl http://localhost:3000/health
```

## API Documentation

### Base URL
```
Development: http://localhost:3000/api/v1
Production: https://your-domain.com/api/v1
```

### Authentication
All API requests (except `/auth/*`) require a Bearer token:
```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

### Key Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

#### Teacher
- `POST /teacher/curriculum` - Upload curriculum
- `GET /teacher/curriculum` - List curricula
- `POST /teacher/curriculum/:id/process` - Trigger AI processing

#### Guardian
- `GET /guardian/students` - Get assigned students
- `GET /guardian/student/:id/progress` - View student progress

#### Student
- `GET /student/lessons` - Get available lessons
- `POST /student/lesson/:id/start` - Start a lesson
- `GET /student/exam/:lessonId` - Get adaptive exam

For complete API documentation, see the Swagger docs at `/api-docs` (when running).

## Development

### Code Style
- ES6+ features (async/await, destructuring)
- Functional programming principles
- Comprehensive error handling
- Detailed logging

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm test -- --coverage
```

### Linting
```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

## Deployment

### Deploy to Google Cloud Run
```bash
# Build and deploy
gcloud builds submit --config cloudbuild.yaml

# Or manually
docker build -t gcr.io/PROJECT_ID/aptx-backend .
docker push gcr.io/PROJECT_ID/aptx-backend
gcloud run deploy aptx-backend --image gcr.io/PROJECT_ID/aptx-backend
```

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed deployment instructions.

## Monitoring

### View Logs
```bash
# Local logs
tail -f logs/app.log

# Cloud Run logs
gcloud logging read "resource.type=cloud_run_revision" --limit 50
```

### Health Check
```bash
curl http://localhost:3000/health
```

## Security

- JWT-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- Rate limiting
- Helmet.js security headers
- Firestore security rules
- Encrypted secrets with Secret Manager

## Cost Optimization

- Efficient API usage with caching
- Batch processing for AI operations
- Automatic scaling with Cloud Run
- Storage lifecycle policies
- Budget alerts and monitoring

See cost estimates in [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md).

## Contributing

1. Follow code style guidelines in [CLAUDE.md](./CLAUDE.md)
2. Write tests for new features
3. Update documentation
4. Submit pull request with clear description

## Accessibility

This platform is designed with accessibility as a core principle:
- WCAG 2.1 AAA compliance target
- Screen reader support
- Keyboard navigation
- High contrast UI
- Simplified language
- Audio support for all content

## License

MIT License - see LICENSE file for details

## Support

For setup help, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

For development guidelines, see [CLAUDE.md](./CLAUDE.md)

For architecture details, see [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md)

## Roadmap

- [ ] Phase 1: Core backend infrastructure ✅
- [ ] Phase 2: AI services integration ✅
- [ ] Phase 3: Authentication and user management
- [ ] Phase 4: Teacher features
- [ ] Phase 5: Guardian features
- [ ] Phase 6: Student features
- [ ] Phase 7: Adaptive exam system
- [ ] Phase 8: Analytics and reporting
- [ ] Phase 9: Frontend development
- [ ] Phase 10: Production deployment

## Acknowledgments

Built with:
- Google Cloud Platform
- Firebase
- Node.js and Express.js
- Vertex AI (Gemini)
- Document AI
- Cloud Text-to-Speech

---

**Made with ❤️ for inclusive education**
# **AptX — Accessible Learning Platform for Students with Down Syndrome**

### *Built for the ALX Africa x Google Cloud Hackathon*

---

## 📘 **Overview**

**AptX** is an inclusive AI-powered EdTech platform that transforms standard educational content into simplified, multi-sensory learning experiences for students with Down syndrome.
Teachers upload curriculum, the system uses **Google Cloud AI** to generate visuals, audio narration, and simplified summaries, and guardians support students through an accessible learning interface.
AptX also includes an **adaptive AI exam engine** and **impact-driven progress analytics**.

---

## 🎯 **Key Features**

### 👩‍🏫 **Teacher Portal**

* Upload curriculum (PDF, DOCX, text)
* Automated extraction of content using **Document AI**
* AI-generated:

  * Simplified learning text
  * Visual learning cards using Vertex Imagen
  * Audio narration using Text-to-Speech
  * Flashcards & summaries
* Lesson + exam creation dashboard

---

### 🧒 **Student Accessible Learning**

Designed for cognitive accessibility:

* High-contrast interface
* Large buttons for motor ease
* Audio instructions for every action
* Visual storyboards of each concept
* One-concept-per-screen lesson flow
* Emoji-based feedback
* Guardian-assisted navigation mode

---

### 👨‍👩‍👧 **Guardian Dashboard**

* Track student progress
* Review strengths and weak areas
* Monitor lesson completion
* View AI-generated exam readiness
* Receive reminders and learning suggestions
* Behavioral/engagement summaries using education data

---

### 📝 **Adaptive Exam Engine**

* AI-generated questions from teacher curriculum
* Audio-enabled exam mode
* 2–3 choice simplified MCQs
* Illustration-based questions for easier comprehension
* Adaptive difficulty powered by Vertex AI
* Instant scoring + detailed insights

---

## 🏗️ **System Architecture**

### **Frontend (Next.js / React)**

* Teacher dashboard
* Guardian dashboard
* Student interface
* Accessible UI system
* Audio & visual rendering components

### **Backend (Node.js or Python on Cloud Run)**

Microservices:

1. **Auth Service**
2. **Curriculum Processing Service (Document AI)**
3. **AI Generation Service (Vertex AI)**
4. **Exam Engine**
5. **Analytics & Impact Insights Service**

### **Databases**

* Firestore → user data, lessons, exams
* Cloud Storage → audio, visuals, documents
* BigQuery → analytics, longitudinal insights

### **Google Cloud Services Used**

* Vertex AI (Gemini, Imagen, TTS)
* Document AI
* Cloud Run
* Cloud Identity Platform
* Firestore
* Cloud Storage
* BigQuery

---

## 📁 **Project Structure**

```
aptx/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
│
├── backend/
│   ├── main.py or index.js
│   ├── services/
│   │   ├── ai_generation/
│   │   ├── curriculum_processing/
│   │   ├── exams/
│   │   └── analytics/
│   └── models/
│
├── infra/
│   ├── cloudrun/
│   ├── firestore/
│   └── terraform/ (optional)
│
└── README.md
```

---

## 🚀 **How to Run Locally**

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/aptx.git
cd aptx
```

---

### **2. Install Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

### **3. Install Backend**

```bash
cd backend
pip install -r requirements.txt      # if Python
# OR
npm install                          # if Node.js

python main.py
# OR
node index.js
```

---

## 🌐 **Deployment Guide (Google Cloud)**

1. Deploy backend microservices to **Cloud Run**
2. Upload assets to **Cloud Storage**
3. Configure authentication using **Cloud Identity Platform**
4. Use Firestore for real-time app data
5. Use BigQuery for insights and impact analytics
6. Deploy frontend on Firebase Hosting or Cloud Run

---

## 🧠 **AI Pipelines**

### **Curriculum-to-Lesson Pipeline**

1. Teacher uploads file → Cloud Storage
2. Document AI extracts & structures text
3. Vertex AI generates:

   * Simplified learning text
   * Visual storyboards
   * Audio narration
4. Firestore stores the lesson metadata
5. Cloud Storage stores asset files

### **Exam Pipeline**

1. Vertex AI identifies learning concepts
2. AI generates exam questions
3. Student completes adaptive exam
4. Firestore stores exam session
5. Analytics recommends next steps

---

## 📊 **Impact**

AptX directly supports inclusive education by:

* Offering multi-sensory content for cognitively diverse learners
* Reducing teacher workload with automated AI content generation
* Providing guardians with actionable insights
* Tracking meaningful progress and social-learning indicators

---

## 🧪 **Demo Steps**

1. Teacher uploads curriculum
2. AI generates audio/visual/simplified content
3. Guardian selects a student profile
4. Student enters guided learning mode
5. Student completes adaptive exam
6. Guardian reviews results and next steps

---

## 🤝 **Team & Contributors**

David 
Salma
Mary
Gideon
Ashley

---

## 📜 **License**

MIT License


