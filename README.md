# 🦎 IguanaLogix

**IguanaLogix** is a full-stack integration demo built with [Iguana X](https://www.interfaceware.com/iguana), React, and Ruby on Rails. It showcases real-time HL7 message processing, AI-assisted message summarization, live chat/polling between staff, and a lightweight task delegation and patient scheduling system.

---

## 🔍 Overview

Healthcare teams are often overwhelmed by cryptic clinical messages and fragmented communication. **IguanaLogix** solves that by:

- Parsing HL7/FHIR messages through **Iguana X**
- Summarizing them in plain English using **OpenAI’s GPT API**
- Enabling staff to **chat, vote, and escalate tasks**
- Letting admins **assign tickets** or **schedule patient appointments** with just a few clicks

---

## 🚀 Tech Stack

| Layer          | Tech                      |
|----------------|---------------------------|
| Frontend       | React (Vite)              |
| Backend        | Ruby on Rails (API mode)  |
| AI Integration | OpenAI API (GPT-4/GPT-3.5) |
| Data Storage   | PostgreSQL or MySQL       |
| Real-Time Chat | Firebase or WebSockets    |
| HL7 Parsing    | Iguana X Components (Lua) |

---

## ⚙️ Features

- 📥 **HL7/FHIR Message Ingestion** via Iguana X
- 🧠 **AI-Powered Summarization** using OpenAI
- 💬 **Live Polling + Team Chat** for collaboration
- 🎟️ **Ticket Delegation** by department with status tracking
- 📅 **(Stretch Goal)** Patient Scheduling by Admins
- 🔍 **Message Logging** with retry/debug tools

---

## 🧪 How It Works

```
[ HL7 Message via IguanaX ]
        ↓
[ Translator parses + logs ]
        ↓
[ Message sent to OpenAI API ]
        ↓
[ React UI displays summary ]
        ↓
[ Staff chat | poll | assign task | schedule ]
```

---

## 🧰 Project Structure

```
iguanalogix/
├── frontend/                # React app (Vite)
├── backend/                 # Rails API (PostgreSQL or MySQL)
├── docs/                    # Planning docs & wireframes
│   └── IguanaLogix_Project_Plan.docx
├── README.md
└── ...
```

---

## 📄 Planning & Design

- **📝 Project Plan**: [`/docs/IguanaLogix_Project_Plan.docx`](docs/IguanaLogix_Project_Plan.docx)
- **🎨 Wireframes**: Designed in Figma (link optional)
- **🧠 User Stories**:
  - Nurses can summarize messages
  - Admins can assign tasks or schedule patients
  - Clinicians can discuss high-priority cases

---

## 💡 Future Enhancements

- Role-based access control
- PDF/CSV exports of ticket and message logs
- Message severity prediction using AI
- Email/SMS notifications for scheduled events
- Dark mode toggle

---

## 📦 Installation (Local Dev)

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/iguanalogix.git
cd iguanalogix
```

### 2. Setup Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend (Rails API)

```bash
cd backend
bundle install
rails db:create db:migrate
rails s
```

> ⚠️ Don’t forget to add your OpenAI API key to your `.env` file!


---

## 🛡 Disclaimer

This project uses mock HL7 data and is intended for demonstration purposes only. It is not connected to any real clinical system.
