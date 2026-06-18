/**
 * Hijri Calendar Utility
 * Converts between Gregorian and Hijri dates
 * Includes Islamic holidays and important dates
 */

export interface HijriDate {
  year: number;
  month: number;
  day: number;
}

export interface IslamicEvent {
  hijriMonth: number;
  hijriDay: number;
  name: string;
  nameArabic: string;
  description: string;
  type: "holiday" | "observance" | "event";
}

// Islamic holidays and important dates
export const ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    hijriMonth: 1,
    hijriDay: 1,
    name: "Islamic New Year",
    nameArabic: "رأس السنة الهجرية",
    description: "The first day of Muharram marks the Islamic New Year",
    type: "holiday",
  },
  {
    hijriMonth: 1,
    hijriDay: 9,
    name: "Day of Ashura",
    nameArabic: "يوم عاشوراء",
    description: "The 9th day of Muharram, a significant day in Islamic history",
    type: "observance",
  },
  {
    hijriMonth: 1,
    hijriDay: 10,
    name: "Day of Ashura",
    nameArabic: "يوم عاشوراء",
    description: "The 10th day of Muharram, commemorated by many Muslims",
    type: "observance",
  },
  {
    hijriMonth: 3,
    hijriDay: 12,
    name: "Mawlid al-Nabi",
    nameArabic: "مولد النبي",
    description: "The birthday of Prophet Muhammad (Peace be upon him)",
    type: "holiday",
  },
  {
    hijriMonth: 7,
    hijriDay: 27,
    name: "Laylat al-Isra and Mi'raj",
    nameArabic: "ليلة الإسراء والمعراج",
    description: "The night of the Prophet's journey to Jerusalem and ascension to heaven",
    type: "observance",
  },
  {
    hijriMonth: 9,
    hijriDay: 1,
    name: "Ramadan Begins",
    nameArabic: "بداية رمضان",
    description: "The start of the holy month of Ramadan",
    type: "holiday",
  },
  {
    hijriMonth: 9,
    hijriDay: 27,
    name: "Laylat al-Qadr",
    nameArabic: "ليلة القدر",
    description: "The Night of Power, the most blessed night of Ramadan",
    type: "observance",
  },
  {
    hijriMonth: 10,
    hijriDay: 1,
    name: "Eid al-Fitr",
    nameArabic: "عيد الفطر",
    description: "Festival of Breaking the Fast, marking the end of Ramadan",
    type: "holiday",
  },
  {
    hijriMonth: 12,
    hijriDay: 8,
    name: "Day of Arafah",
    nameArabic: "يوم عرفة",
    description: "The day before Eid al-Adha, the most important day of Hajj",
    type: "observance",
  },
  {
    hijriMonth: 12,
    hijriDay: 9,
    name: "Eid al-Adha",
    nameArabic: "عيد الأضحى",
    description: "Festival of Sacrifice, commemorating Prophet Ibrahim's willingness to sacrifice",
    type: "holiday",
  },
];

// Months in Islamic calendar
export const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi' al-awwal",
  "Rabi' al-thani",
  "Jumada al-awwal",
  "Jumada al-thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
];

export const HIJRI_MONTHS_ARABIC = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الثاني",
  "جمادى الأولى",
  "جمادى الثانية",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

/**
 * Convert Gregorian date to Hijri date
 * Using the Kuwaiti algorithm
 */
export function gregorianToHijri(date: Date = new Date()): HijriDate {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let N = day + Math.floor(30.6001 * (month + 1)) - Math.floor(30.6001 * 1) + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) - 1948440;

  let Q = Math.floor(N / 10631);
  N = N % 10631;

  let R = Math.floor(N / 325);
  if (R > 3) R = 3;

  N = N % 325;
  let S = Math.floor(N / 30);
  if (S > 11) S = 11;

  const hijriYear = 30 * Q + 325 * R + S + 1;
  const hijriMonth = ((N % 30) > 0 ? Math.floor(N % 30) + 1 : 12);
  const hijriDay = (N % 30) > 0 ? (N % 30) : 30;

  return {
    year: hijriYear,
    month: hijriMonth,
    day: hijriDay,
  };
}

/**
 * Convert Hijri date to Gregorian date
 */
export function hijriToGregorian(hijriDate: HijriDate): Date {
  const { year, month, day } = hijriDate;

  const N = day + 30 * (month - 1) + 325 * Math.floor((year - 1) / 30) + 30 * ((year - 1) % 30) + Math.floor(((year - 1) % 30 + 1) / 11) + 1948440 - 385;

  let Q = Math.floor(N / 146097);
  let R = N % 146097;

  let S = Math.floor(R / 36524);
  if (S > 3) S = 3;
  R = R - 36524 * S;

  let T = Math.floor(R / 365.2425);
  R = R % Math.floor(365.2425);

  const gregorianYear = 400 * Q + 100 * S + T + 1;
  const gregorianDayOfYear = Math.floor(R) + 1;

  const isLeapYear = (gregorianYear % 4 === 0 && gregorianYear % 100 !== 0) || gregorianYear % 400 === 0;
  const daysInMonths = isLeapYear ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let gregorianMonth = 1;
  let daysLeft = gregorianDayOfYear;

  for (let i = 0; i < 12; i++) {
    if (daysLeft <= daysInMonths[i]) {
      gregorianMonth = i + 1;
      break;
    }
    daysLeft -= daysInMonths[i];
  }

  return new Date(gregorianYear, gregorianMonth - 1, daysLeft);
}

/**
 * Get Islamic events for a given Hijri month
 */
export function getEventsForMonth(hijriMonth: number): IslamicEvent[] {
  return ISLAMIC_EVENTS.filter((event) => event.hijriMonth === hijriMonth);
}

/**
 * Get upcoming Islamic events (next 30 days)
 */
export function getUpcomingEvents(): IslamicEvent[] {
  const today = gregorianToHijri();
  const upcoming: IslamicEvent[] = [];

  for (let i = 0; i < 30; i++) {
    const checkDate = new Date();
    checkDate.setDate(checkDate.getDate() + i);
    const hijriDate = gregorianToHijri(checkDate);

    const events = ISLAMIC_EVENTS.filter(
      (event) => event.hijriMonth === hijriDate.month && event.hijriDay === hijriDate.day
    );

    upcoming.push(...events);
  }

  return upcoming;
}

/**
 * Format Hijri date as string
 */
export function formatHijriDate(hijriDate: HijriDate): string {
  return `${hijriDate.day} ${HIJRI_MONTHS[hijriDate.month - 1]} ${hijriDate.year} AH`;
}

/**
 * Format Hijri date in Arabic
 */
export function formatHijriDateArabic(hijriDate: HijriDate): string {
  return `${hijriDate.day} ${HIJRI_MONTHS_ARABIC[hijriDate.month - 1]} ${hijriDate.year} هـ`;
}

/**
 * Get current Hijri date
 */
export function getCurrentHijriDate(): HijriDate {
  return gregorianToHijri();
}

/**
 * Check if a specific date is an Islamic holiday
 */
export function isIslamicHoliday(hijriDate: HijriDate): IslamicEvent | null {
  const event = ISLAMIC_EVENTS.find(
    (e) => e.hijriMonth === hijriDate.month && e.hijriDay === hijriDate.day
  );
  return event || null;
}

/**
 * Get days until next Islamic holiday
 */
export function daysUntilNextHoliday(): { days: number; event: IslamicEvent } | null {
  const today = gregorianToHijri();
  let minDays = Infinity;
  let nextEvent: IslamicEvent | null = null;

  for (let i = 0; i < 365; i++) {
    const checkDate = new Date();
    checkDate.setDate(checkDate.getDate() + i);
    const hijriDate = gregorianToHijri(checkDate);

    const event = ISLAMIC_EVENTS.find(
      (e) => e.hijriMonth === hijriDate.month && e.hijriDay === hijriDate.day && e.type === "holiday"
    );

    if (event && i < minDays) {
      minDays = i;
      nextEvent = event;
    }
  }

  return nextEvent ? { days: minDays, event: nextEvent } : null;
}
