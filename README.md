# 🔐 Secure Password Generator

A modern, fast, and secure client-side password generator built with vanilla HTML, CSS, and JavaScript. Featuring a sleek glassmorphic dark UI, real-time password strength evaluation, and cryptographically secure random generation.

---

## ✨ Features

- **🛡️ Cryptographically Secure**: Powered by the Web Crypto API (`window.crypto.getRandomValues`), ensuring high-entropy, unpredictable passwords.
- **⚙️ Fully Customizable**:
  - **Uppercase Letters** (`A-Z`)
  - **Lowercase Letters** (`a-z`)
  - **Numbers** (`0-9`)
  - **Symbols** (`!@#$%^&*...`)
- **📏 Dynamic Length Slider**: Select any password length from 6 to 32 characters with instant live generation.
- **🎯 Guaranteed Inclusions**: Ensures at least one character from each selected category is included, then shuffled thoroughly using the Fisher-Yates algorithm.
- **📊 Real-Time Strength Meter**: Visual color-coded strength indicator (Weak, Fair, Good, Very Strong) based on entropy and length.
- **📋 One-Click Copy**: Copy to clipboard with instant visual feedback and toast notifications (`navigator.clipboard` API with fallback).
- **🎨 Modern Glassmorphism UI**:
  - Curated dark color scheme with ambient radial glowing highlights.
  - Smooth micro-interactions and transitions.
  - Modern typography powered by Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*).
  - 100% responsive for mobile and desktop screens.

---

## 📁 Project Structure

```
Password Generator/
├── Password.html     # Semantic structure and modern SVG icons
├── Password.css      # Custom styling, dark mode theme & glassmorphism
├── Password.js       # Core generation logic, security, strength meter & clipboard
└── README.md         # Project documentation
```

---

## 🚀 Getting Started

No installation or dependencies required! This project runs directly in any modern web browser.

### Option 1: Direct File Launch
Simply double-click [`Password.html`](Password.html) or open it in your preferred browser:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

### Option 2: Live Server (VS Code / Antigravity)
If you are using VS Code or Antigravity IDE:
1. Right-click [`Password.html`](Password.html).
2. Select **Open with Live Server** (or run `npx serve .` in terminal).
3. Access the application at `http://localhost:5500` or `http://localhost:3000`.

---

## 🛠️ Built With

- **HTML5**: Semantic tags, accessible forms, and SVG icons.
- **Vanilla CSS3**: CSS variables, Glassmorphism (`backdrop-filter`), Flexbox, CSS Grid, and custom slider/checkbox styles.
- **JavaScript (ES6+)**: Web Crypto API, asynchronous clipboard operations, and DOM manipulation.

---

## 🔒 Privacy & Security

- **100% Client-Side**: All passwords are generated entirely inside your browser.
- **Zero Logging**: No passwords or user data are ever stored, transmitted, or sent over any network.

---

## 📄 License

This project is open-source and free to use for personal or commercial projects.
