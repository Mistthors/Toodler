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
   npx expo install expo-image-picker
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
- **Persistent Storage (AsyncStorage)**
- All data automatically saved to device storage
- Data survives app restarts and closes
- Automatic save on every create, update, and delete operation
- Initial data loaded from `data.json` on first launch
- All subsequent data changes stored persistently
- Uses React Native AsyncStorage for local data persistence
  
- **Due Dates**
  - Optional due date selection with native date picker
   - Visual indicators for overdue tasks (red text, bold font)
   - Clear date functionality to remove due dates
   - Tasks without due dates remain at the bottom when sorting

- **Priority Levels**
  - Four priority options: High, Medium, Low, None
  - Color-coded priority badges (Red, Orange, Green)
  - Optional priority selection
 
- **Task Sorting**
   - Multiple sorting options via dropdown menu:
     - **None**: Default order (creation order)
     - **Upcoming**: Sort by due date (earliest first)
     - **Due Later**: Sort by due date (latest first)
     - **High Priority**: Sort by priority (High → Medium → Low → None)
     - **Low Priority**: Sort by priority (Low → Medium → High → None)
   - Sorting applies to both active and completed tasks
   - Visual dropdown with checkmark for selected option
   - Persistent sort selection during session
 
- **Done Section**
   - Automatic separation of completed tasks
   - Shows count of completed tasks
   - Maintains visual distinction with strikethrough

- **Image Picker**
   - Access device camera roll for board thumbnails
   - Select images directly from photo gallery
   - Proper permission handling for camera and gallery access
   - Image preview in create/edit modals
   - Supports custom board images for better visual organization

- **Character Limits**
   - Board names: 50 characters
   - Board descriptions: 200 characters
   - Real-time character count display
 
- **Color Customization**
   - 14 pre-defined colors for lists
   - Colors from data.json plus additional options
   - Visual color picker with selection indicator
 
## 💾 Data Management

The app uses **AsyncStorage** for persistent data storage. Your data is saved automatically and survives app restarts.

**Data Storage:**
- All boards, lists, and tasks are saved locally on your device
- Data persists between app sessions
- Automatic save on every create/update/delete operation

**Storage Location:**
- Data is stored using React Native AsyncStorage
- Key: `@toodler_data`
- Format: JSON

**Initial Data:**
- On first launch, the app loads sample data from `assets/data.json`
- After that, it uses your saved data

## 📁 Project Structure
```
toodler-app/
├── app/
│   ├── index.tsx              # Home screen with boards list                        
│   ├── board.tsx              # Board detail screen (lists)
│   └── tasks.tsx              # Tasks screen
├── assets/
│   └── data.json              # Initial app data
├── components/
│   ├── BoardsList/
│   │   ├── index.tsx          # Boards list component
│   │   └── style.js           # Boards list styles
│   ├── Board/
│   │   ├── index.tsx          # Board/lists component
│   │   └── style.js           # Board styles
│   └── TasksList/
│       ├── index.tsx          # Tasks list component
│       └── style.js           # Tasks styles
├── styles/
│   └── commonStyles.js        # Shared styles across components
├── utils/
│   └── dataManager.js         # Data management functions
└── RE
