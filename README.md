# Food POS - Dark Theme

A modern Point of Sale (POS) system for restaurants with a dark theme, designed for tablet devices.

## Features

- Dark theme UI optimized for tablet displays
- Left sidebar navigation
- Main content area with dish selection grid
- Right sidebar with order summary and cart management
- Category filtering for dishes
- Real-time cart updates
- Order notes functionality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually http://localhost:5173)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx          # Left navigation sidebar
│   ├── MainContent.jsx      # Main dish selection area
│   └── OrderSummary.jsx     # Right order summary panel
├── App.jsx                  # Main application component
├── App.css                  # App-level styles
├── main.jsx                 # Application entry point
└── index.css                # Global styles
```

## Technologies Used

- React 18
- Vite
- CSS3

## Design

This implementation is based on the Figma design: Food POS Dark - Tablet Device

