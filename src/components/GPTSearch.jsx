import { Background_IMG } from "../utils/Constant";
import { GPTMovieSuggestions } from "./GPTMovieSuggestions";
import { GPTSearchBar } from "./GPTSearchBar";

export const GPTSearch = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <img
          src={Background_IMG}
          alt="background-image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <GPTSearchBar />
        <GPTMovieSuggestions />
      </div>
    </div>
  );
};
