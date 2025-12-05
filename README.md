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


