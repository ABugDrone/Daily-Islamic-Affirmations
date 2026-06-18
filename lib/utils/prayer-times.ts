/**
 * Prayer Time Calculation Utility
 * Calculates prayer times based on latitude, longitude, and date
 * Uses the Hanafi method by default
 */

export type PrayerName = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";

export interface PrayerTime {
  name: PrayerName;
  time: Date;
  timeString: string;
}

export interface DailyPrayerTimes {
  date: Date;
  fajr: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

// Prayer calculation methods
export type CalculationMethod = "hanafi" | "shafii" | "maliki" | "hanbali" | "isna" | "mwl" | "egypt";

interface CalculationParams {
  latitude: number;
  longitude: number;
  date: Date;
  timezone: number; // UTC offset in hours
  method: CalculationMethod;
}

class PrayerTimeCalculator {
  private static readonly PRAYER_ANGLES: Record<CalculationMethod, Record<string, number>> = {
    hanafi: {
      fajr: 18,
      isha: 18,
    },
    shafii: {
      fajr: 20,
      isha: 15,
    },
    maliki: {
      fajr: 19,
      isha: 17,
    },
    hanbali: {
      fajr: 19,
      isha: 17,
    },
    isna: {
      fajr: 15,
      isha: 15,
    },
    mwl: {
      fajr: 18,
      isha: 17,
    },
    egypt: {
      fajr: 19.5,
      isha: 17.5,
    },
  };

  static calculatePrayerTimes(params: CalculationParams): DailyPrayerTimes {
    const { latitude, longitude, date, timezone, method } = params;

    // Get day of year
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

    // Calculate solar declination
    const declination = this.calculateDeclination(dayOfYear);

    // Calculate equation of time
    const eot = this.calculateEquationOfTime(dayOfYear);

    // Get angles for calculation method
    const angles = this.PRAYER_ANGLES[method];

    // Calculate prayer times
    const fajr = this.calculateTime(
      latitude,
      declination,
      eot,
      timezone,
      -angles.fajr
    );
    const sunrise = this.calculateTime(latitude, declination, eot, timezone, -0.833);
    const dhuhr = this.calculateTime(latitude, declination, eot, timezone, 0);
    const asr = this.calculateAsrTime(latitude, declination, eot, timezone);
    const sunset = this.calculateTime(latitude, declination, eot, timezone, 0.833);
    const maghrib = sunset;
    const isha = this.calculateTime(
      latitude,
      declination,
      eot,
      timezone,
      angles.isha
    );

    return {
      date,
      fajr,
      dhuhr,
      asr,
      maghrib,
      isha,
    };
  }

  private static calculateDeclination(dayOfYear: number): number {
    const n = dayOfYear - 1;
    const declination =
      23.44 * Math.sin((360 / 365.25) * (n + 284.6) * (Math.PI / 180));
    return declination;
  }

  private static calculateEquationOfTime(dayOfYear: number): number {
    const n = dayOfYear - 1;
    const b = (360 / 365.25) * n * (Math.PI / 180);
    const eot =
      229.18 *
      (0.000075 +
        0.001868 * Math.cos(b) -
        0.032077 * Math.sin(b) -
        0.014615 * Math.cos(2 * b) -
        0.040849 * Math.sin(2 * b));
    return eot;
  }

  private static calculateTime(
    latitude: number,
    declination: number,
    eot: number,
    timezone: number,
    angle: number
  ): Date {
    const lat = latitude * (Math.PI / 180);
    const dec = declination * (Math.PI / 180);
    const angleRad = angle * (Math.PI / 180);

    const cosH =
      (-Math.tan(lat) * Math.tan(dec) + Math.sin(angleRad) / Math.cos(lat) / Math.cos(dec));

    if (cosH > 1 || cosH < -1) {
      // Sun doesn't rise or set
      return new Date();
    }

    const h = Math.acos(cosH) * (180 / Math.PI);
    const time = 12 - h / 15 - eot / 60 - timezone;

    const date = new Date();
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    const seconds = Math.floor(((time - hours) * 60 - minutes) * 60);

    date.setHours(hours, minutes, seconds, 0);
    return date;
  }

  private static calculateAsrTime(
    latitude: number,
    declination: number,
    eot: number,
    timezone: number
  ): Date {
    const lat = latitude * (Math.PI / 180);
    const dec = declination * (Math.PI / 180);

    // Asr angle (shadow length = 1 for Shafi'i, 2 for Hanafi)
    const asrAngle = Math.atan(1 + Math.tan(lat - dec)) * (180 / Math.PI);

    return this.calculateTime(latitude, declination, eot, timezone, asrAngle);
  }
}

export function getPrayerTimes(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
  method: CalculationMethod = "hanafi"
): DailyPrayerTimes {
  const timezone = date.getTimezoneOffset() / -60;
  return PrayerTimeCalculator.calculatePrayerTimes({
    latitude,
    longitude,
    date,
    timezone,
    method,
  });
}

export function getNextPrayer(
  prayerTimes: DailyPrayerTimes,
  currentTime: Date = new Date()
): { prayer: PrayerName; time: Date; minutesUntil: number } | null {
  const prayers: Array<[PrayerName, Date]> = [
    ["fajr", prayerTimes.fajr],
    ["dhuhr", prayerTimes.dhuhr],
    ["asr", prayerTimes.asr],
    ["maghrib", prayerTimes.maghrib],
    ["isha", prayerTimes.isha],
  ];

  for (const [name, time] of prayers) {
    if (time > currentTime) {
      const minutesUntil = Math.floor((time.getTime() - currentTime.getTime()) / 60000);
      return { prayer: name, time, minutesUntil };
    }
  }

  // If no prayer found today, return Fajr of next day
  const nextDay = new Date(prayerTimes.date);
  nextDay.setDate(nextDay.getDate() + 1);
  const nextDayPrayers = getPrayerTimes(0, 0, nextDay); // Placeholder coords
  const minutesUntil = Math.floor(
    (nextDayPrayers.fajr.getTime() - currentTime.getTime()) / 60000
  );
  return { prayer: "fajr", time: nextDayPrayers.fajr, minutesUntil };
}

export function getCurrentPrayer(
  prayerTimes: DailyPrayerTimes,
  currentTime: Date = new Date()
): PrayerName | null {
  const prayers: Array<[PrayerName, Date, Date]> = [
    ["fajr", prayerTimes.fajr, prayerTimes.dhuhr],
    ["dhuhr", prayerTimes.dhuhr, prayerTimes.asr],
    ["asr", prayerTimes.asr, prayerTimes.maghrib],
    ["maghrib", prayerTimes.maghrib, prayerTimes.isha],
    ["isha", prayerTimes.isha, new Date(prayerTimes.date.getTime() + 24 * 60 * 60 * 1000)],
  ];

  for (const [name, startTime, endTime] of prayers) {
    if (currentTime >= startTime && currentTime < endTime) {
      return name;
    }
  }

  return null;
}

export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatCountdown(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const secs = Math.floor((minutes % 1) * 60);

  if (hours > 0) {
    return `${hours}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function getPrayerNameArabic(prayer: PrayerName): string {
  const names: Record<PrayerName, string> = {
    fajr: "الفجر",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء",
  };
  return names[prayer];
}

export function getPrayerNameEnglish(prayer: PrayerName): string {
  const names: Record<PrayerName, string> = {
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
  };
  return names[prayer];
}
