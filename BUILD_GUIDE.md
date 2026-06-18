# Android APK Build Guide

## Overview

This guide explains how to build the Daily Islamic Affirmations app for Android.

## Prerequisites

- Expo account (create at https://expo.dev if you don't have one)
- EAS CLI installed (`npm install -g eas-cli`)
- Node.js 18+ and npm/pnpm

## Build Methods

### Method 1: Using Manus Management UI (Recommended)

This is the easiest method if you're using the Manus platform:

1. Open the **Management UI** for your project
2. Click the **Publish** button (top-right corner)
3. Select **Android** as your platform
4. Choose **APK** format
5. Click **Build** and wait for completion (5-15 minutes)
6. Download the APK file once ready

### Method 2: Using EAS CLI (Local or CI/CD)

#### Step 1: Login to Expo

```bash
eas login
```

Enter your Expo credentials when prompted.

#### Step 2: Build the APK

```bash
# Standard build
eas build --platform android

# Build with cache cleared
eas build --platform android --clear-cache

# Build and wait for completion
eas build --platform android --wait
```

#### Step 3: Download the APK

Once the build completes, you'll receive a link to download the APK file.

### Method 3: Local Build (Advanced)

For local builds, you'll need Android SDK and build tools installed:

```bash
eas build --platform android --local --output ./app.apk
```

## Build Configuration

The build is configured in `eas.json`:

```json
{
  "build": {
    "production": {
      "node": "18.18.0",
      "npm": "9.8.1"
    }
  }
}
```

## App Configuration

Key settings in `app.config.ts`:

- **App Name**: Daily Islamic Affirmations
- **Bundle ID**: com.app.dailyislamicaffirmations
- **Icon**: ./assets/images/icon.png (1024x1024)
- **Adaptive Icon**: 
  - Foreground: ./assets/images/android-icon-foreground.png
  - Background: ./assets/images/android-icon-background.png
  - Monochrome: ./assets/images/android-icon-monochrome.png
- **Splash Screen**: ./assets/images/splash-icon.png

## Troubleshooting

### Build Fails with "Icon Not Found"

If you get an error about missing icon files:

1. Verify all icon files exist:
   ```bash
   ls -la assets/images/android-icon-*.png
   ```

2. Clear the build cache:
   ```bash
   eas build --platform android --clear-cache
   ```

3. Ensure files are committed to git:
   ```bash
   git add assets/images/
   git commit -m "Add icon files"
   git push
   ```

### Authentication Issues

If you get authentication errors:

1. Login to Expo:
   ```bash
   eas login
   ```

2. Or use a personal access token:
   ```bash
   export EXPO_TOKEN=your_token_here
   eas build --platform android
   ```

### Build Takes Too Long

The first build may take 10-15 minutes. Subsequent builds are faster due to caching.

## After Building

### Installing the APK

1. **On Physical Device**:
   - Download the APK file
   - Transfer to your Android device
   - Open file manager and tap the APK to install
   - Allow installation from unknown sources if prompted

2. **On Android Emulator**:
   ```bash
   adb install app.apk
   ```

3. **Using Android Studio**:
   - Open Android Studio
   - Go to Device Manager
   - Select your emulator/device
   - Drag and drop the APK file

### Testing

After installation, test these features:

- [ ] App launches without errors
- [ ] Home screen displays prayer times
- [ ] Duas load and display correctly
- [ ] Search functionality works
- [ ] Favorites can be bookmarked
- [ ] Settings can be changed
- [ ] Dark mode toggles properly
- [ ] Share button works
- [ ] Audio player functions

## Build Profiles

You can create multiple build profiles in `eas.json`:

```json
{
  "build": {
    "preview": {
      "node": "18.18.0"
    },
    "production": {
      "node": "18.18.0"
    },
    "development": {
      "node": "18.18.0"
    }
  }
}
```

Build with a specific profile:

```bash
eas build --platform android --profile preview
```

## Release to Google Play Store

To publish to Google Play Store:

1. Create a Google Play Developer account
2. Generate a keystore for signing
3. Configure submission in `eas.json`:
   ```json
   {
     "submit": {
       "production": {
         "android": {
           "serviceAccountKeyPath": "./path/to/key.json"
         }
       }
     }
   }
   ```

4. Submit the build:
   ```bash
   eas submit --platform android --latest
   ```

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Android APK Guide](https://docs.expo.dev/build-reference/apk/)
- [Google Play Store Publishing](https://docs.expo.dev/submit/android/)

## Support

For issues or questions:
- Check the [Expo Documentation](https://docs.expo.dev)
- Visit [Expo Forums](https://forums.expo.dev)
- Open an issue on [GitHub](https://github.com/ABugDrone/Daily-Islamic-Affirmations)
