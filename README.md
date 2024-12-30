# Video Diary App

A React Native application that allows users to create and manage video diary entries. Built with Expo, this app enables users to import videos, crop specific segments, add metadata, and maintain a personal collection of video memories.

## Features

- Import videos from device gallery
- Crop videos to 5-second segments
- Add metadata (name and description) to videos
- View and manage video collection
- Edit video details
- Beautiful and intuitive user interface

## Technologies Used

- Expo
- React Native
- Expo Router (for navigation)
- Zustand (state management)
- FFmpeg (video processing)
- NativeWind (styling)
- React Hook Form & Zod (form handling)
- Expo AV (video playback)
- Expo Image Picker (media selection)

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio & Android SDK (for Android development)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/video-diary-app.git
   cd video-diary-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Usage

1. **Adding a New Video**

   - Tap the + button on the home screen
   - Select a video from your device
   - Crop the first 5 seconds
   - Add name and description
   - Save to your collection

2. **Viewing Videos**

   - Browse your video collection on the home screen
   - Tap any video to view details
   - Play/pause videos using the player controls

3. **Editing Videos**

   - Open a video's details page
   - Tap the edit icon
   - Update name and description
   - Save changes

4. **Deleting Videos**
   - Open a video's details page
   - Tap the delete icon
   - Confirm deletion

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
