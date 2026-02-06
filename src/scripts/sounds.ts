// Windows XP Sound Effects Manager

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled = true;
  private hasInteracted = false;

  constructor() {
    this.initSounds();
    this.initEventListeners();
  }

  private initSounds(): void {
    // Note: These sounds would need to be added to public/assets/xp/sounds/
    // For now, we'll create placeholders that can be enabled when sounds are added
    const soundList = [
      'startup',
      'shutdown',
      'click',
      'open',
      'close',
      'error',
      'notify',
      'minimize',
      'maximize',
      'restore',
    ];

    const baseUrl = (import.meta as any).env?.BASE_URL || '';

    soundList.forEach((name) => {
      const audio = new Audio();
      audio.preload = 'auto';
      // Uncomment when sound files are available:
      // audio.src = `${baseUrl}/assets/xp/sounds/${name}.wav`;
      this.sounds.set(name, audio);
    });
  }

  private initEventListeners(): void {
    // Track user interaction for autoplay policy
    document.addEventListener('click', () => {
      this.hasInteracted = true;
    }, { once: true });

    document.addEventListener('keydown', () => {
      this.hasInteracted = true;
    }, { once: true });

    // Listen for sound play events
    window.addEventListener('xp:sound:play', ((e: CustomEvent) => {
      this.play(e.detail.sound);
    }) as EventListener);
  }

  play(soundName: string): void {
    if (!this.enabled || !this.hasInteracted) return;

    const sound = this.sounds.get(soundName);
    if (sound && sound.src) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

// Initialize sound manager
function initSoundManager() {
  (window as any).xpSoundManager = new SoundManager();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSoundManager);
} else {
  initSoundManager();
}

export { SoundManager };
