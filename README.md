# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 🔧 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- npm
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

## 📦 Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Mistthors/Toodler.git
   cd toodler-app
```

2. **Install dependencies**
```bash
   npm install
```

3. **Install required packages**
```bash
   npm install @react-native-community/datetimepicker
```

4. **Start the development server**
```bash
   npx expo start
```

5. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator


## ✨ Features

### Core Functionality
- **Board Management**
  - Create, read, update, and delete boards
  - Add custom thumbnails and descriptions
  - Character limits (50 chars for names, 200 for descriptions)

- **List Management**
  - Create and manage lists within boards
  - Customizable color coding (14 color options)
  - Edit list names and colors
  - Delete lists with cascade deletion of tasks

- **Task Management**
  - Create tasks with names and descriptions
  - Mark tasks as done/undone
  - Edit task details
  - Delete tasks
  - Move tasks between lists
  - Automatic "Done" section for completed tasks

### Extra Features
- **Due Dates**
  - Optional due date selection with date picker
  - Visual indicators for overdue tasks (red text)
  - Clear date functionality

- **Priority Levels**
  - Four priority options: High, Medium, Low, None
  - Color-coded priority badges (Red, Orange, Green)
  - Optional priority selection
