// contracts
export const PREMIUM_OBJECT_CONTRACT_ADDRESS = "0x9Ec892F342F16b0461CDC5C22C59732F2fb2022d";
export const FREE_OBJECT_CONTRACT_ADDRESS = "0x9FB8baA26cD19783021649467aaaC5cb17b0bEa1";
export const QUEST_OBJECT_CONTRACT_ADDRESS = "0x3b3a95705d36663d6cB032D9c8580f4a012d98B0";
export const WALLPAPER_CONTRACT_ADDRESS = "0x2eF398c8B8AA9E60A00A1Afc6949D90bCC064af5";
export const MAP_CONTRACT_ADDRESS = "0x7527Df2D12729D509693D70aD23374563b23Ca16";
export const REGISTRY_CONTRACT_ADDRESS = "0xEba617EF2E03c6f8ef34492a0472C55f1032a153";
export const CLAIM_CONTRACT_ADDRESS = "0x0F751Dd67ecd912697Bd0047C82746cf084Ae3a3";

// graph
export const ENS_GRAPH_ENDPOINT = "https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli";
export const REGISTRY_GRAPH_ENDPOINT = "https://api.thegraph.com/subgraphs/name/zak3939/goerliphiregistry";

// api
export const COUPON_API_GATEWAY = process.env.NEXT_PUBLIC_COUPON_API_GATEWAY || "";
export const UTILS_API_GATEWAY = process.env.NEXT_PUBLIC_UTILS_API_GATEWAY || "";

// app
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "";
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || "";
export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";
export const MAINTENANCE = process.env.NEXT_PUBLIC_MAINTENANCE || "";
export const LP_URL = "https://philand.xyz";
export const FAQ_URL = "https://phi-xyz.notion.site/FAQs-4251e3ef2d8048faa2e06410622a0c4a";
export const SURVEY_URL = "https://forms.gle/mCcnbT2nGp3Hwaxu6";
export const CANNY_URL = "https://philand.canny.io";
export const HIRING_URL = "https://phi-xyz.notion.site/Phi-is-hiring-d60930cfdfde405cb0767b77165da632";
export const PARTNERSHIP_APPLICATION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSesnViXpjx2fufQrDI26yBbvcyNxWU-DVm3DEUn5WhKAn4XBQ/viewform?usp=sf_link";
export const TWITTER_URL = "https://twitter.com/phi_xyz";

// localstorage
export const COLOR_MODE_KEY = "color_mode_key";
export const CURRENT_ENS_KEY = "current_ens_key";
export const HOW_IT_WORKS_KEY = "how_it_works_key";
export const QUICK_TOUR_KEY = "quick_tour_key";

// game
export const GAME_APP_WIDTH = 4000;
export const GAME_APP_HEIGHT = 4000;
export const TILE_W = 97 - 1;
export const TILE_H = 49 - 1;
export const LAND_W = 808;
export const LAND_H = 428;
export const LAND_OFFSET_X = 20;
export const LAND_OFFSET_Y = 9;
export const ROOM_TILE_N = 8;
export const LAND_OGP_W = 1200;
export const LAND_OGP_H = 630;
