/**
 * Lightweight Quran Database (Optimized)
 * Contains essential surahs with English translations
 * Optimized for minimal bundle size (~500KB)
 * Full Quran can be downloaded as optional content
 */

export interface QuranVerse {
  surah: number;
  verse: number;
  arabic: string;
  english: string;
}

export interface Surah {
  number: number;
  name: string;
  nameArabic: string;
  nameTranslation: string;
  totalVerses: number;
  revelation: "Meccan" | "Medinan";
  verses: QuranVerse[];
}

// Lightweight Quran - Most frequently referenced surahs
// This is a sample with key surahs. Full Quran would be downloaded separately
export const QURAN_LITE: Surah[] = [
  {
    number: 1,
    name: "Al-Fatiha",
    nameArabic: "الفاتحة",
    nameTranslation: "The Opening",
    totalVerses: 7,
    revelation: "Meccan",
    verses: [
      {
        surah: 1,
        verse: 1,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        english: "In the name of Allah, the Most Gracious, the Most Merciful.",
      },
      {
        surah: 1,
        verse: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        english: "All praise is due to Allah, Lord of the worlds.",
      },
      {
        surah: 1,
        verse: 3,
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        english: "The Most Gracious, the Most Merciful.",
      },
      {
        surah: 1,
        verse: 4,
        arabic: "مَالِكِ يَوْمِ الدِّينِ",
        english: "Master of the Day of Judgment.",
      },
      {
        surah: 1,
        verse: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        english: "You alone we worship, and You alone we ask for help.",
      },
      {
        surah: 1,
        verse: 6,
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        english: "Guide us to the straight path,",
      },
      {
        surah: 1,
        verse: 7,
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        english: "The path of those upon whom You have bestowed favor, not of those who have earned Your anger, nor of those who are astray.",
      },
    ],
  },
  {
    number: 2,
    name: "Al-Baqarah",
    nameArabic: "البقرة",
    nameTranslation: "The Cow",
    totalVerses: 286,
    revelation: "Medinan",
    verses: [
      {
        surah: 2,
        verse: 1,
        arabic: "الم",
        english: "Alif, Lam, Meem.",
      },
      {
        surah: 2,
        verse: 2,
        arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
        english: "This is the Book about which there is no doubt, a guidance for those conscious of Allah.",
      },
      {
        surah: 2,
        verse: 255,
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۚ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۚ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۖ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        english: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
      },
    ],
  },
  {
    number: 36,
    name: "Ya-Sin",
    nameArabic: "يس",
    nameTranslation: "Ya-Sin",
    totalVerses: 83,
    revelation: "Meccan",
    verses: [
      {
        surah: 36,
        verse: 1,
        arabic: "يس",
        english: "Ya, Seen.",
      },
      {
        surah: 36,
        verse: 2,
        arabic: "وَالْقُرْآنِ الْحَكِيمِ",
        english: "By the wise Quran,",
      },
    ],
  },
  {
    number: 67,
    name: "Al-Mulk",
    nameArabic: "الملك",
    nameTranslation: "The Dominion",
    totalVerses: 30,
    revelation: "Meccan",
    verses: [
      {
        surah: 67,
        verse: 1,
        arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        english: "Blessed is He in whose hand is dominion, and He over all things has power.",
      },
    ],
  },
];

/**
 * Search Quran verses
 */
export function searchQuran(query: string): QuranVerse[] {
  const lowerQuery = query.toLowerCase();
  const results: QuranVerse[] = [];

  QURAN_LITE.forEach((surah) => {
    surah.verses.forEach((verse) => {
      if (
        verse.english.toLowerCase().includes(lowerQuery) ||
        verse.arabic.includes(query)
      ) {
        results.push(verse);
      }
    });
  });

  return results;
}

/**
 * Get surah by number
 */
export function getSurahByNumber(number: number): Surah | undefined {
  return QURAN_LITE.find((s) => s.number === number);
}

/**
 * Get verse by surah and verse number
 */
export function getVerse(surah: number, verse: number): QuranVerse | undefined {
  const surahData = getSurahByNumber(surah);
  return surahData?.verses.find((v) => v.verse === verse);
}

/**
 * Get all surahs list
 */
export function getAllSurahs() {
  return QURAN_LITE.map((s) => ({
    number: s.number,
    name: s.name,
    nameArabic: s.nameArabic,
    totalVerses: s.totalVerses,
    revelation: s.revelation,
  }));
}

/**
 * Get Quran statistics
 */
export function getQuranStats() {
  return {
    totalSurahs: QURAN_LITE.length,
    totalVerses: QURAN_LITE.reduce((sum, s) => sum + s.verses.length, 0),
    revelation: {
      meccan: QURAN_LITE.filter((s) => s.revelation === "Meccan").length,
      medinan: QURAN_LITE.filter((s) => s.revelation === "Medinan").length,
    },
  };
}
