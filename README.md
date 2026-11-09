# 🩺 Prescripto - Doctor Appointment Booking System

Prescripto is a full-stack doctor appointment booking and healthcare management platform built on the **MERN Stack** (MongoDB, Express.js, React, Node.js). It provides an end-to-end solution for patients, doctors, and clinic administrators with features like slot booking, doctor availability tracking, profile management, and online payment processing via Razorpay.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [Patient / User Portal (Frontend)](#1-patient--user-portal-frontend)
  - [Doctor Portal (Admin App)](#2-doctor-portal-admin-app)
  - [Admin Panel (Admin App)](#3-admin-panel-admin-app)
  - [Backend & APIs](#4-backend--apis)
- [Tech Stack](#-tech-stack)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Environment Variables Configuration](#-environment-variables-configuration)
- [Installation & Setup Guide](#-installation--setup-guide)
- [API Endpoints Overview](#-api-endpoints-overview)
  - [Admin Routes (`/api/admin`)](#admin-routes-apiadmin)
  - [Doctor Routes (`/api/doctor`)](#doctor-routes-apidoctor)
  - [User / Patient Routes (`/api/user`)](#user--patient-routes-apiuser)
- [Screenshots & UI Previews](#-screenshots--ui-previews)
- [Contributing & License](#-contributing--license)

---

## 🌟 Overview

Prescripto consists of three primary interconnected sub-applications:
1. **Frontend (`/frontend`)**: A modern, responsive patient-facing portal where patients can discover doctors, check availability, book time slots, manage profiles, and pay online.
2. **Admin & Doctor Panel (`/admin`)**: A unified administrative web application serving two distinct roles:
   - **Administrators**: Manage doctors, review platform-wide appointments, monitor system analytics.
   - **Doctors**: Check booked appointments, mark appointments as completed, cancel slots, track earnings, and update profile/fees.
3. **Backend (`/backend`)**: A robust RESTful API built with Express, MongoDB, and Mongoose, equipped with JWT-based role authentication, Cloudinary asset uploads via Multer, and Razorpay checkout workflows.

---

## ✨ Key Features

### 1. Patient / User Portal (`frontend`)
- **Authentication**: Secure registration and login using JWT.
- **Find Doctors**: Filter and browse doctors by specialization (General physician, Gynecologist, Dermatologist, Pediatricians, Neurologist, Gastroenterologist).
- **Appointment Booking**: Real-time available slot selection with automatic doctor schedule conflict prevention.
- **My Appointments**: View booking status (completed, cancelled, or pending) with appointment cancellation.
- **Online Payment**: Integrated Razorpay checkout to pay consultation fees securely.
- **Profile Management**: Update personal info (name, address, gender, DOB, phone) and upload profile pictures.

### 2. Doctor Portal (`admin`)
- **Doctor Authentication**: Dedicated credentials login for doctors.
- **Doctor Dashboard**: Real-time statistics including total earnings, appointments count, number of unique patients, and recent appointment feeds.
- **Appointment Lifecycle Management**: Accept appointments, mark appointments as **Completed**, or **Cancel** bookings.
- **Profile Customization**: Update doctor consultation fee, address, and live availability toggle.

### 3. Admin Panel (`admin`)
- **Admin Dashboard**: Comprehensive high-level metrics showing total doctors, appointments, patients, and recent bookings.
- **Doctor Onboarding**: Add new doctors with qualifications, experience, consultation fee, speciality, bio, and image upload directly to Cloudinary.
- **Availability Management**: Instant toggle switch for doctor availability across the platform.
- **Global Appointments Overview**: Complete visibility over all platform appointments with cancellation powers.

### 4. Backend & APIs (`backend`)
- **Role-based JWT Middleware**: Distinct middlewares for Admin (`authAdmin`), Doctor (`authDoctor`), and User (`authUser`).
- **Cloud Media Storage**: Automatic cloud image compression and upload using Cloudinary & Multer.
- **Database Schema & Indexing**: Scalable Mongoose models for Users, Doctors, and Appointments.
- **Payment Gateway**: Order creation and cryptographic signature verification with Razorpay.

---

## 🛠️ Tech Stack

| Domain | Technology / Library |
| :--- | :--- |
| **Frontend & Admin UI** | [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [React Router v7](https://reactrouter.com/), [React Toastify](https://fkhadra.github.io/react-toastify/) |
| **Backend API** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/) (ES Modules) |
| **Database & ODM** | [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/) |
| **Authentication & Security** | [JSON Web Tokens (JWT)](https://jwt.io/), [Bcrypt](https://www.npmjs.com/package/bcrypt), [Validator](https://www.npmjs.com/package/validator) |
| **File Upload & Storage** | [Multer](https://github.com/expressjs/multer), [Cloudinary SDK](https://cloudinary.com/) |
| **Payment Gateway** | [Razorpay](https://razorpay.com/) |
| **Code Quality & Linter** | [ESLint](https://eslint.org/), [Oxlint](https://oxc.rs/) |

---

## 📂 Project Architecture & Directory Structure

```text
Prescripto/
├── admin/                         # Admin & Doctor Dashboard (React + Vite)
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── assets/                # UI icons & images
│   │   ├── components/            # Navbar, Sidebar, etc.
│   │   ├── context/               # AdminContext, DoctorContext, AppContext
│   │   ├── pages/
│   │   │   ├── Admin/             # Dashboard, AddDoctor, AllAppointments, DoctorsList
│   │   │   ├── Doctor/            # DoctorDashboard, DoctorAppointments, DoctorProfile
│   │   │   └── Login.jsx          # Unified Admin/Doctor login
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                       # Admin environment variables
│   ├── package.json
│   └── vite.config.js
│
├── backend/                       # RESTful API Server (Node + Express + MongoDB)
│   ├── config/                    # MongoDB connection & Cloudinary setup
│   ├── controllers/               # adminController, doctorController, userController
│   ├── middlewares/               # authAdmin, authDoctor, authUser, multer
│   ├── models/                    # appointmentModel, doctorModel, userModel
│   ├── routes/                    # adminRoute, doctorRoute, userRoute
│   ├── .env                       # Backend environment variables & secrets
│   ├── package.json
│   └── server.js                  # Express entry point
│
├── frontend/                      # User/Patient Facing Web App (React + Vite)
│   ├── public/                    # Favicons and public assets
│   ├── src/
│   │   ├── assets/                # Logos, doctor illustrations, icons
│   │   ├── components/            # Navbar, Footer, Header, Banner, SpecialityMenu, etc.
│   │   ├── context/               # AppContext (Global state & auth)
│   │   ├── pages/                 # Home, Doctors, Appointment, MyAppointments, MyProfile, Login, etc.
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                       # Frontend environment variables
│   ├── package.json
│   └── vite.config.js
│
└── README.md                      # Project documentation
```

---

## ⚙️ Environment Variables Configuration

Create a `.env` file in each respective directory with the following variables:

### 1. `backend/.env`
```env
# Database
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net"

# Cloudinary (Image Uploads)
CLOUDINARY_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_SECRET_KEY="your_cloudinary_secret_key"

# Admin Master Credentials
ADMIN_EMAIL="admin@prescripto.com"
ADMIN_PASSWORD="your_admin_password"

# Security
JWT_SECRET="your_jwt_secret_key"

# Razorpay Payment Gateway
RAZORPAY_KEY_ID="rzp_test_xxxxxx"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
CURRENCY="INR"

# Server Port (Optional, Defaults to 4000)
PORT=4000
```

### 2. `frontend/.env`
```env
VITE_BACKEND_URL="http://localhost:4000"
VITE_RAZORPAY_KEY_ID="rzp_test_xxxxxx"
```

### 3. `admin/.env`
```env
VITE_BACKEND_URL="http://localhost:4000"
```

---

## 🚀 Installation & Setup Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or newer recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- [Cloudinary Account](https://cloudinary.com/) (For doctor & user image hosting)
- [Razorpay Account](https://razorpay.com/) (For test/live payment keys)

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/Prescripto.git
cd Prescripto
```

### Step 2: Configure Backend
```bash
cd backend
npm install

# Start development server with nodemon
npm run server
```
> The backend server will run on `http://localhost:4000`.

### Step 3: Configure User Frontend
```bash
cd ../frontend
npm install

# Start Vite dev server
npm run dev
```
> The frontend client will run on `http://localhost:5173`.

### Step 4: Configure Admin & Doctor Panel
```bash
cd ../admin
npm install

# Start Vite dev server
npm run dev
```
> The admin/doctor portal will run on `http://localhost:5174` (or next available port).

---

## 📡 API Endpoints Overview

### Admin Routes (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/login` | Admin login | ❌ No |
| `POST` | `/add-doctor` | Add doctor (with image upload) | ✅ Admin Token |
| `POST` | `/all-doctors` | Fetch list of all registered doctors | ✅ Admin Token |
| `POST` | `/change-availability` | Toggle doctor availability status | ✅ Admin Token |
| `GET` | `/appointments` | List all platform appointments | ✅ Admin Token |
| `POST` | `/cancel-appointment` | Cancel an appointment | ✅ Admin Token |
| `GET` | `/dashboard` | Fetch admin dashboard analytics | ✅ Admin Token |

### Doctor Routes (`/api/doctor`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/list` | Public list of available doctors | ❌ No |
| `POST` | `/login` | Doctor login with email & password | ❌ No |
| `GET` | `/appointments` | Get appointments assigned to doctor | ✅ Doctor Token |
| `POST` | `/complete-appointment` | Mark appointment as finished | ✅ Doctor Token |
| `POST` | `/cancel-appointment` | Doctor cancels appointment | ✅ Doctor Token |
| `GET` | `/dashboard` | Doctor dashboard analytics & summary | ✅ Doctor Token |
| `GET` | `/profile` | Get doctor profile data | ✅ Doctor Token |
| `POST` | `/update-profile` | Update doctor fees, address & availability | ✅ Doctor Token |

### User / Patient Routes (`/api/user`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register new user account | ❌ No |
| `POST` | `/login` | Patient login | ❌ No |
| `GET` | `/get-profile` | Retrieve user profile information | ✅ User Token |
| `POST` | `/update-profile` | Update profile details and avatar | ✅ User Token |
| `POST` | `/book-appointment` | Book appointment slot for a doctor | ✅ User Token |
| `GET` | `/appointments` | Retrieve patient's appointments | ✅ User Token |
| `POST` | `/cancel-appointment` | Cancel patient appointment | ✅ User Token |
| `POST` | `/payment-razorpay` | Initialize Razorpay payment order | ✅ User Token |
| `POST` | `/verifyRazorpay` | Verify Razorpay payment signature | ✅ User Token |

---

## 🎨 Specialities Covered

- 🩺 **General physician**
- 🤰 **Gynecologist**
- 🧴 **Dermatologist**
- 👶 **Pediatricians**
- 🧠 **Neurologist**
- 🔬 **Gastroenterologist**

---

## 🔒 Security Best Practices Implemented

- Passwords hashed with **Bcrypt** prior to persistence.
- Stateless, signed authentication via **JSON Web Tokens (JWT)**.
- Protected API routes verifying role privileges (`authAdmin`, `authDoctor`, `authUser`).
- Input validation on registration and login endpoints with **Validator**.
- Encrypted payment signature verification using **HMAC SHA-256** for Razorpay transactions.

---

## 📄 License

This project is open-source and available under the [ISC License](LICENSE).

