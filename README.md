# Zetiify 🚀  
*A prototype networking app to connect Investors, Founders & Talent.*

![Zetiify Screenshot](https://zetiify-33794.web.app) <!-- replace with actual screenshot later -->

## 📌 Overview
Zetiify is a modern networking platform built as a **Proof of Concept (PoC)**.  
It enables:
- 🔑 **Google Authentication** (Firebase Auth)
- 💬 **Real-time Chat** with auto-scroll & message history
- 👤 **Signal-rich Profiles** (Investors, Founders, Talent)
- 📊 **Opportunities Dashboard** with filters
- 📱 **Responsive UI** for mobile, tablet & desktop
- ⚡ **Secure Cloud Firestore Database** integration

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS  
- **UI Icons**: Lucide React  
- **Backend/DB**: Firebase (Auth + Firestore + Hosting)  
- **State**: React Context API  

## 📂 Project Structure
zetiify/
├─ src/
│ ├─ components/ # Navbar & shared UI components
│ ├─ context/ # AuthContext for Google login
│ ├─ pages/ # Landing, Dashboard, Chat
│ ├─ shared/ # mockData for fallback demo users
│ └─ firebase.js # Firebase config & setup
├─ public/ # Static assets
├─ package.json # Dependencies
└─ README.md # Project docs

## 🚀 Features
### 🔑 Authentication
- Google Sign-In using Firebase Auth  
- User profiles automatically stored in Firestore (`/users` collection)  

### 💬 Chat System
- **1-to-1 conversations** (no self-chat)  
- **Auto-scroll** to latest message  
- **Timestamps & avatars** shown  
- Works in **real-time** (Firestore `onSnapshot`)  

### 📊 Dashboard
- Shows all registered users (excluding yourself)  
- Search filter: by name, role, sector, or location  
- “Message” button opens chat with that user  

### 📱 Responsive Design
- Mobile: Sidebar toggles with back button  
- Tablet & Desktop: Sidebar + Chat visible  
- Composer (message box) is **sticky** at bottom  

## ⚙️ Setup Instructions
1. Clone this repo:
   ```bash
   git clone https://github.com/bhuvanbhuvi043/zetiify-poc/
   cd zetiify