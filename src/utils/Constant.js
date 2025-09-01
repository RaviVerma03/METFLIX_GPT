
export const USER_AVATAR =
  "https://occ-0-5690-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229";
export const MY_AVATAR =
  "https://avatars.githubusercontent.com/u/94923607?u=ab6c8526a79e67371617763da246e728f2280ccf&amp;v=4&amp;size=64";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer " + import.meta.env.VITE_TMDB_KEY
  },
};


export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780";

export const Background_IMG =
  "https://assets.nflxext.com/ffe/siteui/vlv3/a927b1ee-784d-494a-aa80-cf7a062d2523/web/IN-en-20250714-TRIFECTA-perspective_5acb7337-c372-45ec-ae12-ddb110e6ad78_large.jpg";

export const SupportedLanguages = [
  {
    identifier: "en",
    name: "English",
  },
  {
    identifier: "hi",
    name: "Hindi",
  },
  {
    identifier: "ja",
    name: "Japanese",
  },
];

export const openAIKey = import.meta.env.VITE_OPENAI_KEY;