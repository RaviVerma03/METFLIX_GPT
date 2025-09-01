export const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-60 md:top-1/4 aspect-video w-screen left-6 md:left-12 text-white z-30 max-w-[40%]">
      {/* <div className="absolute top-1/4 w-full sm:w-2/3 md:w-1/2 lg:w-[40%] px-6 sm:px-12 text-white z-30"> */}
      <h1 className="text-2xl md:text-5xl font-bold drop-shadow-xl">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg drop-shadow-lg line-clamp-5 mb-6">{overview}</p>
      <div className="flex gap-4 mt-4 md:m-0">
        <button className="bg-white text-black px-4 py-1 md:py-2 md:px-6 text-sm md:text-xl font-semibold rounded hover:bg-opacity-60 transition">
          ▶ Play
        </button>
        <button className="hidden md:inline-block bg-gray-700 text-white py-2 px-8 text-xl font-semibold rounded hover:bg-opacity-60 transition">
          {" "}
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};
