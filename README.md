# Live Polling System

 A real-time web application that allows teachers to conduct live polls in classrooms and students to respond instantly. It’s built using **React.js** for the frontend and **Node.js (Express.js) with Socket.IO** for real-time communication.

---

## 🚀 Features

### 👨‍🏫 Teacher
- Create new poll questions
- View live poll results
- Ask new questions only if:
  - No question has been asked yet
  - All students have responded

### 🧑‍🎓 Student
- Enter name (unique per tab/session)
- Submit answers when a question is live
- View live results after answering
- Must answer within **60 seconds** or results auto-show

---

## 🛠️ Tech Stack

| Layer        | Tech                     |
|--------------|--------------------------|
| Frontend     | React.js (Redux optional)|
| Backend      | Node.js, Express.js      |
| Real-time    | Socket.IO                |

---

## 📦 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Avibhatnagar10/LivePollingSystem

