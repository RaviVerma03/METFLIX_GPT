import { useMovieTrailer } from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";
import { useState ,useRef,useEffect} from "react";
import MuteIcon from "../assets/mute_icon.png";
import UnMuteIcon from "../assets/unmute_icon.png";

export const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);
  const trailerVideo = useSelector((store) => store.movies?.runningTrailer);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!trailerVideo) return;

    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: trailerVideo.key,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: trailerVideo.key,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
          },
        },
      });
    };

    // Load YT API only once
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      document.body.appendChild(tag);
    } else {
      onYouTubeIframeAPIReady();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [trailerVideo]);

  const handleToggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  if (!trailerVideo) return null;

  return (
    <div className="w-screen aspect-video overflow-hidden relative">
      {/* YouTube Player */}
      <div className="w-full h-full">
        <div id="youtube-player" className="w-full h-full pointer-events-none"></div>
      </div>

      {/* Mute / Unmute Button */}
      <button
        onClick={handleToggleMute}
        className="absolute right-0 md:right-10 bottom-40 text-white p-3 rounded-full z-30"
      >
        <img src={isMuted ? MuteIcon : UnMuteIcon} className="w-16 h-16" alt="mute toggle" />
      </button>
    </div>
  );
};


// export const VideoBackground = ({ movieId }) => {
//   useMovieTrailer(movieId);
//   const trailerVideo = useSelector((store) => store.movies?.runningTrailer);
//   const [isMuted, setIsMuted] = useState(true);

//   if (!trailerVideo) return null;

//   const handleToggleMute = () => {
//     setIsMuted(!isMuted);
//   };

//   return (
//     <div className=" w-screen aspect-video overflow-hidden">
//       {/* Background Video */}
//       <div className="w-screen aspect-video">
//         <iframe
//           className="w-full h-full pointer-events-none"
//           src={`https://www.youtube.com/embed/${
//             trailerVideo.key
//           }?autoplay=1&mute=${
//             isMuted ? 1 : 0
//           }&controls=0&rel=0&showinfo=0&enablejsapi=1&loop=1&playlist=${
//             trailerVideo.key
//           }`}
//           title="YouTube video player"
//           allow="autoplay; encrypted-media"
//           allowFullScreen
//         ></iframe>
//       </div>

//       {/* Mute/Unmute button */}
//       <button
//         onClick={handleToggleMute}
//         className="absolute right-10 bottom-40 text-white p-3 rounded-full z-30"
//       >
//         <img src={isMuted ? MuteIcon : UnMuteIcon} className="w-16 h-16" />
//       </button>
//     </div>
//   );
// };
