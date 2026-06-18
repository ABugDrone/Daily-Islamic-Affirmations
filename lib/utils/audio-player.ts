/**
 * Audio Player Utility
 * Manages offline audio playback for Quranic recitations
 * Works completely offline using device storage
 */

export interface AudioTrack {
  id: string;
  duaId: string;
  title: string;
  reciter: string;
  duration: number; // in seconds
  localPath?: string; // Path to local audio file
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentTrack: AudioTrack | null;
}

// Mock audio tracks - in production, these would be bundled with the app
export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: "audio_001",
    duaId: "anxiety_001",
    title: "Hasbunallahu wa ni'mal wakeel",
    reciter: "Offline Recitation",
    duration: 45,
  },
  {
    id: "audio_002",
    duaId: "anxiety_002",
    title: "Dua of Prophet Yunus",
    reciter: "Offline Recitation",
    duration: 38,
  },
  {
    id: "audio_003",
    duaId: "wealth_001",
    title: "Dua for Halal Provision",
    reciter: "Offline Recitation",
    duration: 52,
  },
  {
    id: "audio_004",
    duaId: "protection_001",
    title: "Ayatul Kursi",
    reciter: "Offline Recitation",
    duration: 120,
  },
  {
    id: "audio_005",
    duaId: "gratitude_001",
    title: "Al-hamdu lillahi",
    reciter: "Offline Recitation",
    duration: 28,
  },
  {
    id: "audio_006",
    duaId: "sleep_001",
    title: "Ayatul Kursi for Sleep",
    reciter: "Offline Recitation",
    duration: 125,
  },
];

export function getAudioTrackByDuaId(duaId: string): AudioTrack | undefined {
  return AUDIO_TRACKS.find((track) => track.duaId === duaId);
}

export function formatAudioTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function calculateAudioProgress(
  currentTime: number,
  duration: number
): number {
  if (duration === 0) return 0;
  return (currentTime / duration) * 100;
}
