// contracts
export const PREMIUM_OBJECT_CONTRACT_ADDRESS = "0x224C48eECEbb6827b5409c745479c0172f7Bf209";
export const FREE_OBJECT_CONTRACT_ADDRESS = "0xb7e30fEc732323C3A0E944bbF17E3487c77a5C0F";
export const QUEST_OBJECT_CONTRACT_ADDRESS = "0x6BF13BA125a1dbefd24913B0C7FBb8a522Ecf173";
export const WALLPAPER_CONTRACT_ADDRESS = "0x7531A9b64bbA134dfa6bAF385439466b95352696";
export const MAP_CONTRACT_ADDRESS = "0xb2A1B299f1D20AD11ed303C60f3f0995324c6dfF";
export const REGISTRY_CONTRACT_ADDRESS = "0xA20F38732662537317A82394e636A8B74A976FF6";
export const CLAIM_CONTRACT_ADDRESS = "0x51aF796fACF1218A1ACc569CF3378E09Ab907564";

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
export const HOWTOPLAY_URL =
  "https://phi-xyz.notion.site/How-to-play-the-demo-for-Phi-on-Polygon-Mumbai-Testnet-9463f796a11943e5add3d56ee00e7a76";
export const TWITTER_URL = "https://twitter.com/phi_xyz";

// localstorage
export const COLOR_MODE_KEY = "color_mode_key";
export const CURRENT_ENS_KEY = "current_ens_key";
export const HOW_IT_WORKS_KEY = "how_it_works_key";
export const QUICK_TOUR_KEY = "quick_tour_key";
export const PHI_SUBDOMAINS_KEY = "phi_subdomains_key";

// game
export const GAME_APP_WIDTH = 4000;
export const GAME_APP_HEIGHT = 4000;
export const TILE_W = 97 - 1;
export const TILE_H = 49 - 1;
export const LAND_W = 808;
export const LAND_H = 428;
export const LAND_OFFSET_X = 20;
export const LAND_OFFSET_Y = 9;
export const WALLPAPER_BORDER_OFFSET = 1;
export const ROOM_TILE_N = 8;
export const LAND_OGP_W = 1200;
export const LAND_OGP_H = 630;
export const LAND_OGP_PADDING_RL = 120; // 90
export const LAND_OGP_PADDING_B = 32; // 16
