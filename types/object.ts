import axios from "axios";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  QUEST_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";
import { ObjectContractAddress, WallpaperContractAddress } from ".";

export type ObjectMetadata = {
  tokenId: number;
  name: string;
  image_url: string;
  json_url: string;
  size: [number, number, number] | [number, number];
  creator: string;
  maxClaimed: number;
  price: number;
  EXP?: number;
  relatedProject?: string;
};

export const objectMetadataList: { [contract in ObjectContractAddress | WallpaperContractAddress]: { [tokenId: number]: ObjectMetadata } } =
  {
    [QUEST_OBJECT_CONTRACT_ADDRESS]: {
      1: {
        tokenId: 1,
        name: "ENS Signboard",
        image_url: "https://www.arweave.net/NLD4mBpLkxQXS2jMW-0_JKUQ18ZGuV8i2IKHMx2kwrc?ext=png",
        json_url: "https://www.arweave.net/LOIIqBuorjqOlYt2bxUpnqI-3Zpd062DygUvTzIs06Q",
        size: [1, 1, 1],
        relatedProject: "ENS",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 100,
      },
      3: {
        tokenId: 3,
        name: "ETH Motorbike",
        image_url: "https://www.arweave.net/rURQTGFA4rcusYbNrJc1qpnR5qwfEF87iVrMySPMFUk?ext=png",
        json_url: "https://www.arweave.net/XA7s0P0kv6qnGOYraEyYQdwmecC6L4ilDHl-JTgYffU",
        size: [1, 1, 1],
        relatedProject: "Ethereum",
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 1000,
      },
      4: {
        tokenId: 4,
        name: "ETH People",
        image_url: "https://www.arweave.net/pqcbc3yPHrvtk-0wBOFk7hOjotY9qtEBpcPD9WVuZI4?ext=png",
        json_url: "https://www.arweave.net/XQD2-4Hk8h4I0XU-k4z7AQUHLwH6lajvvMsBYLh1waA",
        size: [1, 1, 1],
        relatedProject: "Ethereum",
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 5000,
      },
      5: {
        tokenId: 5,
        name: "ETH Truck",
        image_url: "https://www.arweave.net/JVd2VFyp24Mb5JhMM4UrfmsbZSrFXHpgEu51Yasu3Ng?ext=png",
        json_url: "https://www.arweave.net/xwJY3K1NqFKw9AhuRM2Tv_Knz2b7K0X5yjH5z32AMoA",
        size: [1, 2, 1],
        relatedProject: "Ethereum",
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 10000,
      },
      6: {
        tokenId: 6,
        name: "ETH Building",
        image_url: "https://www.arweave.net/ys0p9Dv-gmHWu7P1y72vgm8UoMXVIwKtAytP3hLUsS8?ext=png",
        json_url: "https://www.arweave.net/qgcDN8rHZoNSJua_DkthDB1dvS-X8fDW7KVljjCL0mM",
        size: [3, 3, 4],
        relatedProject: "Ethereum",
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 50000,
      },
      7: {
        tokenId: 7,
        name: "USDC Seesaw",
        image_url: "https://www.arweave.net/ssspOYjR6bZe1zWALdyeqQACAdRA5Af6amlCxFaX5iY?ext=png",
        json_url: "https://www.arweave.net/C0DwVj0SW7tUb1fn9eHBQLxfiyfs7sGOj53UfU22XfI",
        size: [1, 2, 2],
        relatedProject: "USDC",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 100,
      },
      8: {
        tokenId: 8,
        name: "USDC Card Tower",
        image_url: "https://www.arweave.net/geRYqQ-6w1sddjM38y9v134nSQ_Az_CEwGtKs8jGZvs?ext=png",
        json_url: "https://www.arweave.net/sUjM7m8YnU_YLKWJbivTQhv5aqqs5RZRKK0DB3puK1k",
        size: [2, 2, 5],
        relatedProject: "USDC",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 1000,
      },
      10: {
        tokenId: 10,
        name: "Uniswap Chess Piece",
        image_url: "https://www.arweave.net/Q55Hu9u7n6TAZtHHGCzifagdMSm7ViUeR8QjeMvqlJQ?ext=png",
        json_url: "https://www.arweave.net/J_ZKaYQP-nE-Jq-lS1wH7mEQbi9BfFg-YZxr-YprEy0",
        size: [1, 1, 2],
        relatedProject: "Uniswap",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 200,
      },
      11: {
        tokenId: 11,
        name: "Uniswap Motorbike",
        image_url: "https://www.arweave.net/Op-tUYTRJzSYuyvul6wXwguPfLqWymaIt5XVWfiJyHw?ext=png",
        json_url: "https://www.arweave.net/-eMdedRcxTW52B0nafbqSpHoi9T3SvSU3_Vo-gS4Kpk",
        size: [1, 2, 1],
        relatedProject: "Uniswap",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 1000,
      },
      12: {
        tokenId: 12,
        name: "Uniswap Building",
        image_url: "https://www.arweave.net/OofOvGLxnrH6MTSmJEYI9bVo7abQ5z1qoMSyaAvGLCc?ext=png",
        json_url: "https://www.arweave.net/a_SFq91Pz9BqiJLTP1jfFPV8oBuMzmiP6dO4BpOMBTI",
        size: [2, 2, 6],
        relatedProject: "Uniswap",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 2000,
      },
      14: {
        tokenId: 14,
        name: "DAI Pool",
        image_url: "https://www.arweave.net/FxpAGdUmzYniyXScMqWtAlqewwJVCBQrMJCuwbDHDDs?ext=png",
        json_url: "https://www.arweave.net/KaXAMiw3fpc4IPd154D2_ENR38XussMvzNozxZcyiBc",
        size: [1, 1, 1],
        relatedProject: "Uniswap",
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 200,
      },
      15: {
        tokenId: 15,
        name: "DAI Car",
        image_url: "https://www.arweave.net/SJyJwSsZyi2VBHAFexxzV4h1q6MnMajPEFIIFLHIY4c?ext=png",
        json_url: "https://www.arweave.net/BJkefVRxA3T4T4nTWZX708p28kysBcJj4demSKW_Fgg",
        size: [1, 2, 1],
        relatedProject: "Uniswap",
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 2000,
      },
      25: {
        tokenId: 25,
        name: "Developer Prefab",
        image_url: "https://www.arweave.net/izCQVJ8gKoHhaZjdBk-xqv0_10cJqcBxxuquemipA40?ext=png",
        json_url: "https://www.arweave.net/ueaYVie-yVMwkJzy-cQMt_ACTuN2L1ycvg0nKLLs-dY",
        size: [2, 2, 4],
        relatedProject: "Ethereum",
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 5000,
      },
      38: {
        tokenId: 38,
        name: "PHI Chess Piece",
        image_url: "https://www.arweave.net/2SmVegjj4HgBg3kzVwqIYMN4MnJbA0nlzDPUTARsUHM?ext=png",
        json_url: "https://www.arweave.net/xKy6D8O6dr-6VsL6jyw1f0CtxDl8Z04uy2xYkqF5n_o",
        size: [1, 1, 2],
        relatedProject: "PHI",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 100,
      },
      39: {
        tokenId: 39,
        name: "PHI Logo",
        image_url: "https://www.arweave.net/JufK7gYeP4J6hElaNSww5XAuyRCbyOpcRqqnRj9NlXA?ext=png",
        json_url: "https://www.arweave.net/WgSC_5I7wlwJyXEV3qgKfJii-W1nGZh5efW3j0hn4gI",
        size: [1, 2, 2],
        relatedProject: "PHI",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 500,
      },
      40: {
        tokenId: 40,
        name: "PHI Billboard",
        image_url: "https://www.arweave.net/jJkzTrujbhqQt2TqsLF8sHax_4hLIUaH50i_FA2ojnY?ext=png",
        json_url: "https://www.arweave.net/ZVBYln7hY7QOxZDS1c_l1p7pU51N0oq6FMEctl131Zs",
        size: [1, 3, 3],
        relatedProject: "PHI",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 1000,
      },
      41: {
        tokenId: 41,
        name: "PHI Building Blockbob",
        image_url: "https://www.arweave.net/d7Sn4KXPQyLjUgdrphB4mDEj6Tf6LjwR6zCVYbbkggg?ext=png",
        json_url: "https://www.arweave.net/l-uMo6K-3WkwXhRZFWAbshhzSDmqiy7QOwsuL_T5Dp8",
        size: [2, 1, 5],
        relatedProject: "PHI",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 5000,
      },
      42: {
        tokenId: 42,
        name: "PHI Building",
        image_url: "https://www.arweave.net/hewXZXIHZQDxD9GrFwEhkFgbM4KUrGw7wX34KQdC5qE?ext=png",
        json_url: "https://www.arweave.net/HBEO-fVUp6Jzpcfj3VczbFftcv1_M0UyP36wyPQb92M",
        size: [2, 1, 5],
        relatedProject: "PHI",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 10000,
      },
      47: {
        tokenId: 47,
        name: "PHI Monument",
        image_url: "https://www.arweave.net/9vVWDfjQkYfciGr3dxoUjIyhXkxuPboJ-NsveAfWyOQ?ext=png",
        json_url: "https://www.arweave.net/EYowsCFWpr7KbbabCubWKdcbQtd-8Hwb7ar_iSEgRKw",
        size: [1, 2, 2],
        relatedProject: "StarkNet",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 1000,
      },
    },
    [FREE_OBJECT_CONTRACT_ADDRESS]: {
      1: {
        tokenId: 1,
        name: "Twitter Tree",
        image_url: "https://www.arweave.net/l1zXahCUNqIRojyAvVw-yNUSwbmHkLTx9mMm59teGiE?ext=png",
        json_url: "https://www.arweave.net/x6q6HpCxWXI0GU4CDQ9WoZJDH5GBD1BkZfVcV-KJxQk",
        size: [1, 1, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      2: {
        tokenId: 2,
        name: "Discord Monument",
        image_url: "https://www.arweave.net/huoSybbxTA3zAlfLXZZkb-r6GG3zJXJTuUNao9og5fk?ext=png",
        json_url: "https://www.arweave.net/ptYzUVmQFMIOIVWQGQRWjBjAfY3EbK3FnJxK6e6y8U8",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      3: {
        tokenId: 3,
        name: "Github Display",
        image_url: "https://www.arweave.net/EZawXgJXnU6SPR7ehg5OI1_8gRyNjMUdpR6pd905NpY?ext=png",
        json_url: "https://www.arweave.net/YRq_nRDao80DxUaONnc9wgppnS2zlZZAgajJAJusmak",
        size: [1, 1, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      4: {
        tokenId: 4,
        name: "HardHat Group 1",
        image_url: "https://www.arweave.net/xPF2NpI6EHsAeYDsl3xhcqvGX6f2HknZjkTBwJgj39o?ext=png",
        json_url: "https://www.arweave.net/nhb8jqU2PpfagrzIOukD5hrqPKr59_aecNyLQkO5O7w",
        size: [2, 2, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      5: {
        tokenId: 5,
        name: "Puddle",
        image_url: "https://www.arweave.net/rgyS1g3-5AwWBD3deRJGEwxMnN1QLBpT-Mh6-hRLj5o?ext=png",
        json_url: "https://www.arweave.net/VOTfZHecsl_ffNiErlo2YNgPO03p9hziUle0806az4o",
        size: [2, 2, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      6: {
        tokenId: 6,
        name: "Container Set 1",
        image_url: "https://www.arweave.net/a6d5ENAleCOlNk4Sv4zf6k4EZK6iuJdjEFuhQAiaXw4?ext=png",
        json_url: "https://www.arweave.net/BqL1jKp21t1qC3dYBAJpJws3iCAmRx6li1Wt0MfFJaw",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      7: {
        tokenId: 7,
        name: "Container Set 2",
        image_url: "https://www.arweave.net/N-x2Xtkcoy6e9wYdjoDPDCBnc70ytwynZ_uoIQhqUcs?ext=png",
        json_url: "https://www.arweave.net/bH7C1k2ACSOZGY3KsrggkHKj-XTru99AvkaOCNJRNHw",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      8: {
        tokenId: 8,
        name: "Container Set 3",
        image_url: "https://www.arweave.net/TilRkEjR2VcS4Ri1HoKKhagNGRoWHh2c-PIuxxWHjiY?ext=png",
        json_url: "https://www.arweave.net/tJhGAgBjhAFLNORhisni23BwVtUqZvBR2kLUNShRy2k",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      9: {
        tokenId: 9,
        name: "House A",
        image_url: "https://www.arweave.net/595bUmeMekiTihqS0tW1OjZtwWk1PBWlCbKvUAgqLug?ext=png",
        json_url: "https://www.arweave.net/SNiETEx_rVn1TG_Q2RbTi8-A14-vOYrfnb-9jtnKPGI",
        size: [2, 3, 3],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      10: {
        tokenId: 10,
        name: "404 Billboard",
        image_url: "https://www.arweave.net/_5u97VpJgtmcKXFrJH5515HC8T0ooBYTQW-pxXXq3HQ?ext=png",
        json_url: "https://www.arweave.net/UXa9mokG0U6grG3IYe_TfAeHFlNZCsT_NOWNQJFzuw8",
        size: [1, 3, 3],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      11: {
        tokenId: 11,
        name: "Maintenance Logo",
        image_url: "https://www.arweave.net/ZpUwoVYGaNUuMcAqjQImzfSy2emZuGgnpZe6yVq9PGM?ext=png",
        json_url: "https://www.arweave.net/2Tl1LYe21GH31qgHquAFOy0Nq02RIbuqWHrddxbV8WA",
        size: [2, 4, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      12: {
        tokenId: 12,
        name: "Red Tile",
        image_url: "https://www.arweave.net/iay99djnmU2y6gZkzvZK8VIqwiQztLX0JHavf8Jnrhw?ext=png",
        json_url: "https://www.arweave.net/Y1irv5iVi8fhznHyCvzyqGTfJlx_FbbwcVrHBUHX96s",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      13: {
        tokenId: 13,
        name: "Blue Tile",
        image_url: "https://www.arweave.net/Fh-uhYCy1dqnLvuePl6ll5BLSzeC1ZtQmpJ72SCGFKg?ext=png",
        json_url: "https://www.arweave.net/_idZ2TV_XNxGAvPgtMr084dSN5BdPxG5w7zk2NTk23A",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      14: {
        tokenId: 14,
        name: "Yellow Tile",
        image_url: "https://www.arweave.net/P0YHngzyz2TgNVUBx8bsCB8TSZMvuqpuJKavZ0ExJfY?ext=png",
        json_url: "https://www.arweave.net/Hamxsxz9-tkJc_R9_f7sLweQA645NTRDYrIRVeHvQd0",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      15: {
        tokenId: 15,
        name: "Green Tile",
        image_url: "https://www.arweave.net/T7z7fOemLAW83oH6XbKKP2HSHhZdQhbSeDm0QDGX0tY?ext=png",
        json_url: "https://www.arweave.net/0gPIAptJgBnvfFydKIXcjw0DoQH__iOY-vI79QWoJ3A",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      16: {
        tokenId: 16,
        name: "Black Tile",
        image_url: "https://www.arweave.net/jGd2fXsW524O0LVov8-qUYEuJpv_ILRY0f_9kXskwSE?ext=png",
        json_url: "https://www.arweave.net/BTcgKyik2zcsDOiJwnENcfxA4pDfgk61DBbjnc6T3DM",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      17: {
        tokenId: 17,
        name: "White Tile",
        image_url: "https://www.arweave.net/AwLkA_WQDtYvFH5O90OCc_yVXfjXoLZsCrQyiyMcB6s?ext=png",
        json_url: "https://www.arweave.net/_aP7l5O__tMU77GJeeg5FOv3MJbUWFJWct3n36Lp5yM",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      18: {
        tokenId: 18,
        name: "Street Straight X",
        image_url: "https://www.arweave.net/7QmIjijitpeeAph9TsZrokF6fg2EhckQp2cb15uLSU4?ext=png",
        json_url: "https://www.arweave.net/ke8GOb7eE9OgqHYu_KrRKCE65ipNMxYfoa6XaBFVKlQ",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      19: {
        tokenId: 19,
        name: "Street Straight Y",
        image_url: "https://www.arweave.net/FLaUtCZMUqUzXJw6VWLUy-Xf6Ez03SZ_hSQEkN9t2co?ext=png",
        json_url: "https://www.arweave.net/yo5S6iQDOuPQdY067Ltpsw97LQYkbUaom6dc_qnyrWs",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      20: {
        tokenId: 20,
        name: "Street Crossing",
        image_url: "https://www.arweave.net/FUvk0BHbUbCs9qU-9EBRqlQrnZoGVYC5VNVR6aPCtoU?ext=png",
        json_url: "https://www.arweave.net/mF1LCfSngrPGeGhS1gutbTMDE7azXTu2GqI-oanKuo8",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      21: {
        tokenId: 21,
        name: "Street Corner Top",
        image_url: "https://www.arweave.net/3nBEZactbYo3PX2zk6ddeulGx98WqCJio48E4Tjj71k?ext=png",
        json_url: "https://www.arweave.net/8OFyEwoQ21Fq-1QazOklL9Snn-LKZRd1-yEX6RIFglw",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      22: {
        tokenId: 22,
        name: "Street Corner Right",
        image_url: "https://www.arweave.net/xEMpWzaWn113ueXNdGbmq0sIkzVUTUSJJL5jEvd6dRs?ext=png",
        json_url: "https://www.arweave.net/Jsl0ebWmS9gxsOTLqhHtM5WlU3mx_PmdCSSYFcqOAEw",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      23: {
        tokenId: 23,
        name: "Street Corner Left",
        image_url: "https://www.arweave.net/VFhM6E8FZMi6osY49O77F-pf42HpqRCVstplaCSzZEY?ext=png",
        json_url: "https://www.arweave.net/otzAFBpJv-aVvSE-UzV1oS04cN0hNbwD_nwnT02cCHI",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      24: {
        tokenId: 24,
        name: "Street Corner Bottom",
        image_url: "https://www.arweave.net/jSj8lIbj2Le34Tm0blmcJvK7U3XYf5RM6w1drS25bGM?ext=png",
        json_url: "https://www.arweave.net/aX34cgnGj8ikoT0T6mjxCsifmnBW1eZOlQj42Vy66sc",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      25: {
        tokenId: 25,
        name: "Street Crossing X",
        image_url: "https://www.arweave.net/T9YkNq6T-h5s6Ft3XeUVIoHpXyCzsIRBn4IGME9h2BE?ext=png",
        json_url: "https://www.arweave.net/k3EBxuUnDelct2v83a8hGWLecTC34Z2Y2FqAvHPMi1o",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      26: {
        tokenId: 26,
        name: "Street Crossing Y",
        image_url: "https://www.arweave.net/aRcuYEiBPjxLt8FjOuBbIKShN0k12sv84oJD8_TUcNM?ext=png",
        json_url: "https://www.arweave.net/ELfvO2Rt3SpIRRzVjuT2w2JW-VnqK7K9mn0rxnuZOL8",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      27: {
        tokenId: 27,
        name: "Street Phi Logo X",
        image_url: "https://www.arweave.net/3oBH87Gtzvqbn_PCzCa2LGAfT_zKTr7xdsR7tgOZzT0?ext=png",
        json_url: "https://www.arweave.net/XbnLJND_hwW5aW5RNQZysO-jkZl7Yupryq5uDYw55Ts",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      28: {
        tokenId: 28,
        name: "Street Phi Logo Y",
        image_url: "https://www.arweave.net/sUkGM0uumlUElUggpDRKSZWEHFGRKBMjh_qePIjp2io?ext=png",
        json_url: "https://www.arweave.net/djJL-J8m35yWuN7zAnKYJ73eiy4ppr_oLwtl21DVXjM",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      29: {
        tokenId: 29,
        name: "Street Blank",
        image_url: "https://www.arweave.net/1t9xqtc2xc75bKUCxZWcO3e3nAVhyfKhQQ4jKUiOEKs?ext=png",
        json_url: "https://www.arweave.net/7DgacR-IzdGAmUKgwQORLhLj0VZkyJuBrznTfA-4BUQ",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      30: {
        tokenId: 30,
        name: "Circuit Board Lawn",
        image_url: "https://www.arweave.net/jVC1tpbElJIReX_cokP103Ap2J354CXmhZ9151hgN88?ext=png",
        json_url: "https://www.arweave.net/Zc2uZQJ1PkEzvMFemTOewrn-NBKEKKdTg8nasbiaS4s",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      31: {
        tokenId: 31,
        name: "Circuit Board Tree 1",
        image_url: "https://www.arweave.net/UGTRs93U61-iqG21hzEJY8uy9V5FEP5cUvw0L6HQFtQ?ext=png",
        json_url: "https://www.arweave.net/tBGOWl9ipddyAsy8kBeov3sjBnLtGFiAmBYqH6N_uwg",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      32: {
        tokenId: 32,
        name: "Circuit Board Tree 2",
        image_url: "https://www.arweave.net/IvaVsJhQ95eNxaWHKDAV6K6wFV5F1ptronC804c_Cqo?ext=png",
        json_url: "https://www.arweave.net/qtCQUcHTAuCMxg0fODan8PJVZwGUCV-JlVi7SLOL-Qo",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      33: {
        tokenId: 33,
        name: "Circuit Board Tree 3",
        image_url: "https://www.arweave.net/pCkHaxPyWY87pLn00wX9YuP_UG039kfqQsLHGef1r_A?ext=png",
        json_url: "https://www.arweave.net/kq0WHkDyslmOzLew83Eotlt2d-63Rwbi4vYo7yE7hxA",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      34: {
        tokenId: 34,
        name: "Circuit Board Tree 4",
        image_url: "https://www.arweave.net/hnyNy9HsvD3-vzhbCLhvyGoEwybNQ7hzFxTdRp2MRIs?ext=png",
        json_url: "https://www.arweave.net/CkFG-5_0_09zIp1wh_ggmdobdGGxFV9DuF8zO_woqMM",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      35: {
        tokenId: 35,
        name: "Circuit Board Tree 5",
        image_url: "https://www.arweave.net/x0oY5I47JJokNZMVzl7r6UZZDcNNToJve1UQ4UfHVB0?ext=png",
        json_url: "https://www.arweave.net/xPYbNud6Q0euHm2mXNFOfb3t1oke_hrB7FVisT7AO_4",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      36: {
        tokenId: 36,
        name: "Dotty",
        image_url: "https://www.arweave.net/ZTC_-Ijhh6UjYFWgjdADfCgA1Jqsvue5OsFtoqv1kAc?ext=png",
        json_url: "https://www.arweave.net/RROpRF7SwKk13b7h-Nc3jWrz4V8qwLSVzJIJAT2iku4",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      37: {
        tokenId: 37,
        name: "Lawn Builder",
        image_url: "https://www.arweave.net/0FPcBfnk3jyaVHEyEKPKPHkB0kjx7WGYl4UcTBHPMhs?ext=png",
        json_url: "https://www.arweave.net/AX23NS2D8fF3hN2RiwZaFDdOafWbzBtjLia6Qs4Bi2w",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      38: {
        tokenId: 38,
        name: "HardHat Group 2",
        image_url: "https://www.arweave.net/aW9vEZ9xGk4zZtdEXLAeCM71dpStNW94GfL1lzdn4NU?ext=png",
        json_url: "https://www.arweave.net/Pxdz_BCsbOIzUDfVJ5W5X4ooKFntogjWi7Z8gO2ZEt4",
        size: [2, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      39: {
        tokenId: 39,
        name: "HardHat Group 3",
        image_url: "https://www.arweave.net/R68qlK-Fcg7XRjfJNyqn7qYMAS_KE-LfxDkVu5id3pI?ext=png",
        json_url: "https://www.arweave.net/TVrGFdvYVTGvYnfMpRgScEkbq_vI1_xuJQkoDfEP5nc",
        size: [2, 2, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      40: {
        tokenId: 40,
        name: "Street Painter Back",
        image_url: "https://www.arweave.net/LHX3jwrHm-u-m5Oxk_t0Buz5UWKU3wpPO0Siz8eLVqk?ext=png",
        json_url: "https://www.arweave.net/YB50K2WN4511MsBJKboqKgY3-4j2hzCPH0P0vftZvtM",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      41: {
        tokenId: 41,
        name: "Street Painter Front",
        image_url: "https://www.arweave.net/a0QzZ1q5hzZwwXHm0zIu54xVZsYBoRLi6TrEF67u_b8?ext=png",
        json_url: "https://www.arweave.net/ju8UgvE8atoSoL4NSDHorx6iU5fYS8ujvFPreDmRCTo",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      42: {
        tokenId: 42,
        name: "Street Painter Back Right",
        image_url: "https://www.arweave.net/BJjCdk3t_rtJ8JabgWBaGrlXyYZ0lwlnhJ-9pe0njKA?ext=png",
        json_url: "https://www.arweave.net/wvm3eFtL7It7SNn-k3WuoT9EL_MAXneL92m_uahw8fk",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      43: {
        tokenId: 43,
        name: "Street Painter Front Left",
        image_url: "https://www.arweave.net/s36Mr5gtTFrNutCAymkH9nLH236mM1h8YCU148I8GoA?ext=png",
        json_url: "https://www.arweave.net/-wlBbZi976G2tt2jB2SrtreCliVHNeS2-BNmnApzHhk",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
    },
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: {
      4: {
        tokenId: 4,
        name: "Phi Traffic Sign 1",
        image_url: "https://www.arweave.net/aJlG958os5Z96LxQWZWh3LXNqOcda8-wt5SLubaY_Dc?ext=png",
        json_url: "https://www.arweave.net/w4Z-Q6nZRfs-uEtlXo5jjUaMGA1zInaOLEeceGyU1DQ",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      5: {
        tokenId: 5,
        name: "Phi Traffic Sign 2",
        image_url: "https://www.arweave.net/YO5lHMYt89-jUnVSaPE68YTMd-ZuOx6oKJihpDGLoK4?ext=png",
        json_url: "https://www.arweave.net/h3GOqdVDTrWK9ylisRQc3fIPoOLq1KXysBm-DYHSJOM",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      6: {
        tokenId: 6,
        name: "Phi Chopper EasyRider",
        image_url: "https://www.arweave.net/-esNj2ZVghXrZE1w4emWTJ7sr9ZGBJW2i4oDwrCLnCU?ext=png",
        json_url: "https://www.arweave.net/Y-8cboJBY5FkrdiS39VfjVFdoeUeFLp6rJER4-vlRrk",
        size: [1, 2, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      7: {
        tokenId: 7,
        name: "Phi Chopper StripesRider",
        image_url: "https://www.arweave.net/0BycseXWDoV8ILGJUktDgZQI-94QR52aBjSCEDEaLtU?ext=png",
        json_url: "https://www.arweave.net/blS5u6tOvdTzaYaXJMcnSMe-VvCO9jh4LM9iQkZmaRE",
        size: [1, 2, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      10: {
        tokenId: 10,
        name: "Buy Sign",
        image_url: "https://www.arweave.net/1na3wPvq_vEISvXf6xFrmZ0wHsdWScNYCZoQLQ8TuL4?ext=png",
        json_url: "https://www.arweave.net/pFNEyUMRrTQgcUjTct2jm1__BtMT7lnRgF1oh_T-PNI",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      11: {
        tokenId: 11,
        name: "Sell Sign",
        image_url: "https://www.arweave.net/oUiFCwiJI0NLg6wCINXz6BjotWlhrInjvcy0P28aOlI?ext=png",
        json_url: "https://www.arweave.net/6SGlWD3bDVKMxeBFOleVA8S-66_GaRXL-_KHD3dUIwc",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      13: {
        tokenId: 13,
        name: "Piggy Bank Pink",
        image_url: "https://www.arweave.net/j30jXkobzpZeKglkz6QfEY3HgdW3lGsHGBMbnN3sWL0?ext=png",
        json_url: "https://www.arweave.net/Y2E9IiIDynp2Rk9AMbPvX_bFVUbuWszuAuHPJM9fhag",
        size: [1, 2, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 3,
      },
      18: {
        tokenId: 18,
        name: "Billboard GM Sun",
        image_url: "https://www.arweave.net/zqA8eyTPQ8vMIdkBlfdReaW0edzRaX2A2_zRTwqvee0?ext=png",
        json_url: "https://www.arweave.net/6rEBFFNzHXUCJatDHQqoxaooAHOC0YyNtoHhkN-3H3w",
        size: [4, 1, 4],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      19: {
        tokenId: 19,
        name: "Bitcoin Chess Piece",
        image_url: "https://www.arweave.net/HSelylex80QeOyXvFjDjKyJFtMoBvW-FSyUKt2Ouqyo?ext=png",
        json_url: "https://www.arweave.net/fW3XeqqFErH13M7GDSvVZlV1mrYbLQHHxfWnXDpXMfo",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      20: {
        tokenId: 20,
        name: "Tezos Chess Piece",
        image_url: "https://www.arweave.net/qJzgOP7Fp5FMcQ76n5WY10gG87vG5Ux_1d1TVh5MjIo?ext=png",
        json_url: "https://www.arweave.net/zJFq1vq7Hj9fENqxKpq8dQqM0ZIIO45z6ifBMxSfVSY",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      22: {
        tokenId: 22,
        name: "PHI Shrub",
        image_url: "https://www.arweave.net/3iUwHh9jd6CWBafJMBFMygXN1qpb3rX7OZjzO7b7sJM?ext=png",
        json_url: "https://www.arweave.net/OjVNcDIngvzkIjrpzuSHcdzLXimEdnF_4rUrf9Y-fOQ",
        size: [1, 2, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 1,
      },
      23: {
        tokenId: 23,
        name: "Sierra Module Chain",
        image_url: "https://www.arweave.net/TWZCsRY24Qs6vgAr-dAxWAPZuvuUpgJLzkMaae1GdCE?ext=png",
        json_url: "https://www.arweave.net/isZCgUncmPV_vWeNbCwv4szoQ3VhrUSQzwVfOa4gEKA",
        size: [1, 3, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      24: {
        tokenId: 24,
        name: "Sierra Module Mine",
        image_url: "https://www.arweave.net/Rs2YzZg4KB2Vp7GYC62hiuSPTlYvE9V5j5j8_owW6_Q?ext=png",
        json_url: "https://www.arweave.net/P4ov82vlti6z2zHTiJw4KnoUaknUFdGUZf0znUwyONg",
        size: [1, 3, 3],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      25: {
        tokenId: 25,
        name: "Sierra Module PHILAND",
        image_url: "https://www.arweave.net/3ADX9quo6U3ay2JPjlXQAqHFlnuy4dm4U7jidf_q8QQ?ext=png",
        json_url: "https://www.arweave.net/FkDlGFC8MTJUfhmFjM0SvzDSuR_hoIy8T5_h_nxCwjI",
        size: [1, 3, 3],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      26: {
        tokenId: 26,
        name: "HODL Building",
        image_url: "https://www.arweave.net/ilQxBtinFtcV6Emhx3jWC_uvcEINW4cgfV69ESmWbmc?ext=png",
        json_url: "https://www.arweave.net/-WUC4T-4HcrQJscKQf8T0be5ShJxN59niJ4vjz1Fne0",
        size: [2, 1, 4],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 5,
      },
      27: {
        tokenId: 27,
        name: "Red Candle",
        image_url: "https://www.arweave.net/X85dGrrEBgV9yucKN2jijbtZPT-OQ_jid1JH5e4wySk?ext=png",
        json_url: "https://www.arweave.net/pEMfAU_hbgCIaAgyBbzJRvRcVcS7bwX2V6-VdaADhow",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      28: {
        tokenId: 28,
        name: "Green Candle",
        image_url: "https://www.arweave.net/yqjxM8uF1NePCQVFnbbuTs_sNh-t8S7VT-JwprMsmk8?ext=png",
        json_url: "https://www.arweave.net/Tmgqwk-OV5aSyQDw6gBZtqPUjHFV_1M6GT3mV8SBLFM",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      29: {
        tokenId: 29,
        name: "Batterie Building Short",
        image_url: "https://www.arweave.net/EJDa32bsuetd9i9EF8rIfILI2TvMveD3B_3rnj9-DTU?ext=png",
        json_url: "https://www.arweave.net/CHrMJiIms2RxjVkzeReN7amPI5vBWFUfBYTMm4aVyBA",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      35: {
        tokenId: 35,
        name: "WAGMI Billboard",
        image_url: "https://www.arweave.net/Dslb0xHTG2tXPYomnEqmd9dI_MPMls7cISLIHtYj3Fs?ext=png",
        json_url: "https://www.arweave.net/E7KEwfKddMHwpu7VCWQUlIY_Zpb19QDTOORf6aBmBfA",
        size: [1, 2, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 4,
      },
      36: {
        tokenId: 36,
        name: "Wallet Shop",
        image_url: "https://www.arweave.net/EZIsCRJDDdVoK8jzYZ3078JlyjKoLP14tZw-Mpo0Ayc?ext=png",
        json_url: "https://www.arweave.net/4Sto9Plx9lFKclWTqxqqxXApiyR8ZpRjKCAx9r-HRDc",
        size: [1, 2, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 4,
      },
      37: {
        tokenId: 37,
        name: "Key Chess Piece",
        image_url: "https://www.arweave.net/vd7ddkFpHCnfRNSoXrlg5Dd8_alElC1wJn05loDivXo?ext=png",
        json_url: "https://www.arweave.net/8K6ZSuUGQKUaL65rRQeBiJdQ0FfO649USzkpMppQyMA",
        size: [1, 1, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 2,
      },
      38: {
        tokenId: 38,
        name: "Bull Statue",
        image_url: "https://www.arweave.net/0_3TD0PTlaTx8AQmci5CjHqNdMy2MWdx0pVjXwylPkM?ext=png",
        json_url: "https://www.arweave.net/bQJDOkltUp9Ap6Gb43bv3BbyfMi3s55-FBGZE9aFzfg",
        size: [1, 2, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 4,
      },
      39: {
        tokenId: 39,
        name: "FUD Billboard",
        image_url: "https://www.arweave.net/pAgTGET9UA2OiWBEUDJhqSEmS2AS_2MW9rmrYm0rhxk?ext=png",
        json_url: "https://www.arweave.net/QrbN6CUm5UtX2KX0QCd7Yo0sr7mzm3bFj9HlKsM2wH4",
        size: [1, 3, 3],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 5,
      },
    },
    [WALLPAPER_CONTRACT_ADDRESS]: {
      1: {
        tokenId: 1,
        name: "Default",
        image_url: "https://www.arweave.net/-ybdD4VxlL8_jEl3onlyuXO6Kk7bDI1rh5A-bhN6qMM?ext=png",
        json_url: "https://www.arweave.net/DhPAcWxMjbGipMEKJrVE7stKGif7e6aLIEa_1TcnVsU",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      2: {
        tokenId: 2,
        name: "Cali",
        image_url: "https://www.arweave.net/digLYBrfTs16QUaYfQVprxHNHIkmptnLS4fjNYiKtcw?ext=png",
        json_url: "https://www.arweave.net/74vLu6a8SwSTjvOKMx5HPtIn8boUSzzueWfoTY4bb0I",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      3: {
        tokenId: 3,
        name: "Checkerscali",
        image_url: "https://www.arweave.net/tRdijQPcn_Uu_tjpOC67qrv2CroqopkpwLb-V4Orth4?ext=png",
        json_url: "https://www.arweave.net/IOTGNxhvfKs_afX023Facyq9pHZj18uXxm7xTycfFss",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      4: {
        tokenId: 4,
        name: "Crossdirt",
        image_url: "https://www.arweave.net/CU4A76QlVBVViliJMqwaYx2S_zs_VcHR848ojnRKtQ8?ext=png",
        json_url: "https://www.arweave.net/5lYSYl1K6KaNOX4pkfqjgL4scUm8ssEFt0Ieeir8eIY",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      14: {
        tokenId: 14,
        name: "Logoisoisospaced",
        image_url: "https://www.arweave.net/fUQZ7h4293a43ODbXo0sFyESnIExx9edvH-jy-OumEY?ext=png",
        json_url: "https://www.arweave.net/gwCLCd8NDvPZDk3_XmamuRP1OTmebTRk2xhTuo2csZM",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      15: {
        tokenId: 15,
        name: "Logoisoisospacedorig",
        image_url: "https://www.arweave.net/lJhNgp8haakfw23MCasAF-6bPJBNKz6yRc7SZ0rpP5I?ext=png",
        json_url: "https://www.arweave.net/0_Du5sKqX8U1CPcOyU8YbPDgqPPIFPcbabesnMX_hdI",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
    },
  };

export type ObjectTraits = {
  attributes: { trait_type: string; value: string }[];
  name: string;
  description: string;
  collection: {
    family: string;
    name: string;
  };
};

export let objectTraisList: { [contract in ObjectContractAddress | WallpaperContractAddress]: { [tokenId: number]: ObjectTraits } } = {
  [QUEST_OBJECT_CONTRACT_ADDRESS]: {},
  [FREE_OBJECT_CONTRACT_ADDRESS]: {},
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: {},
  [WALLPAPER_CONTRACT_ADDRESS]: {},
};

const setTraits = () => {
  Promise.all(
    Object.keys(objectMetadataList).map((key) => {
      const contract = key as ObjectContractAddress | WallpaperContractAddress;
      Object.values(objectMetadataList[contract]).map(async (meta) => {
        const res = await axios.get<ObjectTraits>(meta.json_url);
        objectTraisList = {
          ...objectTraisList,
          [key]: {
            ...objectTraisList[contract],
            [meta.tokenId]: res.data,
          },
        };
      });
    })
  );
};
setTraits();
