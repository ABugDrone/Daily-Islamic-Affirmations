# Daily Islamic Affirmations

A beautiful, offline-first mobile app for daily Islamic duas, prayer times, Hijri calendar, and Quran search. Built with React Native, Expo, and TypeScript.

## Features

### 🤲 Daily Duas & Affirmations
- **100+ authentic duas** from the Quran and Sahih Hadith
- **5 categories**: Anxiety, Wealth, Protection, Gratitude, Sleep
- Arabic text with transliteration and English translations
- Detailed commentary and source references
- Bookmark your favorite duas for quick access
- Search functionality to find duas by keyword or topic

### 🕌 Prayer Times & Islamic Calendar
- **Real-time prayer time calculations** (Fajr, Dhuhr, Asr, Maghrib, Isha)
- **Prayer countdown timer** showing time until next prayer
- **Hijri calendar** with accurate Gregorian-to-Hijri conversion
- **Islamic holidays & events**:
  - Islamic New Year (1 Muharram)
  - Day of Ashura (9-10 Muharram)
  - Mawlid al-Nabi (12 Rabi' al-awwal)
  - Laylat al-Isra and Mi'raj (27 Rajab)
  - Ramadan (1-30 Ramadan)
  - Laylat al-Qadr (27 Ramadan)
  - Eid al-Fitr (1 Shawwal)
  - Eid al-Adha (9 Dhu al-Hijjah)
- Dual date display (Gregorian + Hijri)

### 📊 Dua Tracking & Achievements
- **Daily completion tracking** for duas
- **Streak counter** showing consecutive days of dua completion
- **7 achievement badges**:
  - 🎯 First Step (1 dua completed)
  - 🔥 Week Warrior (7-day streak)
  - 📅 Month Master (30-day streak)
  - 💯 Century (100 duas completed)
  - ⭐ Golden Streak (100-day streak)
  - 💝 Devoted (365 duas completed)
  - 🔥 Eternal Flame (365-day streak)
- Progress indicators for next achievement
- Statistics dashboard with lifetime stats

### 📖 Offline Quran Search
- **Lightweight Quran database** (~500KB)
- **Full-text search** across all verses
- **Surah browser** with complete list
- Arabic text with English translations
- Quick access to frequently referenced surahs
- Verse bookmarking

### 🎵 Audio & Notifications
- **Offline audio recitation** player
- **Local push notifications** for prayer times
- **Daily affirmation reminders**
- Customizable notification times

### 🎨 User Experience
- **Beautiful Islamic UI** with emerald green & gold branding
- **Dark mode support** with automatic theme switching
- **Customizable font sizes** (Small, Medium, Large, Extra Large)
- **Share-to-image** functionality for social media
  - Share duas on WhatsApp, Twitter, Facebook
  - Device sharing via Messages, Email, etc.
- Responsive design for all screen sizes
- Smooth animations and transitions

### 📱 Offline-First Architecture
- **Works completely offline** - no internet required
- All data stored locally on device
- Uses device time/date and optional location
- No external API dependencies
- Privacy-focused - your data stays on your device

## Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript 5.9
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Context + AsyncStorage
- **Database**: Local AsyncStorage for persistence
- **Build Tool**: Metro bundler with Expo
- **Testing**: Vitest for unit tests

## Project Structure

```
daily-islamic-affirmations/
├── app/                          # Expo Router app structure
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx             # Home screen
│   │   ├── search.tsx            # Search duas
│   │   ├── favorites.tsx         # Bookmarked duas
│   │   └── settings.tsx          # App settings
│   ├── _layout.tsx               # Root layout with providers
│   └── oauth/                    # OAuth callback
├── components/                   # Reusable UI components
│   ├── dua-card.tsx              # Dua display card
│   ├── prayer-time-card.tsx      # Prayer time display
│   ├── hijri-calendar.tsx        # Islamic calendar
│   ├── achievements.tsx          # Achievement badges
│   ├── audio-player.tsx          # Audio playback
│   ├── share-button.tsx          # Share functionality
│   ├── quran-browser.tsx         # Quran search & display
│   └── screen-container.tsx      # Safe area wrapper
├── lib/
│   ├── data/
│   │   ├── duas.ts               # 100+ authentic duas database
│   │   └── quran-lite.ts         # Lightweight Quran data
│   └── utils/
│       ├── prayer-times.ts       # Prayer time calculations
│       ├── hijri-calendar.ts     # Hijri date conversion
│       ├── dua-tracking.ts       # Streak & achievement system
│       ├── audio-player.ts       # Audio playback utility
│       ├── notifications.ts      # Local notifications
│       └── share-image.ts        # Image generation for sharing
├── hooks/                        # Custom React hooks
│   ├── use-colors.ts             # Theme color access
│   ├── use-color-scheme.ts       # Dark mode detection
│   └── use-auth.ts               # Authentication state
├── constants/                    # App constants
├── theme.config.js               # Tailwind theme configuration
├── app.config.ts                 # Expo configuration
├── tailwind.config.js            # Tailwind CSS config
└── package.json                  # Dependencies

```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or physical device with Expo Go)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ABugDrone/Daily-Islamic-Affirmations.git
cd Daily-Islamic-Affirmations
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open in your device:
   - **iOS**: Press `i` in the terminal
   - **Android**: Press `a` in the terminal
   - **Web**: Press `w` in the terminal
   - **Expo Go**: Scan the QR code with Expo Go app

### Building for Production

#### iOS
```bash
eas build --platform ios
```

#### Android
```bash
eas build --platform android
```

#### Web
```bash
pnpm build
```

## Usage

### Daily Duas
1. Open the app and view today's affirmations on the Home screen
2. Each dua unlocks at its corresponding prayer time
3. Tap any dua card to view full details
4. Bookmark your favorites by tapping the heart icon
5. Share duas to social media using the share button

### Prayer Times
1. Go to Settings to configure your location (optional)
2. Home screen displays current and next prayer times
3. Countdown timer shows time until next prayer
4. Enable notifications for prayer time alerts

### Hijri Calendar
1. Navigate to the calendar view in Settings
2. Browse months and view Islamic holidays
3. See event descriptions and Arabic names
4. Check upcoming important dates

### Track Your Progress
1. Complete duas daily to build your streak
2. View your statistics in Settings
3. Unlock achievement badges
4. Share your progress with others

### Search Quran
1. Use the search feature to find Quranic verses
2. Browse by surah or search by keyword
3. View Arabic text with English translations
4. Reference verses while reading duas

## Features Roadmap

- [ ] Full Quran with all 114 surahs
- [ ] Tafsir (Quranic commentary)
- [ ] Hadith database integration
- [ ] Ramadan special mode with daily plans
- [ ] Community sharing features
- [ ] Dua recommendations engine
- [ ] Multi-language support
- [ ] Advanced statistics and analytics
- [ ] Cloud sync (optional)
- [ ] Apple Watch companion app

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Format code with Prettier
- Write meaningful commit messages
- Add tests for new features

## Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Performance

- App bundle size: ~40MB (optimized)
- Quran database: ~500KB (lightweight)
- Local storage: ~2MB (duas + user data)
- Startup time: <2 seconds
- Smooth 60fps animations

## Privacy & Security

- ✅ All data stored locally on device
- ✅ No personal data collection
- ✅ No tracking or analytics
- ✅ No external API calls
- ✅ Open source - inspect the code
- ✅ Offline-first design

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Duas sourced from authentic Islamic texts and Hadith collections
- Prayer time calculations based on Islamic astronomical methods
- Quran text from reliable Islamic sources
- UI inspired by modern Islamic design principles
- Built with ❤️ for the Muslim community

## Support

If you encounter any issues or have suggestions:

1. Check existing [GitHub Issues](https://github.com/ABugDrone/Daily-Islamic-Affirmations/issues)
2. Create a new issue with detailed description
3. Include device info, OS version, and steps to reproduce
4. Share error logs if applicable

## Contact

- **GitHub**: [@ABugDrone](https://github.com/ABugDrone)
- **Repository**: [Daily-Islamic-Affirmations](https://github.com/ABugDrone/Daily-Islamic-Affirmations)

---

Made with 🤲 for the Muslim community. May Allah accept this work and benefit all who use it.

**Allahumma Ameen** 🌙
