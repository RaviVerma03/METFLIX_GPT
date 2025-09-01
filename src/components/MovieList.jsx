import { MovieCard } from "./MovieCard";

export const MovieList = ({ title, movies }) => {
console.log(movies);

  return (
    <div className="py-4 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white"> {title} </h2>
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 md:gap-4">
          {!Array.isArray(movies) ? (
            <p>Loading or no movies available...</p>
          ) : (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                alt={movie.title}
                poster={movie.poster_path}
                rating={movie.vote_average}
                overview={movie.overview}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
