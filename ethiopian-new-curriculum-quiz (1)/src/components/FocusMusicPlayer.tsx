import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  Clock,
  Sparkles,
  Coffee,
  RotateCcw,
  BookOpen,
  Volume1,
  Check,
  Flame,
  ChevronDown,
  ChevronUp,
  ListRestart
} from "lucide-react";

export interface Track {
  id: string;
  title: string;
  category: "piano" | "beats";
  url: string;
  artist: string;
}

export const STUDY_CATEGORIES = [
  { id: "piano", name: "Piano Focus", icon: "🎹", desc: "Procedural grand chords & acoustic reverb" },
  { id: "beats", name: "Relaxing Beats", icon: "🎵", desc: "Warm organic synth & offline drum loops" }
];

export const MUSIC_TRACKS: Track[] = [
  // PIANO FOCUS TRACKS (5 tracks)
  {
    id: "piano-1",
    title: "Celestial Keys Ascent",
    category: "piano",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artist: "Serene Grand Piano"
  },
  {
    id: "piano-2",
    title: "Elegance of Silence",
    category: "piano",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    artist: "Whisper Chords Collective"
  },
  {
    id: "piano-3",
    title: "Midnight Moonbeam Resonance",
    category: "piano",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    artist: "Peaceful Reflection Ambient"
  },
  {
    id: "piano-4",
    title: "Soft Morning Mist Chords",
    category: "piano",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    artist: "Acoustic Revival Keys"
  },
  {
    id: "piano-5",
    title: "Warm Autumn Melodies",
    category: "piano",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    artist: "Cozy Fireside Keys"
  },

  // RELAXING BEATS TRACKS (5 tracks)
  {
    id: "beats-1",
    title: "Dusk Horizon Beats",
    category: "beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    artist: "Chillstep Dreamer"
  },
  {
    id: "beats-2",
    title: "Summer Rain Lofi Groove",
    category: "beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artist: "Acoustic Synth Crew"
  },
  {
    id: "beats-3",
    title: "Cosmic Flow Instrumental",
    category: "beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artist: "Astral Frequency Synth"
  },
  {
    id: "beats-4",
    title: "Late Night Study Session",
    category: "beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    artist: "Velvet Tempo"
  },
  {
    id: "beats-5",
    title: "Urban Café Lo-Fi Air",
    category: "beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    artist: "Cafe Lounge Chillout"
  }
];

interface FocusMusicPlayerProps {
  isFocusMode: boolean;
  setIsFocusMode: (val: boolean) => void;
  isDarkMode: boolean;
}

export default function FocusMusicPlayer({
  isFocusMode,
  setIsFocusMode,
  isDarkMode
}: FocusMusicPlayerProps) {
  // Audio Mode determines whether sound is built offline via HTML5 Synthesizer or streamed as an MP3 file
  const [audioMode, setAudioMode] = useState<"synth" | "stream">("synth");
  const [selectedCategory, setSelectedCategory] = useState<"piano" | "beats">("piano");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.4);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Custom tracking for simulated progress bar or stream progress
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [trackDuration, setTrackDuration] = useState<number>(600); // 10 minutes loop by default
  
  // Expanded/Collapsed track view
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [showTrackList, setShowTrackList] = useState<boolean>(true);
  const [showSubTracks, setShowSubTracks] = useState<boolean>(true);
  const [helpNotification, setHelpNotification] = useState<string>("");
  
  // Pomodoro timer status
  const [timerMode, setTimerMode] = useState<"study" | "break">("study");
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(25 * 60);
  const [timerIsActive, setTimerIsActive] = useState<boolean>(false);
  const [totalTimerCycles, setTotalTimerCycles] = useState<number>(0);

  // Streaming play index
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  // References
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Web Audio Synth references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthMasterGainRef = useRef<GainNode | null>(null);
  const synthSourcesRef = useRef<any[]>([]);
  const synthIntervalsRef = useRef<any[]>([]);
  
  // Filter streaming tracks based on selected category
  const filteredTracks = MUSIC_TRACKS.filter(t => t.category === selectedCategory);
  const activeTrack = filteredTracks[currentTrackIndex] || filteredTracks[0] || MUSIC_TRACKS[0];

  const triggerNotification = (text: string) => {
    setHelpNotification(text);
    setTimeout(() => {
      setHelpNotification("");
    }, 5000);
  };

  // Clean and completely shut down synthesized sound waves
  const stopSynthesizer = () => {
    if (synthIntervalsRef.current.length > 0) {
      synthIntervalsRef.current.forEach(timerId => clearInterval(timerId));
      synthIntervalsRef.current = [];
    }
    if (synthSourcesRef.current.length > 0) {
      synthSourcesRef.current.forEach(node => {
        try { node.stop(); } catch (e) {}
        try { node.disconnect(); } catch (e) {}
      });
      synthSourcesRef.current = [];
    }
    if (synthMasterGainRef.current) {
      try { synthMasterGainRef.current.disconnect(); } catch (e) {}
      synthMasterGainRef.current = null;
    }
  };

  // WEB AUDIO SYNTHESIZER GENERATION ENGINE
  const startSynthesizer = (category: "piano" | "beats") => {
    stopSynthesizer();

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        audioCtxRef.current = new AudioContextClass();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.value = isMuted ? 0 : volume;
      masterGain.connect(ctx.destination);
      synthMasterGainRef.current = masterGain;

      setTrackDuration(600); // 10 minutes simulated looping

      if (category === "piano") {
        // Continuous, calm Rhodes/backing organ strings
        const pad1 = ctx.createOscillator();
        pad1.type = "sine";
        pad1.frequency.value = 110; // Warm A2 baseline
        const padGain1 = ctx.createGain();
        padGain1.gain.value = 0.12;
        pad1.connect(padGain1);
        padGain1.connect(masterGain);
        pad1.start(0);
        synthSourcesRef.current.push(pad1);

        const pad2 = ctx.createOscillator();
        pad2.type = "triangle";
        pad2.frequency.value = 165; // Relaxing E3 fifth
        const padGain2 = ctx.createGain();
        padGain2.gain.value = 0.03;
        const padFilter2 = ctx.createBiquadFilter();
        padFilter2.type = "lowpass";
        padFilter2.frequency.value = 180;
        pad2.connect(padFilter2);
        padFilter2.connect(padGain2);
        padGain2.connect(masterGain);
        pad2.start(0);
        synthSourcesRef.current.push(pad2);

        // Procedural pentatonic piano melody engine
        const pianoScale = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99]; // A Minor Pentatonic Scale
        
        const triggerPianoChime = () => {
          const now = ctx.currentTime;
          const pitch = pianoScale[Math.floor(Math.random() * pianoScale.length)];

          const oscSine = ctx.createOscillator();
          const oscTriChime = ctx.createOscillator();
          const chimeGain = ctx.createGain();

          oscSine.type = "sine";
          oscSine.frequency.setValueAtTime(pitch, now);

          oscTriChime.type = "triangle";
          oscTriChime.frequency.setValueAtTime(pitch * 2, now); // Sweet bell-like upper harmonics

          chimeGain.gain.setValueAtTime(0, now);
          chimeGain.gain.linearRampToValueAtTime(0.14, now + 0.03); // Soft touch mallet contact
          chimeGain.gain.exponentialRampToValueAtTime(0.04, now + 0.9);
          chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5); // Warm ambient release ring

          const lowpassChime = ctx.createBiquadFilter();
          lowpassChime.type = "lowpass";
          lowpassChime.frequency.value = 800; // Limits harsh frequencies to maximize relaxation

          oscSine.connect(lowpassChime);
          oscTriChime.connect(lowpassChime);
          lowpassChime.connect(chimeGain);
          
          // Stereo spatial layout simulation via an eco feedback delay loop
          const delayNode = ctx.createDelay();
          delayNode.delayTime.value = 0.35;
          const feedbackNode = ctx.createGain();
          feedbackNode.gain.value = 0.25;

          chimeGain.connect(masterGain); // Direct dry signal

          chimeGain.connect(delayNode);
          delayNode.connect(feedbackNode);
          feedbackNode.connect(delayNode); // feedback loop
          feedbackNode.connect(masterGain); // Delayed wet signal

          oscSine.start(now);
          oscTriChime.start(now);
          oscSine.stop(now + 6.0);
          oscTriChime.stop(now + 6.0);
          
          synthSourcesRef.current.push(oscSine);
          synthSourcesRef.current.push(oscTriChime);
        };

        triggerPianoChime();
        const pianoChimeTimer = setInterval(() => {
          if (Math.random() > 0.1) {
            triggerPianoChime();
          }
        }, 4500);
        synthIntervalsRef.current.push(pianoChimeTimer);

      } else if (category === "beats") {
        // Slow Lo-Fi organic rhythm & soothing backing progression chords
        const loungeChords = [
          [164.81, 196.00, 246.94, 293.66, 369.99], // Em9 chord
          [146.83, 174.61, 220.00, 261.63, 311.13]  // Dmaj7-9 chord
        ];

        // Vinyl record soft dust crackle layer
        const crackleSize = ctx.sampleRate * 0.8;
        const crackleBuffer = ctx.createBuffer(1, crackleSize, ctx.sampleRate);
        const crackleData = crackleBuffer.getChannelData(0);
        for (let i = 0; i < crackleSize; i++) {
          const isDust = Math.random() > 0.9996;
          crackleData[i] = isDust ? (Math.random() * 0.24 - 0.12) : (Math.random() * 0.008 - 0.004);
        }

        const crackleSource = ctx.createBufferSource();
        crackleSource.buffer = crackleBuffer;
        crackleSource.loop = true;

        const crackleFilter = ctx.createBiquadFilter();
        crackleFilter.type = "bandpass";
        crackleFilter.frequency.value = 2800;
        crackleFilter.Q.value = 0.7;

        const crackleGain = ctx.createGain();
        crackleGain.gain.value = 0.015; // Vintage atmosphere

        crackleSource.connect(crackleFilter);
        crackleFilter.connect(crackleGain);
        crackleGain.connect(masterGain);
        crackleSource.start(0);
        synthSourcesRef.current.push(crackleSource);

        // Sequence Beats (60 BPM -> 500ms intervals)
        let step = 0;
        const triggerSequenceStep = () => {
          const now = ctx.currentTime;

          // Warm deep baseline groove
          if (step % 4 === 0) {
            const bassOsc = ctx.createOscillator();
            bassOsc.type = "sine";
            bassOsc.frequency.value = step % 8 === 0 ? 82.4 : 73.4;
            const bassGain = ctx.createGain();
            bassGain.gain.setValueAtTime(0, now);
            bassGain.gain.linearRampToValueAtTime(0.12, now + 0.09);
            bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

            bassOsc.connect(bassGain);
            bassGain.connect(masterGain);
            bassOsc.start(now);
            bassOsc.stop(now + 0.9);
            synthSourcesRef.current.push(bassOsc);
          }

          // Smooth low frequency Kick drum
          if (step % 4 === 0 || (step % 8 === 3 && Math.random() > 0.6)) {
            const kickOsc = ctx.createOscillator();
            const kickGain = ctx.createGain();
            kickOsc.type = "sine";

            kickOsc.frequency.setValueAtTime(120, now);
            kickOsc.frequency.exponentialRampToValueAtTime(40, now + 0.11);

            kickGain.gain.setValueAtTime(0, now);
            kickGain.gain.linearRampToValueAtTime(0.22, now + 0.006);
            kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

            kickOsc.connect(kickGain);
            kickGain.connect(masterGain);
            kickOsc.start(now);
            kickOsc.stop(now + 0.2);
            synthSourcesRef.current.push(kickOsc);
          }

          // Brushed acoustic snare/clap simulator
          if (step % 4 === 2) {
            const snareSize = ctx.sampleRate * 0.1;
            const snareBuffer = ctx.createBuffer(1, snareSize, ctx.sampleRate);
            const snareData = snareBuffer.getChannelData(0);
            for (let i = 0; i < snareSize; i++) {
              snareData[i] = Math.random() * 2 - 1;
            }

            const snareSource = ctx.createBufferSource();
            snareSource.buffer = snareBuffer;

            const snareFilter = ctx.createBiquadFilter();
            snareFilter.type = "bandpass";
            snareFilter.frequency.value = 1000;
            snareFilter.Q.value = 1.2;

            const snareG = ctx.createGain();
            snareG.gain.setValueAtTime(0, now);
            snareG.gain.linearRampToValueAtTime(0.05, now + 0.005);
            snareG.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

            snareSource.connect(snareFilter);
            snareFilter.connect(snareG);
            snareG.connect(masterGain);

            snareSource.start(now);
            snareSource.stop(now + 0.12);
            synthSourcesRef.current.push(snareSource);
          }

          // Relaxing Rhodes chords progressions
          if (step % 8 === 0) {
            const selectedChords = loungeChords[step === 0 ? 0 : 1];
            selectedChords.forEach(pitch => {
              const rhodesOsc = ctx.createOscillator();
              rhodesOsc.type = "triangle";
              rhodesOsc.frequency.value = pitch;

              const rGain = ctx.createGain();
              rGain.gain.setValueAtTime(0, now);
              rGain.gain.linearRampToValueAtTime(0.025, now + 0.12); // Velvet envelope
              rGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

              const rFilter = ctx.createBiquadFilter();
              rFilter.type = "lowpass";
              rFilter.frequency.value = 450; // Lowpass filter for smooth frequency response

              rhodesOsc.connect(rFilter);
              rFilter.connect(rGain);
              rGain.connect(masterGain);

              rhodesOsc.start(now);
              rhodesOsc.stop(now + 3.0);
              synthSourcesRef.current.push(rhodesOsc);
            });
          }

          step = (step + 1) % 16;
        };

        triggerSequenceStep();
        const sequenceTimer = setInterval(triggerSequenceStep, 500);
        synthIntervalsRef.current.push(sequenceTimer);
      }
    } catch (e) {
      console.error("Synthesizer could not boot:", e);
      triggerNotification("Synthesizer error: Audio is temporarily blocked by sandboxing.");
    }
  };

  // CONTROL PLAYBACK ACTIONS
  useEffect(() => {
    if (isPlaying) {
      if (audioMode === "synth") {
        if (audioRef.current) {
          try { audioRef.current.pause(); } catch (e) {}
        }
        startSynthesizer(selectedCategory);
      } else {
        stopSynthesizer();
        
        if (!audioRef.current) {
          audioRef.current = new Audio(activeTrack.url);
          audioRef.current.loop = true;
        } else {
          try { audioRef.current.pause(); } catch (e) {}
          audioRef.current.src = activeTrack.url;
          audioRef.current.loop = true;
          audioRef.current.load();
        }

        const audio = audioRef.current;
        audio.volume = isMuted ? 0 : volume;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onDurationChange = () => setTrackDuration(audio.duration || 600);
        const onAudioError = (err: any) => {
          console.warn("Audio stream loading issue, shifting gracefully to the synthesizer:", err);
          setAudioMode("synth");
          triggerNotification("Stream server block detected. Switched to offline synthesizer mode!");
          startSynthesizer(selectedCategory);
        };

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("durationchange", onDurationChange);
        audio.addEventListener("error", onAudioError);

        audio.play().catch(e => {
          console.warn("Iframe player blocks remote audios. Moving to local synthesis:", e);
          triggerNotification("Remote audio player blocked. Initializing client-side synthesizer!");
          setAudioMode("synth");
          startSynthesizer(selectedCategory);
        });

        return () => {
          audio.removeEventListener("timeupdate", onTimeUpdate);
          audio.removeEventListener("durationchange", onDurationChange);
          audio.removeEventListener("error", onAudioError);
        };
      }
    } else {
      stopSynthesizer();
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch (e) {}
      }
    }
  }, [isPlaying, selectedCategory, currentTrackIndex, audioMode]);

  // Handle synthesized timeline ticking
  useEffect(() => {
    let mockTick: any = null;
    if (isPlaying && audioMode === "synth") {
      mockTick = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= trackDuration) return 0;
          return prev + 1;
        });
      }, 1000);
    } else if (!isPlaying) {
      clearInterval(mockTick);
    }
    return () => clearInterval(mockTick);
  }, [isPlaying, audioMode, trackDuration]);

  // Instantly apply volume adjustments
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    if (synthMasterGainRef.current) {
      synthMasterGainRef.current.gain.value = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Reset timeline on category/track switch
  useEffect(() => {
    setCurrentTime(0);
  }, [selectedCategory, currentTrackIndex, audioMode]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Skip Forward/Backward logic (Next track in stream mode, toggle category in synth mode)
  const handleNext = () => {
    if (audioMode === "stream") {
      setCurrentTrackIndex(prev => {
        const nextIdx = prev + 1;
        return nextIdx >= filteredTracks.length ? 0 : nextIdx;
      });
      triggerNotification("Loading next relax track...");
    } else {
      // Toggle category
      setSelectedCategory(prev => (prev === "piano" ? "beats" : "piano"));
      triggerNotification(`Changing synth category to ${selectedCategory === "piano" ? "Relaxing Beats" : "Piano Focus"}...`);
    }
  };

  const handlePrev = () => {
    if (audioMode === "stream") {
      setCurrentTrackIndex(prev => {
        const prevIdx = prev - 1;
        return prevIdx < 0 ? filteredTracks.length - 1 : prevIdx;
      });
      triggerNotification("Seeking previous track...");
    } else {
      // Toggle category
      setSelectedCategory(prev => (prev === "piano" ? "beats" : "piano"));
      triggerNotification(`Changing synth category to ${selectedCategory === "piano" ? "Relaxing Beats" : "Piano Focus"}...`);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioMode === "stream" && audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  // POMODORO CLOCK TIMER LOGIC
  const triggerCycleChime = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const chimeCtx = new AudioCtxClass();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Beautiful C Major chord chime
      
      notes.forEach((freq, i) => {
        const osc = chimeCtx.createOscillator();
        const decayGain = chimeCtx.createGain();
        osc.connect(decayGain);
        decayGain.connect(chimeCtx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, chimeCtx.currentTime + i * 0.08);

        decayGain.gain.setValueAtTime(0, chimeCtx.currentTime);
        decayGain.gain.linearRampToValueAtTime(0.18, chimeCtx.currentTime + i * 0.08 + 0.03);
        decayGain.gain.exponentialRampToValueAtTime(0.001, chimeCtx.currentTime + i * 0.08 + 0.95);

        osc.start(chimeCtx.currentTime + i * 0.08);
        osc.stop(chimeCtx.currentTime + i * 0.08 + 0.95);
      });
    } catch (err) {
      console.warn("Chime error:", err);
    }
  };

  useEffect(() => {
    let ticker: any = null;
    if (timerIsActive) {
      ticker = setInterval(() => {
        setTimerSecondsLeft(prev => {
          if (prev <= 1) {
            triggerCycleChime();
            if (timerMode === "study") {
              setTimerMode("break");
              setTotalTimerCycles(c => c + 1);
              triggerNotification("Fabulous! Study focus block reached. Take a 5 min breather!");
              return 5 * 60; // 5 min break
            } else {
              setTimerMode("study");
              triggerNotification("Breather over! Shifting back to concentration focus template.");
              return 25 * 60; // 25 min focus
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(ticker);
  }, [timerIsActive, timerMode]);

  const toggleTimer = () => {
    setTimerIsActive(!timerIsActive);
  };

  const resetTimer = () => {
    setTimerIsActive(false);
    setTimerSecondsLeft(timerMode === "study" ? 25 * 60 : 5 * 60);
  };

  const triggerManualTimerMode = (mode: "break" | "study") => {
    setTimerIsActive(false);
    setTimerMode(mode);
    setTimerSecondsLeft(mode === "study" ? 25 * 60 : 5 * 60);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Prevent background sounds from leaking when unmounted
  useEffect(() => {
    return () => {
      stopSynthesizer();
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch (e) {}
        audioRef.current = null;
      }
    };
  }, []);

  const activeCategoryObject = STUDY_CATEGORIES.find(c => c.id === selectedCategory) || STUDY_CATEGORIES[0];

  return (
    <>
      {/* FOCUS ENVIRONMENT SCREEN OVERLAY DIMMER */}
      <AnimatePresence>
        {isFocusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-lg pointer-events-none z-35"
            id="focus-backdrop-layer-dimmer"
          />
        )}
      </AnimatePresence>

      {/* Floating alert prompts */}
      <AnimatePresence>
        {helpNotification && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-55 max-w-sm p-4 bg-slate-900 border border-indigo-500/50 text-indigo-200 text-xs font-bold rounded-2xl shadow-2xl flex items-center gap-3"
            id="live-notification"
          >
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 animate-pulse" />
            <span>{helpNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING COMPANION CARD */}
      <div 
        className="fixed bottom-6 right-6 z-50 font-sans select-none"
        id="floating-focus-companion-host"
      >
        <AnimatePresence mode="wait">
          {isMinimized ? (
            /* COLLAPSED BAR */
            <motion.div
              key="minimized-pill"
              initial={{ scale: 0.8, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 25 }}
              whileHover={{ scale: 1.02 }}
              className="px-4 py-3 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-slate-800 text-white shadow-2xl flex items-center gap-3 w-80 cursor-pointer"
              onClick={() => setIsMinimized(false)}
            >
              <div 
                className={`w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center transition shrink-0 ${isPlaying ? "animate-pulse" : ""}`}
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                title={isPlaying ? "Pause music flow" : "Resume music flow"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white text-white" /> : <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />}
              </div>

              <div className="flex-grow min-w-0 pr-1 text-left">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <Music className={`w-3.5 h-3.5 text-indigo-400 shrink-0 ${isPlaying ? "animate-bounce" : ""}`} />
                  <span className="text-xs font-black truncate text-white">
                    {audioMode === "synth" ? `Synth: ${activeCategoryObject.name}` : activeTrack.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400 font-semibold truncate shrink-0">
                    {audioMode === "synth" ? "Procedural loop" : activeTrack.artist}
                  </span>
                  <span className="text-[10px] inline-flex items-center gap-1 px-1.5 py-0.25 rounded bg-indigo-500/10 text-indigo-300 font-mono">
                    <Clock className="w-2.5 h-2.5" />
                    {formatTimer(timerSecondsLeft)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Expand Focus Tools"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* MAXIMIZED HUB COMPONENT */
            <motion.div
              key="maximized-panel"
              initial={{ scale: 0.93, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 40 }}
              className="w-92 rounded-3xl backdrop-blur-2xl bg-slate-950/95 border border-slate-800 text-white shadow-2xl overflow-hidden"
            >
              {/* BRAND HEADER */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-white/5 bg-gradient-to-r from-slate-950/40 to-indigo-950/40">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
                    <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                  </span>
                  <div className="text-left font-sans">
                    <h4 className="text-xs font-extrabold tracking-wider uppercase font-mono text-indigo-300">
                      STUDY COMPANION HUB
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium">Binaural Chimes & Beats</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => {
                        setAudioMode("synth");
                        triggerNotification("Offline Synthesizer Active (Zero network lag!)");
                    }}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${audioMode === "synth" ? "bg-indigo-650 bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
                    title="Procedural sound synthesizer built with browser WebAudio API"
                  >
                    Synth
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                        setAudioMode("stream");
                        triggerNotification("Live Radio Streaming (Requires Internet network stream)");
                    }}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${audioMode === "stream" ? "bg-indigo-650 bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
                    title="Continuous High-fidelity royalty-free MP3 streams"
                  >
                    Radio
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                  title="Minimize Hub"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>

              {/* CARD SLOTS */}
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
                
                {/* 1. POMODORO SYSTEM BOX */}
                <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 text-center space-y-3 relative overflow-hidden">
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <Flame className="w-2.5 h-2.5 animate-pulse" />
                    Cycles: {totalTimerCycles}
                  </div>

                  <div className="flex justify-center gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => triggerManualTimerMode("study")}
                      className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                        timerMode === "study"
                          ? "bg-indigo-600 text-white shadow-md font-extrabold"
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      25m Focus
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerManualTimerMode("break")}
                      className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                        timerMode === "break"
                          ? "bg-emerald-600 text-white shadow-md font-extrabold"
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      }`}
                    >
                      <Coffee className="w-3.5 h-3.5" />
                      5m Break
                    </button>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-4xl font-extrabold tracking-widest font-mono block text-white select-none">
                      {formatTimer(timerSecondsLeft)}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                      {timerMode === "study" ? "⏱️ Concentrate & Study Now" : "🐾 Recharging Brain cells"}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={toggleTimer}
                      className={`px-5 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition w-36 shadow-lg cursor-pointer ${
                        timerIsActive
                          ? "bg-amber-600 hover:bg-amber-700 text-white"
                          : timerMode === "study"
                          ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                          : "bg-emerald-500 hover:bg-emerald-600 text-white"
                      }`}
                    >
                      {timerIsActive ? "Pause Timer" : "Start Focus"}
                    </button>
                    <button
                      type="button"
                      onClick={resetTimer}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
                      title="Reset Timer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 2. FOCUS MODE TOGGLE */}
                <button
                  type="button"
                  onClick={() => setIsFocusMode(!isFocusMode)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isFocusMode
                      ? "bg-indigo-950/70 border-indigo-500/60 text-indigo-200 shadow-lg shadow-indigo-900/10"
                      : "bg-slate-900/30 border-white/5 hover:border-white/10 hover:bg-slate-900/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl transition-colors ${isFocusMode ? "bg-indigo-500/30 text-indigo-300 animate-pulse" : "bg-slate-800 text-slate-400"}`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="text-left font-sans">
                      <span className="text-xs font-black block">
                        {isFocusMode ? "Focus Mode Active" : "Enable Focus Mode"}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {isFocusMode ? "Backlight dimmed. Distractions hidden." : "Maximize core cognitive focus on lessons."}
                      </span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${isFocusMode ? "bg-indigo-500 border-indigo-400 text-white" : "border-slate-800 text-transparent"}`}>
                    {isFocusMode ? <Check className="w-3 h-3" /> : ""}
                  </div>
                </button>

                {/* 3. CATEGORIES SELECTOR SECTION */}
                <div className="space-y-2 text-left bg-slate-900/30 p-3.5 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[10px] uppercase tracking-wider font-extrabold font-mono">
                      Category Selection
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowTrackList(!showTrackList)}
                      className="text-[10px] text-indigo-450 text-indigo-400 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      {showTrackList ? "Collapse" : "Expand"}
                      {showTrackList ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showTrackList && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-2 gap-2 overflow-hidden py-0.5"
                        id="categories-selector-grid"
                      >
                        {STUDY_CATEGORIES.map(category => (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(category.id as "piano" | "beats");
                              setCurrentTrackIndex(0);
                            }}
                            className={`flex flex-col items-start p-2.5 rounded-2xl text-left border transition-all cursor-pointer ${
                              selectedCategory === category.id
                                ? "bg-indigo-950/80 border-indigo-500 text-indigo-200 shadow-lg"
                                : "bg-slate-900/40 border-white/5 hover:bg-slate-900/80 hover:border-white/10 text-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 w-full">
                              <span className="text-sm shrink-0">{category.icon}</span>
                              <span className="text-[11px] font-black truncate">{category.name}</span>
                            </div>
                            <span className="text-[8.5px] text-slate-400 truncate w-full mt-1 shrink-0">
                              {category.desc}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. TRACKS DIRECTORY LIST (WHEN STREAM MODE ACTIVE) */}
                {audioMode === "stream" && (
                  <div className="space-y-2 text-left bg-slate-900/30 p-3.5 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider font-extrabold font-mono">
                        {selectedCategory === "piano" ? "🎹 Premium Piano Tracks" : "🎵 Relaxing Beats Tracks"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowSubTracks(!showSubTracks)}
                        className="text-[10px] text-indigo-400 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                      >
                        {showSubTracks ? "Collapse List" : "Show Tracks"}
                        {showSubTracks ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showSubTracks && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5 overflow-hidden max-h-36 overflow-y-auto custom-scrollbar text-xs"
                        >
                          {filteredTracks.map((track, idx) => (
                            <button
                              key={track.id}
                              type="button"
                              onClick={() => {
                                setCurrentTrackIndex(idx);
                                if (!isPlaying) setIsPlaying(true);
                              }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all ${
                                currentTrackIndex === idx
                                  ? "bg-indigo-650/40 border border-indigo-500/30 text-indigo-200 font-bold"
                                  : "bg-slate-900/20 border border-transparent hover:bg-slate-900/55 text-slate-305 text-slate-300"
                              }`}
                            >
                              <div className="w-5 h-5 rounded-lg bg-indigo-500/10 flex items-center justify-center text-[10px] font-bold tracking-tight text-indigo-300 shrink-0">
                                {idx + 1}
                              </div>
                              <div className="flex-grow min-w-0">
                                <p className="truncate text-[11px] font-black">{track.title}</p>
                                <p className="truncate text-[9px] text-slate-400">{track.artist}</p>
                              </div>
                              {currentTrackIndex === idx && isPlaying && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping grow-0 shrink-0" />
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* 5. ACTIVE CHASSIS */}
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/70 border border-white/5 rounded-2xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-950 border border-indigo-500/25 flex items-center justify-center relative shrink-0">
                      <Music className={`w-4.5 h-4.5 text-indigo-300 ${isPlaying ? "animate-bounce" : ""}`} />
                    </div>
                    <div className="flex-grow min-w-0 text-left">
                      <h5 className="text-[12px] font-black truncate text-white">
                        {audioMode === "synth" ? `Procedural: ${activeCategoryObject.name}` : activeTrack.title}
                      </h5>
                      <span className="text-[10px] text-indigo-305 text-indigo-300 font-bold tracking-wide truncate block mt-0.5 font-mono">
                        {audioMode === "synth" ? activeCategoryObject.desc : activeTrack.artist}
                      </span>
                    </div>
                  </div>

                  {/* Range Slider */}
                  <div className="space-y-1">
                    <input
                      type="range"
                      min={0}
                      max={trackDuration}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full accent-indigo-500 bg-slate-800 h-1 rounded-lg cursor-pointer shrink-0"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                      <span>{formatTimer(Math.round(currentTime))}</span>
                      <span>{formatTimer(Math.round(trackDuration))}</span>
                    </div>
                  </div>

                  {/* BOTTOM REPLAY CONTROLLERS */}
                  <div className="flex items-center justify-between pt-1">
                    {/* Volume */}
                    <div className="flex items-center gap-2 w-28 shrink-0">
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-slate-400 hover:text-white transition cursor-pointer"
                        title={isMuted ? "Unmute Volume" : "Mute Volume"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-rose-450 text-rose-400" />
                        ) : volume > 0.65 ? (
                          <Volume2 className="w-4 h-4 text-indigo-405 text-indigo-450" />
                        ) : volume > 0.15 ? (
                          <Volume1 className="w-4 h-4 text-slate-300" />
                        ) : (
                          <VolumeX className="w-4 h-4 text-slate-500" />
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(parseFloat(e.target.value));
                          setIsMuted(false);
                        }}
                        className="w-full accent-indigo-450 h-1 bg-slate-800 rounded-lg cursor-pointer shrink-0"
                        title={`Vol: ${Math.round(volume * 100)}%`}
                      />
                    </div>

                    {/* Left/Right switches */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white transition hover:bg-white/5 cursor-pointer"
                        title={audioMode === "stream" ? "Previous Track" : "Previous Category"}
                      >
                        <SkipBack className="w-4.5 h-4.5 shrink-0" />
                      </button>

                      <button
                        type="button"
                        onClick={togglePlay}
                        className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition shadow-lg shadow-indigo-600/20 flex items-center justify-center h-10 w-10 cursor-pointer shrink-0"
                        title={isPlaying ? "Pause Flow" : "Play Flow"}
                      >
                        {isPlaying ? <Pause className="w-4.5 h-4.5 fill-white text-white" /> : <Play className="w-4.5 h-4.5 fill-white text-white translate-x-0.25" />}
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white transition hover:bg-white/5 cursor-pointer"
                        title={audioMode === "stream" ? "Next Track" : "Next Category"}
                      >
                        <SkipForward className="w-4.5 h-4.5 shrink-0" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
