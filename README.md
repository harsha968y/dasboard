# Dashboard Application

A modern React dashboard application built with Vite, featuring authentication, vendor management, and data visualization.

## Prerequisites

Before running this project locally, ensure you have the following installed:

- **Node.js** (version 16 or higher recommended)
- **npm** (comes with Node.js) or **yarn**

You can check if you have these installed by running:
```bash
node --version
npm --version
```

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/).

## Getting Started

### 1. Clone or Navigate to the Project

If you haven't already, navigate to the project directory:
```bash
cd C:\Users\Dell\OneDrive\Desktop\dasboard
```

### 2. Install Dependencies

Install all required project dependencies:
```bash
npm install
```

This will install all packages listed in `package.json`, including:
- React 19
- React Router DOM
- Recharts (for data visualization)
- Vite (build tool)
- ESLint (code linting)

### 3. Start the Development Server

Run the development server:
```bash
npm run dev
```

The application will start and you should see output similar to:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. Access the Application

Open your web browser and navigate to:
```
http://localhost:5173
```

## Authentication

The application uses hardcoded credentials for demonstration purposes:

- **Email:** `user@example.com`
- **Password:** `password123`

Use these credentials to log in to the dashboard.

## Available Scripts

- `npm run dev` - Start the development server with hot module replacement (HMR)
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory. To preview the production build:

```bash
npm run preview
```

## Project Structure

```
dasboard/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable React components
│   ├── pages/       # Page components (Dashboard, Login, Vendors)
│   ├── state/       # State management (AuthContext)
│   └── assets/      # Images and other assets
├── package.json     # Project dependencies and scripts
├── vite.config.js   # Vite configuration
└── README.md        # This file
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Alternatively, you can specify a different port:

```bash
npm run dev -- --port 3000
```

### Module Not Found Errors

If you encounter module not found errors, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

On Windows PowerShell:
```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### Clearing Browser Cache

If you experience issues, try clearing your browser cache or using an incognito/private window.

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Recharts** - Data visualization and charts
- **ESLint** - Code quality and linting

## Development Notes

- The development server supports Hot Module Replacement (HMR), so changes to your code will automatically refresh in the browser
- Authentication state is persisted in localStorage
- This is a frontend-only application with mock authentication
