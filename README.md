# ✨ Secure Password Generator ✨

A modern, stylish, and secure password generator built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion. This application allows users to generate strong, customizable passwords with a sleek and intuitive user interface.

![App Screenshot](https://i.imgur.com/YOUR_SCREENSHOT_LINK_HERE.png)
*(Replace `https://i.imgur.com/YOUR_SCREENSHOT_LINK_HERE.png` with an actual link to your screenshot. You can upload it to GitHub in an `assets` folder or use an image hosting service like Imgur.)*

## 🚀 Features

*   **Customizable Password Length:** Easily adjust the password length using a slider (Min: 6, Max: 32).
*   **Character Set Options:**
    *   Include Uppercase Letters (A-Z)
    *   Include Lowercase Letters (a-z)
    *   Include Numbers (0-9)
    *   Include Symbols (!@#$%^&...)
*   **Instant Generation:** Passwords are generated фильм (on-the-fly) as options are changed or when the "Generate New Password" button is clicked.
*   **Password Strength Indicator:** Visual feedback on the strength of the generated password (Very Weak, Weak, Medium, Strong, Very Strong).
*   **One-Click Copy:** Easily copy the generated password to the clipboard with a visual confirmation.
*   **Secure Randomness:** Utilizes `window.crypto.getRandomValues()` for cryptographically strong random number generation.
*   **Responsive Design:** Looks great on desktops, tablets, and mobile devices.
*   **Smooth Animations:** Engaging user experience with animations powered by Framer Motion.
*   **Modern Tech Stack:** Built with Vite for fast development, React for a component-based UI, TypeScript for type safety, and Tailwind CSS for utility-first styling.
*   **Modular Code:** Well-organized codebase with separate components and utility functions for better maintainability and readability.

## 🛠️ Built With

*   [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
*   [React](https://reactjs.org/) - A JavaScript library for building user interfaces
*   [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
*   [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React
*   [React Icons](https://react-icons.github.io/react-icons/) - SVG react icons

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v16 or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/secure-password-generator.git
    cd secure-password-generator
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev