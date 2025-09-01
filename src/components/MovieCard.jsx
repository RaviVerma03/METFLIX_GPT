import { IMG_CDN_URL } from "../utils/Constant";

export const MovieCard = ({ poster, alt }) => {
  if (!poster) return null;
  return (
    <div className="w-32 md:w-36 flex-shrink-0 transform transition duration-300 hover:scale-105 hover:brightness-110">
      <img
        alt={alt}
        src={IMG_CDN_URL + poster}
        className="rounded-lg shadow-md object-cover h-[180px] md:h-[200px] w-full"
      />
    </div>
  );
};
