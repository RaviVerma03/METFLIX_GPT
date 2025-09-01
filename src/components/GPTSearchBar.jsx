import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/Constant";
import { addGPTMovieResults } from "../utils/GPTSlice";

export const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    //search movie in TMDB
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  async function handleGPTSearchSubmit() {
    console.log(searchText.current.value);
    //Make an API call to GPT API to get movie results
    const gptquery =
      "Act as a movie recommendation system and suggest some movies for the query" +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result:Welcome,Ready,Sultan,War,Kuch kuch hota hai";
    const gptResults = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: gptquery }],
    });

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    //For each movie I'll search TMDB
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGPTMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  }

  return (
    <div className="flex justify-center items-center px-2 md:px-4 pt-[48%] md:pt-[10%]">
      <form
        //className="w-full md:w-1/2 max-w-2xl bg-black/80 backdrop-blur-md rounded-xl p-6 grid grid-cols-12 gap-4 shadow-xl"
        className="w-full max-w-md md:max-w-2xl bg-black/80 backdrop-blur-md rounded-xl p-4 md:p-6 flex flex-col md:grid grid-cols-12 gap-3 shadow-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="col-span-9 p-4 rounded-lg text-lg text-white bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder={lang[langKey].GPTSearchPlaceholder}
          ref={searchText}
        />
        <button
          type="submit"
          className="col-span-3 bg-red-700 hover:bg-red-800 text-white text-lg font-semibold rounded-lg px-4 py-2 transition duration-200"
          onClick={handleGPTSearchSubmit}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
