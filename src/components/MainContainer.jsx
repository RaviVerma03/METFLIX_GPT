import { useSelector } from "react-redux";
import { VideoTitle } from "./VideoTitle";
import { VideoBackground } from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;
  const runningMovie = movies[1];

  const { title, overview } = runningMovie;

  return (
    <div className="pt-[34%] bg-black md:pt-0 relative w-full aspect-video">
      {/* Gradient just to make title readable */}
      <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black opacity-60 z-10"></div>

      <VideoTitle title={title} overview={overview} />
      <VideoBackground movieId={runningMovie.id} />
    </div>
  );
};

export default MainContainer;
