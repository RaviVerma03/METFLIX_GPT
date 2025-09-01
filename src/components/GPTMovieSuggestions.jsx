import React from "react";
import { useSelector } from "react-redux";
import { MovieList } from "./MovieList";

export const GPTMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.GPT);
  console.log(movieResults,movieNames);
  
  if (!movieNames) return null;
  return (
    <div className="p-4 md:p-6 mt-6 bg-black/60 backdrop-blur-md shadow-lg text-white">
      <div>
        {movieNames.map((title, index) => (
          <MovieList
            key={title}
            title={title}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};
