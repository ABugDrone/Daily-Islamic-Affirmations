# Daily Islamic Affirmations

A beautiful, offline-first mobile application for daily Islamic duas, prayer times, and Quranic study. Built with React Native, Expo, and TypeScript.

## Overview

Daily Islamic Affirmations is a comprehensive Islamic companion app designed to help Muslims maintain consistent spiritual practices. The app features authentic duas from the Quran and Hadith, real-time prayer time calculations, Hijri calendar tracking, and offline Quran search capabilities. All features work completely offline with no internet connection required.

## Key Features

### Core Functionality
- **100+ Authentic Duas**: Curated collection of duas from Quran and Sahih Hadith across 5 categories (Anxiety, Wealth, Protection, Gratitude, Sleep)
- **Prayer Time System**: Accurate prayer time calculation supporting multiple Islamic schools (Hanafi, Shafi'i, Maliki, Hanbali)
- **Daily Affirmations**: Five duas organized by prayer period (Fajr, Dhuhr, Asr, Maghrib, Isha)
- **Offline Functionality**: Complete offline operation with no internet dependency

### Advanced Features
- **Hijri Calendar**: Interactive Islamic calendar with accurate Gregorian-to-Hijri date conversion
- **Islamic Holidays**: 9 major Islamic holidays and observances with descriptions and dates
- **Dua Tracking**: Daily completion tracking with streak counters and statistics
- **Achievement Badges**: 7 unlockable achievements for consistency milestones (7-day, 30-day, 100-day, 365-day streaks)
- **Offline Quran Search**: Full-text search across Quranic verses with Arabic and English translations
- **Audio Recitation**: Offline audio player for Quranic recitations
- **Local Notifications**: Prayer time reminders and daily affirmation alerts
- **Share Functionality**: Generate and share duas to WhatsApp, Twitter, Facebook, and other platforms

### Customization
- **Dark Mode**: Full dark mode support with automatic theme switching
- **Font Size Control**: Adjustable text sizes for accessibility
- **Favorites**: Bookmark and organize favorite duas by category
- **Search**: Advanced search functionality across all duas and Quranic verses
- **Settings**: Comprehensive settings for customization and preferences

## Technical Stack

- **Framework**: React Native 0.81 with Expo SDK 54
- **Language**: TypeScript 5.9
- **Styling**: NativeWind 4 (Tailwind CSS for React Native)
- **State Management**: React Context with AsyncStorage persistence
- **Data Storage**: AsyncStorage for local data persistence
- **Navigation**: Expo Router 6
- **UI Components**: React Native with Material Icons
- **Build Tool**: Expo with Metro bundler

## Project Structure

```
daily-islamic-affirmations/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx           # Home screen
│   │   ├── search.tsx          # Search screen
│   │   ├── favorites.tsx       # Favorites screen
│   │   └── settings.tsx        # Settings screen
│   ├── _layout.tsx             # Root layout
│   └── oauth/                  # OAuth callback
├── components/
│   ├── dua-card.tsx            # Dua display component
│   ├── prayer-time-card.tsx    # Prayer time display
│   ├── achievements.tsx        # Achievements display
│   ├── hijri-calendar.tsx      # Hijri calendar component
│   ├── quran-browser.tsx       # Quran search and display
│   ├── audio-player.tsx        # Audio playback component
│   ├── share-button.tsx        # Share functionality
│   └── screen-container.tsx    # SafeArea wrapper
├── lib/
│   ├── data/
│   │   ├── duas.ts             # Duas database
│   │   └── quran-lite.ts       # Lightweight Quran data
│   ├── utils/
│   │   ├── prayer-times.ts     # Prayer time calculation
│   │   ├── hijri-calendar.ts   # Hijri date conversion
│   │   ├── dua-tracking.ts     # Tracking and achievements
│   │   ├── audio-player.ts     # Audio utilities
│   │   ├── notifications.ts    # Notification system
│   │   └── share-image.ts      # Share-to-image generation
│   └── theme-provider.tsx      # Theme context
├── hooks/
│   ├── use-colors.ts           # Theme colors hook
│   ├── use-color-scheme.ts     # Dark mode detection
│   └── use-auth.ts             # Authentication hook
├── assets/
│   └── images/                 # App icons and assets
├── app.config.ts               # Expo configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ABugDrone/Daily-Islamic-Affirmations.git
cd Daily-Islamic-Affirmations
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open the app in your preferred platform:
- **Web**: Visit the URL shown in terminal (typically http://localhost:8081)
- **iOS**: Press `i` in terminal or use Expo Go app
- **Android**: Press `a` in terminal or use Expo Go app

### Building for Production

#### Android APK
```bash
eas build --platform android --type apk
```

#### iOS IPA
```bash
eas build --platform ios
```

#### Web
```bash
pnpm build
```

## Features in Detail

### Prayer Time System
- Calculates prayer times based on device location or manual coordinates
- Supports multiple calculation methods (Hanafi, Shafi'i, Maliki, Hanbali)
- Real-time countdown to next prayer
- Displays current and next prayer times
- Local notifications for prayer reminders

### Hijri Calendar
- Accurate Gregorian to Hijri date conversion
- Interactive calendar with month navigation
- 9 Islamic holidays with descriptions:
  - Islamic New Year (1 Muharram)
  - Day of Ashura (9-10 Muharram)
  - Mawlid al-Nabi (12 Rabi' al-awwal)
  - Laylat al-Isra and Mi'raj (27 Rajab)
  - Ramadan begins (1 Ramadan)
  - Laylat al-Qadr (27 Ramadan)
  - Eid al-Fitr (1 Shawwal)
  - Day of Arafah (8 Dhu al-Hijjah)
  - Eid al-Adha (9 Dhu al-Hijjah)

### Dua Tracking and Achievements
- Track daily dua completions
- Maintain current and longest streaks
- Unlock 7 achievement badges:
  - First Step: Complete 1 dua
  - Week Warrior: 7-day streak
  - Month Master: 30-day streak
  - Century: 100 duas completed
  - Golden Streak: 100-day streak
  - Devoted: 365 duas completed
  - Eternal Flame: 365-day streak

### Offline Quran Search
- Full-text search across Quranic verses
- Browse all surahs with verse listings
- Arabic text with English translations
- Lightweight database (500KB) for minimal app size

### Audio Recitation
- Offline audio playback for Quranic recitations
- Play, pause, and stop controls
- Audio duration and playback time display
- Integrated with dua cards

### Share Functionality
- Generate beautiful dua cards as images
- Share to WhatsApp, Twitter, Facebook
- Device sharing options (Messages, Email, etc.)
- Completely offline - no internet required

## Data Storage

All data is stored locally on the device using AsyncStorage:
- User preferences (dark mode, font size, language)
- Dua completion history
- Favorite duas
- Achievement progress
- Notification settings

## Offline Capabilities

The app is designed to work completely offline:
- No internet connection required
- All duas and Quranic verses bundled locally
- Prayer times calculated from device time and location
- Notifications managed locally
- All data persisted locally

## Performance

- App size: Approximately 45-50MB
- Lightweight Quran database: 500KB
- Efficient data persistence with AsyncStorage
- Optimized bundle size for fast downloads
- Smooth animations and transitions

## Customization

### Theme Colors
Edit `theme.config.js` to customize app colors:
- Primary: Emerald Green (#10b981)
- Accent: Gold (#d4af37)
- Background, Surface, Border, Success, Warning, Error

### Prayer Calculation Methods
Modify prayer time calculation in `lib/utils/prayer-times.ts` to support additional Islamic schools.

### Duas Database
Add or modify duas in `lib/data/duas.ts` with Arabic text, transliteration, English translation, and source references.

### Quran Data
Expand Quranic verses in `lib/data/quran-lite.ts` for comprehensive Quran search functionality.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Duas sourced from authentic Islamic texts and Hadith collections
- Prayer time calculations based on established Islamic astronomical methods
- Hijri calendar conversion using proven algorithms
- Quranic text from reliable Islamic sources
- Icons and design inspired by Islamic art and modern UI principles

## Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Check existing issues for similar problems
- Provide detailed information about your environment and the issue

## Roadmap

Future enhancements planned:
- Multi-language support (Arabic, Urdu, Bengali, French)
- Advanced analytics dashboard
- Customizable daily reminder notifications
- Extended Quran database with full text
- Community features for sharing duas
- Integration with Islamic calendar apps

## Contact

For more information or inquiries, please visit the repository at:
https://github.com/ABugDrone/Daily-Islamic-Affirmations

---

Built with dedication for the Muslim community. May this app help you maintain consistent spiritual practices.
