# Daily Islamic Affirmations - Mobile App Design

## Design Philosophy

The app follows **Apple Human Interface Guidelines (HIG)** principles with an elegant Islamic aesthetic. The design prioritizes **accessibility for elderly users**, **one-handed usage**, and **portrait orientation (9:16)**.

**Brand Colors:**
- **Primary:** Deep Emerald Green (#1B6B4F)
- **Accent:** Gold (#D4AF37)
- **Background:** White (#FFFFFF) / Dark (#0F1419)
- **Text:** Dark Gray (#11181C) / Light Gray (#ECEDEE)
- **Surface:** Light Gray (#F5F5F5) / Dark Surface (#1E2022)

**Typography:**
- **Arabic:** Uthmani Quran Font (for Quranic verses)
- **English:** Inter / Poppins (clean, modern, accessible)
- **Font Sizes:** 14px (body), 16px (emphasis), 18px (headers), 24px+ (large text mode)

---

## Screen List

### 1. **Splash Screen**
- **Purpose:** App launch animation and branding
- **Content:**
  - Deep Emerald Green gradient background
  - Centered Gold Crescent + Open Quran icon
  - App title: "Daily Islamic Affirmations"
  - Subtitle: "Authentic Quran & Sunnah Reminders"
  - Footer: "Developed by ABugDrone"
  - Gentle fade-in animation (2 seconds)
- **Interaction:** Auto-transitions to Home screen after animation

### 2. **Home Screen (Tab 1)**
- **Purpose:** Daily affirmations hub and prayer time tracker
- **Content:**
  - **Greeting Header:** "Assalamu Alaikum" with current time
  - **Date Display:** Gregorian + Hijri calendar
  - **Prayer Time Card:**
    - Current prayer status
    - Next prayer countdown (HH:MM:SS)
    - Prayer name and time
  - **Today's Affirmations Section:**
    - Progress indicator: "3/5 Completed"
    - 5 dua cards (scrollable horizontally or stacked vertically)
    - Each card shows: Arabic text, transliteration, English translation
    - Bookmark icon (top-right of each card)
    - Share button (bottom-right of each card)
  - **Daily Reflection Card:** Inspirational quote or hadith
  - **Bottom Navigation:** Home, Search, Favorites, Settings

### 3. **Dua Detail Screen**
- **Purpose:** Full view of a single dua with all details
- **Content:**
  - **Header:** Back button + Bookmark/Share icons
  - **Arabic Text:** Large, centered, beautiful Quranic font
  - **Transliteration:** Phonetic Roman spelling (optional toggle)
  - **English Translation:** Clear, modern English
  - **Commentary:** 1–3 sentence explanation (benefits, context, source, application)
  - **Source Reference:** "Quran 2:286" or "Sahih Muslim 2721"
  - **Action Buttons:**
    - Bookmark (toggle favorite)
    - Share as image
    - Copy text
  - **Audio Recitation:** Play button (if available)
  - **Navigation:** Previous/Next dua arrows

### 4. **Search Screen (Tab 2)**
- **Purpose:** Find duas by topic, verse, or keyword
- **Content:**
  - **Search Bar:** Prominent search input with placeholder "Search by topic, verse, keyword..."
  - **Filter Tabs:** All, Anxiety, Wealth, Protection, Gratitude, Sleep
  - **Results List:** Scrollable list of matching duas
  - **Each Result Card:**
    - Arabic snippet (truncated)
    - English translation (truncated)
    - Source reference
    - Tap to view full dua
  - **Empty State:** "No results found" with suggestions

### 5. **Favorites Screen (Tab 3)**
- **Purpose:** View and manage bookmarked duas
- **Content:**
  - **Header:** "My Favorites" with count
  - **Filter Tabs:** All, Anxiety, Wealth, Protection, Gratitude, Sleep
  - **Favorites List:** Scrollable list of saved duas
  - **Each Card:** Same as search results
  - **Empty State:** "No favorites yet. Bookmark duas to save them."
  - **Swipe Actions:** Delete from favorites (optional)

### 6. **Settings Screen (Tab 4)**
- **Purpose:** Customize app experience
- **Content:**
  - **Theme Section:**
    - Dark Mode toggle
    - Color scheme selector (optional)
  - **Text Size Section:**
    - Font size slider (Small, Medium, Large, Extra Large)
    - Preview text: "Sample Dua Text"
  - **Prayer Times Section:**
    - Location permission toggle
    - Manual location input
    - Prayer calculation method selector (Hanafi, Shafi'i, etc.)
  - **Notifications Section:**
    - Daily affirmation reminder toggle
    - Prayer time alerts toggle
    - Notification time picker
  - **About Section:**
    - App version
    - Developer info
    - Privacy policy link
    - Terms of service link

---

## Primary Content and Functionality

### Home Screen Flow
1. User opens app → Splash screen (2s) → Home screen
2. Home screen displays:
   - Current prayer time and countdown
   - Today's 5 affirmations (one per prayer period)
   - Progress: "3/5 Completed" (user has viewed 3 duas)
3. User taps a dua card → Dua Detail screen
4. User can bookmark, share, or navigate to next/previous dua
5. User returns to Home via back button or tab

### Search Flow
1. User taps Search tab
2. User types keyword or selects filter
3. Results display in list
4. User taps result → Dua Detail screen
5. User can bookmark or share from detail screen

### Favorites Flow
1. User taps Favorites tab
2. Displays all bookmarked duas
3. User can filter by category
4. User taps favorite → Dua Detail screen
5. User can remove from favorites via swipe or button

### Settings Flow
1. User taps Settings tab
2. User adjusts preferences (dark mode, font size, notifications, location)
3. Changes save automatically to local storage
4. User returns to Home tab

---

## Key User Flows

### Flow 1: Daily Affirmation Viewing
```
Home Screen (see 5 affirmations)
  ↓ (tap dua card)
Dua Detail Screen (full content + audio)
  ↓ (tap bookmark)
Dua saved to Favorites
  ↓ (tap share)
Share as image or text
  ↓ (tap back or next)
Return to Home or view next dua
```

### Flow 2: Prayer Time Tracking
```
Home Screen (displays current prayer + countdown)
  ↓ (countdown reaches 00:00)
Notification: "Next prayer time arrived"
  ↓ (user taps notification or opens app)
Home Screen updates with new prayer
New affirmation unlocked for this prayer period
```

### Flow 3: Search and Bookmark
```
Search Tab (enter keyword: "anxiety")
  ↓ (results display)
Tap result → Dua Detail
  ↓ (tap bookmark icon)
Dua added to Favorites
  ↓ (navigate to Favorites tab)
Dua appears in Favorites list
```

### Flow 4: Dark Mode and Accessibility
```
Settings Tab → Dark Mode toggle
  ↓ (enable dark mode)
All screens update to dark theme
  ↓ (adjust font size slider)
All text increases in size across app
  ↓ (save settings)
Preferences persist on app restart
```

---

## Card Component Design

### Dua Card (Home Screen)
```
┌─────────────────────────────────────┐
│ 🔖 (bookmark icon)                  │
│                                     │
│ بِسْمِ اللَّهِ الرَّحْمَٰنِ       │
│ الرَّحِيمِ                          │
│                                     │
│ Bismillah ar-Rahman ar-Rahim        │
│                                     │
│ In the name of Allah, the Most      │
│ Gracious, the Most Merciful         │
│                                     │
│ This verse opens the Quran and      │
│ teaches us to begin all actions     │
│ with God's name.                    │
│                                     │
│ Source: Quran 1:1                   │
│                                     │
│ [Share] [Audio] ▶                   │
└─────────────────────────────────────┘
```

### Prayer Time Card (Home Screen)
```
┌─────────────────────────────────────┐
│ Current Prayer: Dhuhr               │
│ Time: 12:30 PM                      │
│                                     │
│ Next Prayer: Asr                    │
│ Countdown: 03:45:22                 │
│                                     │
│ 📍 Location: New York, NY           │
└─────────────────────────────────────┘
```

### Progress Indicator
```
Today's Affirmations: 3/5 Completed
[████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]
```

---

## Interaction Patterns

### Tap Feedback
- **Dua Cards:** Opacity fade (0.7) on tap, then navigate to detail
- **Buttons:** Scale 0.97 + haptic feedback (light impact)
- **Toggles:** Haptic feedback (medium impact)

### Swipe Gestures
- **Dua Cards:** Swipe left to share, swipe right to bookmark (optional)
- **Favorites List:** Swipe left to delete from favorites

### Long Press
- **Dua Cards:** Copy text to clipboard with toast notification

### Animations
- **Splash Screen:** Gentle fade-in (250ms)
- **Card Transitions:** Subtle slide-in from bottom (200ms)
- **Theme Switch:** Fade transition (150ms)
- **Countdown Timer:** Smooth number updates (no animation)

---

## Accessibility Considerations

### For Elderly Users
- **Large Default Font:** Start with 16px body text (not 14px)
- **High Contrast:** Emerald Green + White provides strong contrast
- **Simple Navigation:** 4 tabs only, no nested menus
- **Clear Buttons:** Large tap targets (min 44x44pt)
- **Dark Mode:** Reduces eye strain in low-light environments

### For All Users
- **Screen Reader Support:** All images have alt text, buttons labeled
- **Color Blind Friendly:** Don't rely on color alone (use icons + text)
- **Text Scaling:** Font size adjustable up to "Extra Large"
- **Haptic Feedback:** Optional, can be disabled in settings

---

## Visual Hierarchy

### Home Screen
1. **Greeting + Date** (largest, top)
2. **Prayer Time Card** (prominent, high contrast)
3. **Today's Affirmations** (main content)
4. **Daily Reflection** (secondary, bottom)
5. **Bottom Tab Navigation** (always visible)

### Dua Detail Screen
1. **Arabic Text** (largest, centered)
2. **Transliteration** (secondary)
3. **English Translation** (body text)
4. **Commentary** (smaller, muted color)
5. **Source Reference** (smallest, muted)

---

## Offline Support

- **All Data Local:** 365+ duas stored in SQLite database
- **Prayer Times:** Calculated locally using device location
- **No API Calls:** App works 100% offline after installation
- **Sync:** Optional cloud sync for favorites (future feature)

---

## Dark Mode Implementation

- **Background:** #0F1419 (very dark, not pure black)
- **Surface:** #1E2022 (slightly lighter for cards)
- **Text:** #ECEDEE (off-white, not pure white)
- **Accent:** Gold (#D4AF37) remains unchanged
- **All screens:** Automatic theme switching based on system preference

---

## Summary

The app balances **Islamic authenticity**, **modern design**, and **accessibility**. Every screen is designed for **one-handed usage** on portrait mobile devices, with **large touch targets**, **clear typography**, and **minimal cognitive load**. The color scheme reflects Islamic heritage (Emerald Green + Gold) while maintaining professional, contemporary aesthetics suitable for the Google Play Store.
