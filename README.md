Goa Trip Planner – Full Stack App (PWA + Cloud Sync) 🌴🔥

A real-time, multi-user trip management app built for a 7-day Goa trip with itinerary, expenses, checklists, and rulebook — fully synced across all devices.

---

## 📌 Overview

This project is a **full-stack travel coordination app** created to streamline planning for a 6-day Goa itinerary + 1 free day. The app helps users manage:

* **Real-time shared expenses** (auto per-head split)
* **Recent activity feed** (NEW badges + time ago tracking)
* **Day-wise itinerary**
* **Checklist system** (packing + daily items)
* **Trip rulebook**
* **Mobile-friendly PWA** with installable APK
* **Cloud-synced data for all 6 users**

Deployed using **Render (backend)** and **Netlify (frontend)**, with data stored in **MongoDB Atlas**.

---

## 🚀 Features

### 1. Real-Time Expense Sharing

* Add any expense paid by any member
* Automatic per-head calculation
* Recent Activity list with “NEW” badges
* Time-ago formatting (“2 min ago”, “1 day ago”)

### 2. Day-Wise Itinerary

* Complete 7-day plan: 6 planned days + 1 free day
* Clean tab-based navigation

### 3. Checklists

* Packing checklist
* Day-wise checklists
* Items toggleable + deletable

### 4. Rulebook Section

A fun and friendly set of guidelines for the group, displayed inside the app.

### 5. PWA + APK

* Installable on Android
* Custom Goa-themed icons
* Works offline for UI
* Syncs online with backend

---

## 🛠 Tech Stack

### Frontend

* HTML
* CSS
* Vanilla JavaScript
* PWA manifest
* Netlify hosting

### Backend

* Node.js
* Express.js
* CORS
* MongoDB Atlas (cloud database)
* Render deployment

### Database

Collections:

* `expenses`
* `checklists`

---

## 📡 API Endpoints

### Expenses

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/expenses`     | Get all expenses  |
| POST   | `/api/expenses`     | Add new expense   |
| DELETE | `/api/expenses/:id` | Delete an expense |

### Checklist

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/api/checklist`     | Get all items     |
| POST   | `/api/checklist`     | Add item          |
| PATCH  | `/api/checklist/:id` | Toggle done state |
| DELETE | `/api/checklist/:id` | Delete item       |

---

## 📦 Installation & Setup (Local)

### Backend

```
git clone <repo-url>
cd goa-trip-backend
npm install
node server.js
```

### Environment Variables

Create a `.env` file:

```
MONGO_URI=<your mongo atlas connection string>
PORT=3000
```

---

## 🌍 Deployment

### Backend: Render

* Auto-deploys on `git push`
* Exposes `/api/...` endpoints

### Frontend: Netlify

* Deploy by uploading `frontend.zip`
* Uses `BASE_URL` to connect to backend

### APK Conversion: PWABuilder

* Generated from PWA manifest
* Installable on any Android phone

---

## 📱 How to Install the APK

1. Download the APK.
2. Tap to install.
3. Play Protect will scan the file.
4. Tap **Learn More** → **Install Anyway**.
5. Open the app.

---

## 👥 Contributors

* **Tejas** — planning, design, backend, frontend, deployment, APK build

---

## 📅 Trip Summary

* **Total days:** 7 (6 planned + 1 free day)
* Built specifically for real-time syncing and multi-person coordination

---

## ✔ Status

🟢 Fully functional and deployed
🟢 Real-time synced
🟢 Production-ready for the Goa trip

---

## ❤️ About This Project

This app was built overnight out of excitement for the group’s Goa trip — evolving from a simple idea into a fully working system. Created with ❤️, caffeine, and absolutely 0 hours of sleep. Collecting GitHub achievements 🚀

