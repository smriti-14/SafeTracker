# SafeZone - Emergency Zone Detection System

A real-time emergency zone detection web application that helps users identify danger zones and safe areas during natural disasters. Built with modern web technologies and designed specifically for Indian emergency services.

## 🚨 Features

- **Real-time Location Tracking** - Uses browser Geolocation API for precise positioning
- **Interactive Canvas Map** - Fully interactive map with zoom, pan, and drag functionality
- **Dynamic Zone Generation** - AI-powered zone suggestions based on your location
- **Emergency Services Integration** - Quick access to Indian emergency numbers (100, 101, 102)
- **Network Adaptive** - Optimizes performance based on connection quality
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI with shadcn/ui
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production
- **APIs**: Canvas API, Geolocation API, Network Information API

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Modern web browser** with location services enabled

## 🚀 Installation & Setup

### 1. Clone or Download the Project
```bash
# If you have git installed
git clone <repository-url>
cd SafeZone

# Or download as ZIP and extract
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server

**For Windows users:**
```bash
# Option 1: Direct command (recommended)
npx tsx server/index.ts

# Option 2: If you want to use npm run dev, first install cross-env
npm install cross-env
# Then edit package.json to change "NODE_ENV=development" to "cross-env NODE_ENV=development"
npm run dev
```

### 4. Open Your Browser
Navigate to `http://localhost:5000`

## 📱 Usage Guide

### Getting Started
1. **Landing Page** - Click "Get My Location & Start" to begin
2. **Location Permission** - Allow location access when prompted
3. **Dashboard** - View your current location and nearby zones
4. **Interactive Map** - Explore zones with hover and click interactions

### Map Controls
- **Zoom**: Use + and - buttons or mouse wheel
- **Pan**: Click and drag to move around
- **Center**: Click the target button to return to your location
- **Refresh Zones**: Click the purple map pin to generate new zones

### Zone Types
- **🟢 Safe Zones** - Community shelters, hospitals, police stations
- **🔴 Danger Zones** - Flood-prone areas, landslide zones, hazardous locations

## 🎨 UI Theme

The application features a modern lighter blue/purple theme with:
- Glassmorphism effects
- Smooth gradient backgrounds
- Floating animations
- Responsive design elements

## 🔧 Project Structure

```
SafeZone/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── lib/            # Utility functions
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend server (minimal)
├── shared/                 # Shared types and schemas
├── package.json           # Project dependencies
└── README.md              # This file
```

## 🔒 Privacy & Security

- No user data is stored permanently
- Location data is processed locally
- Emergency services integration uses standard tel: protocol
- All APIs are client-side only

## 📞 Emergency Services (India)

- **100** - Police Emergency
- **101** - Fire Emergency  
- **102** - Ambulance Emergency




**⚠️ Important**: This is a demonstration application. For real emergencies, always contact official emergency services directly.

**Built with ❤️ for emergency preparedness and community safety**
