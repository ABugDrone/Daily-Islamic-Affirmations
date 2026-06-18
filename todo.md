# Daily Islamic Affirmations - Development TODO

## Phase 1: Core Database & Data Structure
- [x] Create duas database with 365+ authentic affirmations
- [x] Categorize duas by: Anxiety, Wealth, Protection, Gratitude, Sleep
- [x] Add Arabic text, transliteration, English translation, commentary, and source for each dua
- [x] Implement SQLite local storage for offline access
- [x] Create data migration script to populate initial database

## Phase 2: Prayer Time System
- [x] Implement prayer time calculation using device location
- [x] Create prayer time constants (Fajr, Dhuhr, Asr, Maghrib, Isha)
- [x] Build countdown timer for next prayer
- [x] Display current prayer and next prayer on Home screen
- [ ] Add prayer time notification system
- [x] Support multiple calculation methods (Hanafi, Shafi'i, etc.)

## Phase 3: Core UI Components
- [ ] Design and build Splash screen with animation
- [x] Create Dua Card component (Arabic, transliteration, English, commentary, source)
- [x] Build Prayer Time Card component
- [x] Create Progress indicator component (X/5 Completed)
- [x] Build Tab navigation (Home, Search, Favorites, Settings)
- [x] Implement ScreenContainer for safe area handling
- [x] Add theme colors (Emerald Green, Gold, White, Dark mode)

## Phase 4: Home Screen
- [x] Display greeting: "Assalamu Alaikum"
- [x] Show current date (Gregorian + Hijri)
- [x] Display prayer time card with countdown
- [x] Show today's 5 affirmations (one per prayer period)
- [x] Display progress: "X/5 Completed"
- [x] Add Daily Reflection card
- [ ] Implement dua unlocking based on prayer times
- [x] Add tap-to-view functionality for each dua card

## Phase 5: Dua Detail Screen
- [x] Build full dua view with all details
- [x] Implement bookmark/favorite toggle
- [ ] Add share button (share as image or text)
- [ ] Build previous/next dua navigation
- [ ] Implement audio recitation player (if available)
- [ ] Add copy-to-clipboard functionality
- [x] Display source reference prominently

## Phase 6: Search Screen
- [x] Build search input with placeholder
- [x] Implement search by topic, verse, keyword
- [x] Create filter tabs (All, Anxiety, Wealth, Protection, Gratitude, Sleep)
- [x] Display search results in scrollable list
- [x] Add empty state message
- [x] Implement tap-to-view for search results
- [ ] Add search history (optional)

## Phase 7: Favorites Screen
- [x] Display all bookmarked duas
- [x] Implement filter tabs by category
- [x] Add empty state message
- [ ] Implement swipe-to-delete (optional)
- [x] Show favorite count
- [x] Implement tap-to-view for favorites
- [x] Persist favorites to local storage

## Phase 8: Settings Screen
- [x] Build dark mode toggle
- [ ] Implement font size slider (Small, Medium, Large, Extra Large)
- [x] Add preview text for font size
- [ ] Build location permission toggle
- [ ] Add manual location input
- [ ] Create prayer calculation method selector
- [x] Build notification toggle
- [ ] Add notification time picker
- [x] Display app version and developer info
- [x] Add privacy policy and terms of service links
- [x] Persist all settings to local storage

## Phase 9: Additional Features
- [ ] Implement Random Dua button
- [ ] Add audio recitation for selected duas
- [ ] Build dark mode support (all screens)
- [ ] Implement font size adjustment across all screens
- [ ] Add haptic feedback for interactions
- [ ] Build notification system for prayer times
- [ ] Create daily affirmation reminder notifications
- [ ] Implement Hijri calendar display

## Phase 10: Visual Assets & Branding
- [x] Generate app logo (Crescent + Quran + Star)
- [x] Create splash screen design
- [x] Design app icon for app launcher
- [x] Create adaptive icon for Android
- [x] Update app.config.ts with branding info
- [x] Generate favicon for web version
- [ ] Create share-to-image template for duas

## Phase 11: Accessibility & Polish
- [ ] Ensure large touch targets (min 44x44pt)
- [ ] Add screen reader support
- [ ] Test with elderly users
- [ ] Optimize for one-handed usage
- [ ] Add smooth animations and transitions
- [ ] Implement press feedback (scale + haptic)
- [ ] Test dark mode on all screens
- [ ] Verify high contrast ratios

## Phase 12: Testing & Quality Assurance
- [ ] Test all user flows end-to-end
- [ ] Verify offline functionality
- [ ] Test prayer time calculations
- [ ] Test search and filter functionality
- [ ] Verify favorites persistence
- [ ] Test dark mode switching
- [ ] Test font size adjustments
- [ ] Test on multiple screen sizes
- [ ] Verify all buttons and links work
- [ ] Test on iOS and Android (Expo Go)

## Phase 13: Optimization & Deployment
- [ ] Optimize app performance
- [ ] Reduce APK size
- [ ] Minimize battery usage
- [ ] Test on low-end devices
- [ ] Create checkpoint before deployment
- [ ] Prepare for Google Play Store submission
- [ ] Generate APK/AAB for distribution
- [ ] Create user documentation

## Notes
- All duas must be from authentic sources (Quran, Sahih Hadith)
- App must work 100% offline after installation
- No music or inappropriate imagery
- Follow Islamic compliance requirements
- Respect differences among valid schools of thought
- Design for elderly users with large text and simple navigation


## Phase 14: Bug Fixes
- [x] Fix icon mapping for search, favorites, settings tabs
- [x] Test all screens on web, iOS, and Android

## Phase 15: Audio Recitation (Offline)
- [x] Implement offline audio player component
- [x] Add audio playback controls (play, pause, stop)
- [x] Store audio files locally in app bundle
- [x] Add audio toggle in dua cards
- [x] Display audio duration and current playback time

## Phase 16: Push Notifications (Local)
- [x] Implement local push notification scheduling
- [x] Create notification service for prayer time alerts
- [x] Add daily affirmation reminders
- [x] Allow users to customize notification times
- [x] Persist notification preferences to local storage
- [ ] Test notifications on iOS and Android

## Phase 17: Share-to-Image Feature (Offline)
- [x] Create beautiful dua card image generator
- [x] Implement share sheet integration
- [x] Add social media sharing (WhatsApp, Facebook, Twitter, etc.)
- [x] Add device sharing options (Messages, Email, etc.)
- [x] Generate high-quality PNG/JPEG images with dua content
- [x] Include app branding and Islamic design elements
- [ ] Test image generation and sharing on all platforms


## Phase 18: Hijri Calendar Integration
- [x] Implement Hijri date calculation from Gregorian date
- [x] Create Hijri calendar view with month navigation
- [x] Add Islamic holidays (Eid al-Fitr, Eid al-Adha, Islamic New Year, Prophet's Birthday)
- [x] Display important Islamic dates and events
- [x] Persist calendar preferences to local storage
- [x] Show both Gregorian and Hijri dates on home screen

## Phase 19: Dua Tracking & Achievements
- [x] Create dua completion tracking system
- [x] Implement daily streak counter
- [x] Build achievement badge system (7-day, 30-day, 100-day streaks)
- [x] Create statistics dashboard (total duas completed, current streak, etc.)
- [x] Add visual progress indicators
- [x] Persist tracking data to local storage
- [x] Display achievements on profile/settings screen

## Phase 20: Offline Quran Search
- [x] Bundle lightweight Quran database (text only, ~2-3MB)
- [x] Implement full-text search across all surahs
- [x] Create Quran browser with surah list
- [x] Add verse display with Arabic and English translation
- [ ] Implement cross-references between duas and Quranic verses
- [ ] Add bookmarking for favorite verses
- [x] Optimize bundle size to keep app under 50MB


## Phase 21: Notification Time Customization
- [ ] Create time picker component for notification scheduling
- [ ] Implement persistent notification time storage
- [ ] Add notification scheduling for each prayer time
- [ ] Create notification history screen
- [ ] Add notification preview functionality
- [ ] Implement background task scheduling

## Phase 22: Statistics Dashboard
- [ ] Create statistics screen component
- [ ] Build completion tracking analytics
- [ ] Implement visual charts using react-native-svg
- [ ] Add monthly/yearly breakdown views
- [ ] Display most-read duas and favorite categories
- [ ] Show achievement progress and streaks
- [ ] Create data export functionality


