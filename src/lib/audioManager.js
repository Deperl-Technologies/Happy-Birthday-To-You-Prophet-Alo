/**
 * audioManager.js — Global singleton music player
 *
 * Handles: playlist, play/pause, volume ducking when videos play,
 * fade-in / fade-out, and event subscriptions for UI sync.
 */

// ─── Playlist ─────────────────────────────────────────────────────────────────
// Files must be renamed to these simple names in src/assets/audio/
import deledara from "@/assets/audio/dele-dara.m4a";
import emimese from "@/assets/audio/emimo-ese.m4a";

export const PLAYLIST = [
  {
    title: "Dele Dara",
    artist: "Prophet Sam Olu Alo",
    url: deledara,
  },
  {
    title: "Emi Mimo Ese",
    artist: "Prophet Sam Olu Alo",
    url: emimese,
  },
];

// ─── Singleton State ──────────────────────────────────────────────────────────
let audio = null;
let currentIndex = 0;
let isPlaying = false;
let isDucked = false;
let userVolume = 0.28;
const DUCK_VOLUME = 0.04;
const listeners = new Set();

// Guard: prevent infinite error loop if tracks fail to load
let consecutiveErrors = 0;

function getOrCreateAudio() {
  if (!audio) {
    audio = new Audio();
    audio.loop = false;
    audio.preload = "auto";
    audio.volume = 0;

    audio.addEventListener("ended", () => {
      consecutiveErrors = 0;
      next();
    });

    audio.addEventListener("canplay", () => {
      consecutiveErrors = 0;
    });

    audio.addEventListener("error", (e) => {
      console.warn(
        `[audioManager] Failed to load track "${PLAYLIST[currentIndex]?.title}"`,
        e,
      );
      consecutiveErrors++;
      if (consecutiveErrors >= PLAYLIST.length) {
        console.error("[audioManager] All tracks failed. Stopping.");
        isPlaying = false;
        consecutiveErrors = 0;
        notify();
        return;
      }
      setTimeout(() => next(), 800);
    });
  }
  return audio;
}

function notify() {
  const state = getState();
  listeners.forEach((fn) => fn(state));
}

export function getState() {
  return {
    isPlaying,
    isDucked,
    currentIndex,
    track: PLAYLIST[currentIndex],
    volume: userVolume,
  };
}

// ─── Fade helpers ─────────────────────────────────────────────────────────────
let fadeTimer = null;

function clearFade() {
  if (fadeTimer) {
    clearInterval(fadeTimer);
    fadeTimer = null;
  }
}

function fadeTo(targetVol, stepSize = 0.025, intervalMs = 80, onDone) {
  clearFade();
  const a = getOrCreateAudio();
  fadeTimer = setInterval(() => {
    const current = a.volume;
    if (Math.abs(current - targetVol) <= stepSize) {
      a.volume = Math.max(0, Math.min(1, targetVol));
      clearFade();
      if (onDone) onDone();
    } else {
      a.volume =
        current < targetVol
          ? Math.min(1, current + stepSize)
          : Math.max(0, current - stepSize);
    }
  }, intervalMs);
}

// ─── Core controls ────────────────────────────────────────────────────────────
export function loadTrack(index) {
  const a = getOrCreateAudio();
  currentIndex = index;
  a.src = PLAYLIST[index].url;
  a.load();
  notify();
}

export function play(index) {
  const a = getOrCreateAudio();
  if (index !== undefined && index !== currentIndex) {
    loadTrack(index);
    currentIndex = index;
  }
  if (!a.src || a.src === window.location.href) {
    loadTrack(currentIndex);
  }
  a.play()
    .then(() => {
      isPlaying = true;
      fadeTo(isDucked ? DUCK_VOLUME : userVolume);
      notify();
    })
    .catch((err) => {
      console.warn("[audioManager] play() rejected:", err);
      isPlaying = false;
      notify();
    });
}

export function pause() {
  const a = getOrCreateAudio();
  fadeTo(0, 0.03, 60, () => {
    a.pause();
    isPlaying = false;
    notify();
  });
}

export function toggle() {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
}

export function next() {
  const nextIdx = (currentIndex + 1) % PLAYLIST.length;
  loadTrack(nextIdx);
  if (isPlaying) {
    const a = getOrCreateAudio();
    a.play()
      .then(() => fadeTo(isDucked ? DUCK_VOLUME : userVolume))
      .catch(() => {});
  }
  notify();
}

export function prev() {
  const prevIdx = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
  loadTrack(prevIdx);
  if (isPlaying) {
    const a = getOrCreateAudio();
    a.play()
      .then(() => fadeTo(isDucked ? DUCK_VOLUME : userVolume))
      .catch(() => {});
  }
  notify();
}

export function setTrack(index) {
  loadTrack(index);
  if (isPlaying) {
    const a = getOrCreateAudio();
    a.play()
      .then(() => fadeTo(isDucked ? DUCK_VOLUME : userVolume))
      .catch(() => {});
  }
  notify();
}

// ─── Ducking (for video playback) ─────────────────────────────────────────────
let duckCount = 0;

export function duckMusic() {
  duckCount++;
  if (!isDucked) {
    isDucked = true;
    if (isPlaying) fadeTo(DUCK_VOLUME);
    notify();
  }
}

export function restoreMusic() {
  duckCount = Math.max(0, duckCount - 1);
  if (duckCount === 0 && isDucked) {
    isDucked = false;
    if (isPlaying) fadeTo(userVolume);
    notify();
  }
}

export function forceRestoreMusic() {
  duckCount = 0;
  isDucked = false;
  if (isPlaying) fadeTo(userVolume);
  notify();
}

// ─── Subscription ─────────────────────────────────────────────────────────────
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function tryAutoPlay() {
  if (!isPlaying) play();
}

const audioManager = {
  play,
  pause,
  toggle,
  next,
  prev,
  setTrack,
  duckMusic,
  restoreMusic,
  forceRestoreMusic,
  subscribe,
  getState,
  tryAutoPlay,
  PLAYLIST,
};

export default audioManager;
