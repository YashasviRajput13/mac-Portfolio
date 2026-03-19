import React, { useState, useRef, useEffect } from "react";
import { music } from "~/configs";
import { useStore } from "~/stores";

interface SpotifyState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  currentTrack: {
    title: string;
    artist: string;
    cover: string;
    audio: string;
  };
}

const tracks = [
  {
    title: "Sunflower",
    artist: "Post Malone / Swae Lee",
    cover: "//p1.music.126.net/z0IO1vEsowL9mD_5yzUjeA==/109951163936068098.jpg",
    audio: "music/sunflower.mp3"
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "//p2.music.126.net/qeSMf1qz4gD1-0T_qE5h7A==/109951165628267361.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    cover: "//p1.music.126.net/5y5L3qKjN8Q4R2H8oP0m7g==/109951165628267362.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    cover: "//p3.music.126.net/T4O3_2o2L_9q8l5wX6yZ7A==/109951165628267363.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    title: "Believer",
    artist: "Imagine Dragons",
    cover: "//p4.music.126.net/A7B8C9D0E1F2G3H4I5J6K==/109951165628267364.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    title: "Senorita",
    artist: "Shawn Mendes / Camila Cabello",
    cover: "//p5.music.126.net/L7M8N9O0P1Q2R3S4T5U6V==/109951165628267365.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    title: "Kesariya",
    artist: "Pritam / Arijit Singh",
    cover: "//p1.music.126.net/B7C8D9E0F1G2H3I4J5K6L==/109951165628267366.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    title: "Tere Vaaste",
    artist: "Sachin-Jigar / Arijit Singh",
    cover: "//p2.music.126.net/C7D8E9F0G1H2I3J4K5L6M==/109951165628267367.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    title: "Jhoome Jo Pathaan",
    artist: "Vishal-Shekhar / Arijit Singh",
    cover: "//p3.music.126.net/D7E8F9G0H1I2J3K4L5M6N==/109951165628267368.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    title: "O Bedardeya",
    artist: "Pritam / Arijit Singh",
    cover: "//p4.music.126.net/E7F8G9H0I1J2K3L4M5N6O==/109951165628267369.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  },
  {
    title: "Raataan Lambiyan",
    artist: "Tanishk Bagchi / Jubin Nautiyal",
    cover: "//p5.music.126.net/F7G8H9I0J1K2L3M4N5O6P==/109951165628267370.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  },
  {
    title: "Srivalli",
    artist: "Devi Sri Prasad / Sid Sriram",
    cover: "//p1.music.126.net/G7H8I9J0K1L2M3N4O5P6Q==/109951165628267371.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
  }
];

export default function Spotify() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<SpotifyState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isLoading: true,
    currentTrack: tracks[0]
  });

  const { dark } = useStore((state) => ({ dark: state.dark }));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0
      }));
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleLoadStart = () => {
      setState((prev) => ({ ...prev, duration: 0, currentTime: 0, isLoading: true }));
    };

    const handleCanPlay = () => {
      // Update duration when audio can play
      if (audio.duration && !isNaN(audio.duration)) {
        setState((prev) => ({
          ...prev,
          duration: audio.duration,
          isLoading: false
        }));
      }
    };

    const handleError = () => {
      setState((prev) => ({ ...prev, isLoading: false }));
      console.error("Audio loading error");
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("error", handleError);

    // Load initial audio
    audio.load();

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // Initialize audio source when component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && state.currentTrack.audio) {
      audio.src = state.currentTrack.audio;
      audio.load();
    }
  }, [state.currentTrack.audio]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (state.isPlaying) {
        audio.pause();
        setState((prev) => ({ ...prev, isPlaying: false }));
      } else {
        // Set audio source if not set
        if (
          !audio.src ||
          audio.src !== window.location.origin + "/" + state.currentTrack.audio
        ) {
          audio.src = state.currentTrack.audio;
        }

        // Ensure audio is loaded
        if (audio.readyState === 0) {
          await new Promise((resolve) => {
            const handleCanPlay = () => {
              audio.removeEventListener("canplay", handleCanPlay);
              resolve(void 0);
            };
            audio.addEventListener("canplay", handleCanPlay);
            audio.load();
          });
        }

        // Try to play
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          setState((prev) => ({ ...prev, isPlaying: true }));
        }
      }
    } catch (error) {
      console.error("Audio play error:", error);
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex(
      (track) => track.title === state.currentTrack.title
    );
    const nextIndex = (currentIndex + 1) % tracks.length;
    const nextTrack = tracks[nextIndex];

    const audio = audioRef.current;
    if (audio) {
      // Pause current audio
      audio.pause();

      // Update state first
      setState((prev) => ({
        ...prev,
        currentTrack: nextTrack,
        currentTime: 0,
        isPlaying: false
      }));

      // Load new audio and auto-play if was playing
      audio.src = nextTrack.audio;
      audio.load();

      // Auto-play new track if previous was playing
      if (state.isPlaying) {
        setTimeout(() => {
          audio.play().catch((error) => console.error("Auto-play error:", error));
          setState((prev) => ({ ...prev, isPlaying: true }));
        }, 100);
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = tracks.findIndex(
      (track) => track.title === state.currentTrack.title
    );
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    const prevTrack = tracks[prevIndex];

    const audio = audioRef.current;
    if (audio) {
      // Pause current audio
      audio.pause();

      // Update state first
      setState((prev) => ({
        ...prev,
        currentTrack: prevTrack,
        currentTime: 0,
        isPlaying: false
      }));

      // Load new audio and auto-play if was playing
      audio.src = prevTrack.audio;
      audio.load();

      // Auto-play new track if previous was playing
      if (state.isPlaying) {
        setTimeout(() => {
          audio.play().catch((error) => console.error("Auto-play error:", error));
          setState((prev) => ({ ...prev, isPlaying: true }));
        }, 100);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setState((prev) => ({ ...prev, currentTime: newTime }));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setState((prev) => ({ ...prev, volume: newVolume }));
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`spotify h-full flex flex-col ${dark ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <audio ref={audioRef} src={state.currentTrack.audio} />

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" fill="#1DB954" />
              <path
                d="M6 12C6 12 6 9 12 9C18 9 18 12 18 12"
                stroke="black"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M5 15C5 15 5 12 12 12C19 12 19 15 19 15"
                stroke="black"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M4 18C4 18 4 15 12 15C20 15 20 18 20 18"
                stroke="black"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-semibold text-green-500">Spotify</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-700 rounded transition-colors">
            <span className="i-material-symbols:minimize text-lg" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded transition-colors">
            <span className="i-material-symbols:close text-lg" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Album Cover */}
        <div className="relative mb-8">
          <img
            src={state.currentTrack.cover}
            alt={state.currentTrack.title}
            className="w-64 h-64 rounded-lg shadow-2xl object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjMjEyMTIxIi8+CjxwYXRoIGQ9Ik0xMjggNEMxOTkuMjEgNCAyNTYgNjAuNzkgMjU2IDEzMkMyNTYgMjAzLjIxIDE5OS4yMSAyNTYgMTI4IDI1NkM1Ni43OSAyNTYgNCAxOTkuMjEgNCAxMzJDNCA2MC43OSA1Ni43OSA0IDEyOCA0Wk0xMjggMjIwQzE3Ny41IDIyMCAyMTggMTc3LjUgMjE4IDEyOEMyMTggNzguNSAxNzcuNSAzNiAxMjggMzZDNzguNSAzNiAzNiA3OC41IDM2IDEyOEMzNiAxNzcuNSA3OC41IDIyMCAxMjggMjIwWiIgZmlsbD0iIzFFQTFFMSIvPgo8L3N2Zz4K";
            }}
          />
          {state.isPlaying && (
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          )}
          {state.isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{state.currentTrack.title}</h2>
          <p className="text-gray-400">{state.currentTrack.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(state.currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={state.duration || 0}
              value={state.currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${(state.currentTime / state.duration) * 100}%, #4B4B4B ${(state.currentTime / state.duration) * 100}%, #4B4B4B 100%)`
              }}
            />
            <span className="text-xs text-gray-400 w-10">
              {formatTime(state.duration)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-6 mb-6">
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <span className="i-material-symbols:skip-previous text-2xl" />
          </button>
          <button
            onClick={togglePlayPause}
            className="p-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
          >
            {state.isPlaying ? (
              <span className="i-material-symbols:pause text-3xl text-white" />
            ) : (
              <span className="i-material-symbols:play-arrow text-3xl text-white ml-1" />
            )}
          </button>
          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <span className="i-material-symbols:skip-next text-2xl" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 w-full max-w-xs">
          <span className="i-material-symbols:volume-up text-lg" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={state.volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${state.volume * 100}%, #4B4B4B ${state.volume * 100}%, #4B4B4B 100%)`
            }}
          />
          <span className="text-xs text-gray-400 w-8">
            {Math.round(state.volume * 100)}%
          </span>
        </div>
      </div>

      {/* Playlist Preview */}
      <div className="border-t border-gray-700 p-4">
        <h3 className="font-semibold mb-3">Playlist</h3>
        <div className="space-y-1">
          <div className="text-xs text-gray-400 font-medium mb-2">🇬🇧 English Hits</div>
          {tracks.slice(0, 6).map((track, index) => (
            <div
              key={track.title}
              className={`flex items-center space-x-3 p-2 rounded cursor-pointer hover:bg-gray-800 ${
                track.title === state.currentTrack.title ? "bg-gray-800" : ""
              }`}
              onClick={() => {
                if (track.title !== state.currentTrack.title) {
                  const audio = audioRef.current;
                  if (audio) {
                    // Pause current audio
                    audio.pause();

                    // Update state first
                    setState((prev) => ({
                      ...prev,
                      currentTrack: track,
                      currentTime: 0,
                      isPlaying: false
                    }));

                    // Load new audio and auto-play if was playing
                    audio.src = track.audio;
                    audio.load();

                    // Auto-play new track if previous was playing
                    if (state.isPlaying) {
                      setTimeout(() => {
                        audio
                          .play()
                          .catch((error) => console.error("Auto-play error:", error));
                        setState((prev) => ({ ...prev, isPlaying: true }));
                      }, 100);
                    }
                  }
                }
              }}
            >
              <img
                src={track.cover}
                alt={track.title}
                className="w-10 h-10 rounded object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMjEyMTIxIi8+CjxwYXRoIGQ9Ik0yMCA0QzMxLjA0NTcgNCA0MCAxMi45NTQzIDQwIDI0QzQwIDM1LjA0NTcgMzEuMDQ1NyA0NCAyMCA0NEM4Ljk1NDMgNDQgMCAzNS4wNDU3IDAgMjRDMCAxMi45NTQzIDguOTU0MyA0IDIwIDRaTTIwIDM0QzI3LjczMTIgMzQgMzQgMjcuNzMxMiAzNCAyMEMzNCAxMi4yNjg4IDI3LjczMTIgNiAyMCA2QzEyLjI2ODggNiA2IDEyLjI2ODggNiAyMEM2IDI3LjczMTIgMTIuMjY4OCAzNCAyMCAzNFoiIGZpbGw9IiMxRUExRTEiLz4KPC9zdmc+Cg==";
                }}
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{track.title}</p>
                <p className="text-xs text-gray-400">{track.artist}</p>
              </div>
              {track.title === state.currentTrack.title && state.isPlaying && (
                <span className="i-material-symbols:equalizer text-green-500" />
              )}
            </div>
          ))}
          <div className="text-xs text-gray-400 font-medium mb-2 mt-4">🇮🇳 Hindi Hits</div>
          {tracks.slice(6).map((track, index) => (
            <div
              key={track.title}
              className={`flex items-center space-x-3 p-2 rounded cursor-pointer hover:bg-gray-800 ${
                track.title === state.currentTrack.title ? "bg-gray-800" : ""
              }`}
              onClick={() => {
                if (track.title !== state.currentTrack.title) {
                  const audio = audioRef.current;
                  if (audio) {
                    // Pause current audio
                    audio.pause();

                    // Update state first
                    setState((prev) => ({
                      ...prev,
                      currentTrack: track,
                      currentTime: 0,
                      isPlaying: false
                    }));

                    // Load new audio and auto-play if was playing
                    audio.src = track.audio;
                    audio.load();

                    // Auto-play new track if previous was playing
                    if (state.isPlaying) {
                      setTimeout(() => {
                        audio
                          .play()
                          .catch((error) => console.error("Auto-play error:", error));
                        setState((prev) => ({ ...prev, isPlaying: true }));
                      }, 100);
                    }
                  }
                }
              }}
            >
              <img
                src={track.cover}
                alt={track.title}
                className="w-10 h-10 rounded object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMjEyMTIxIi8+CjxwYXRoIGQ9Ik0yMCA0QzMxLjA0NTcgNCA0MCAxMi45NTQzIDQwIDI0QzQwIDM1LjA0NTcgMzEuMDQ1NyA0NCAyMCA0NEM4Ljk1NDMgNDQgMCAzNS4wNDU3IDAgMjRDMCAxMi45NTQzIDguOTU0MyA0IDIwIDRaTTIwIDM0QzI3LjczMTIgMzQgMzQgMjcuNzMxMiAzNCAyMEMzNCAxMi4yNjg4IDI3LjczMTIgNiAyMCA2QzEyLjI2ODggNiA2IDEyLjI2ODggNiAyMEM2IDI3LjczMTIgMTIuMjY4OCAzNCAyMCAzNFoiIGZpbGw9IiMxRUExRTEiLz4KPC9zdmc+Cg==";
                }}
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{track.title}</p>
                <p className="text-xs text-gray-400">{track.artist}</p>
              </div>
              {track.title === state.currentTrack.title && state.isPlaying && (
                <span className="i-material-symbols:equalizer text-green-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: #1DB954;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: #1DB954;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
