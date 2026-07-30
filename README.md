# Test Task Project

A lightweight web application built using **Vanilla JavaScript**, **Sass (SCSS)**, and bundled with **Vite**.

## 🚀 Quick Start & Installation

To run this project locally, ensure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### Step 1: Clone the Repository
Open your terminal, clone the project, and navigate into the repository folder:
```bash
git clone https://github.com
cd Test_task
```

### Step 2: Install Dependencies
Install Vite, Sass, and all necessary package modules listed in `package.json`:
```bash
npm install
```

### Step 3: Run the Development Server
Start the local live-reload server for development:
```bash
npm run dev
```
* Once started, the terminal will provide a local link (usually `http://localhost:5173/`).
* Open this URL in your browser to view the application with Hot Module Replacement (HMR) enabled.

---

## 📦 Production Build (Optional)

If you need to compile the application into optimized, minified assets ready for production hosting:
```bash
npm run build
```
* This command generates a production-ready `dist/` folder in the root directory containing clean HTML, CSS, and JS files.

## 🌐 Deployment Note
This repository uses **GitHub Actions** for Automated CI/CD Deployment. Every time changes are pushed to the `main` branch, the project automatically builds and publishes the latest version straight to **GitHub Pages**.
