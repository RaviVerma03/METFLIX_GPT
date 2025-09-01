import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addRunningTrailer } from "../utils/movieSlice";

export const useMovieTrailer = (movieId) => {
  //fetch running trailer video and update the store with running trailer video
  const dispatch = useDispatch();
  const runningTrailer = useSelector((store) => store.runningTrailer);

  const getMovieTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();

    const filterTrailers = json.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterTrailers.length ? filterTrailers[0] : json.results[0];

    dispatch(addRunningTrailer(trailer));
  };

  useEffect(() => {
    if (!runningTrailer) {
      getMovieTrailer();
    }
  }, []);
};
