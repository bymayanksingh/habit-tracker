# Habit Tracker for Fire TV Stick

This is an aesthetic, GitHub-style habit tracker app designed for Fire TV Stick. It provides all the necessary CRUD (Create, Read, Update, Delete) features to manage your habits effectively, along with a visual calendar integration similar to GitHub's contribution graph.

## Features

- Add new habits with custom names and colors
- View all your habits in a visually appealing list
- Update existing habits
- Delete habits you no longer want to track
- Mark habits as completed on a daily basis
- Visual calendar integration showing habit completion over time
- Persistent storage using localStorage
- Optimized for Fire TV Stick navigation

## Installation Steps for Fire TV Stick

1. **Enable Developer Options on Fire TV Stick:**
   - Go to Settings > My Fire TV > About
   - Scroll down to "Device Name" and click it 7 times to enable Developer Options
   - Go back to My Fire TV and select Developer Options
   - Turn on "ADB debugging" and "Apps from Unknown Sources"

2. **Generate APK and Install the App on Fire TV Stick:**
   - On your development machine, install the necessary tools:
     ```
     npm install -g @capacitor/cli
     npm install @capacitor/core @capacitor/android
     ```
   - Initialize Capacitor in your project:
     ```
     npx cap init
     ```
   - Build your app:
     ```
     npm run build
     ```
   - Add Android platform:
     ```
     npx cap add android
     ```
   - Open the Android project in Android Studio:
     ```
     npx cap open android
     ```
   - In Android Studio, go to Build > Generate Signed Bundle / APK
   - Choose APK and follow the steps to create a keystore (if you don't have one)
   - Select release build variant and finish the process
   - Find the generated APK in the `android/app/release/` directory
   - Install `adb` (Android Debug Bridge) on your development machine if you haven't already
   - Connect your Fire TV Stick and development machine to the same Wi-Fi network
   - Find your Fire TV Stick's IP address:
     - Go to Settings > My Fire TV > About > Network
   - Connect to your Fire TV Stick via ADB:
     ```
     adb connect <FIRE_TV_IP_ADDRESS>:5555
     ```
   - Install the app:
     ```
     adb install -r path/to/your/app-release.apk
     ```

3. **Launch the App:**
   - On your Fire TV Stick, go to the home screen
   - Navigate to "Your Apps & Channels"
   - Find and select the Habit Tracker app to launch it

## Development

To run the app locally for development:

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Building for Production

To build the app for production:

```
npm run build
```

This will create a `dist` folder with the compiled assets ready for deployment.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (for icons)
- Capacitor (for generating APK)

Enjoy tracking your habits with this beautiful and functional Habit Tracker on your Fire TV Stick!