# Lumina Dental Care

A modern, secure, and responsive patient portal application for Lumina Dental Care. This application provides a seamless interface for patients to access their dental journey, treatment plans, and appointment history.

## 🚀 Features

*   **Secure Authentication:**
    *   Email & Password Login with Firebase Auth.
    *   Social Login integration (Google, Facebook, GitHub).
    *   Email Verification checks.
    *   Secure Password Reset functionality via email.
*   **Modern UI/UX:**
    *   Fully responsive design optimized for mobile and desktop.
    *   Aesthetic interface with glassmorphism effects, smooth transitions, and animations.
    *   User-friendly form validation using `react-hook-form`.
*   **Patient Portal:**
    *   Access to personalized dental journey.
    *   Appointment history and management.

## 🛠️ Tech Stack

This project is built using the following technologies:

*   **Frontend Framework:** React (v19)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Routing:** React Router (v7)
*   **Form Handling:** React Hook Form
*   **Icons:** Lucide React
*   **Backend & Auth:** Firebase
*   **Date Management:** date-fns & react-datepicker

## ⚙️ Prerequisites

Before you begin, ensure you have met the following requirements:

*   **Node.js:** v18.0.0 or higher
*   **npm:** v9.0.0 or higher

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Lumina-dental-care.git
    cd Lumina-dental-care
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your Firebase configuration keys:

    ```env
    VITE_API_KEY=your_api_key
    VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    VITE_PROJECT_ID=your_project_id
    VITE_STORAGE_BUCKET=your_project_id.appspot.com
    VITE_MESSAGING_SENDER_ID=your_sender_id
    VITE_APP_ID=your_app_id
    ```

## ▶️ Running the Application

To start the development server:

```bash
npm run dev
```

Open http://localhost:5173 in your browser to view the application.

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```
Lumina-dental-care/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and global styles
│   ├── features/        # Feature-based modules (Auth, etc.)
│   │   └── auth/        # Login, Register, ForgotPassword components
│   ├── firebase/        # Firebase configuration and initialization
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point
├── .env                 # Environment variables
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```
