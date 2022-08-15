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
        name: "ENS Chess Piece",
        image_url: "https://www.arweave.net/wLMABchJ16PF27r3djXQNBVRBpu6PxgnRd97t_xE15c?ext=png",
        json_url: "https://www.arweave.net/_t2Xq_3VqPTlr-q-nhtFLH5Agy74yRqsinfg-7FXgjA",
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
        image_url: "https://www.arweave.net/IB-pcZVHXcx5WpQXBtTWUyG2X8Y0Y33-u7NbDtabt0s?ext=png",
        json_url: "https://www.arweave.net/WUc5zm0OB5EOf8e8qko9wWRktQ6hZsGJH9vZEqMI3ic",
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
        image_url: "https://www.arweave.net/Bqf0fdxwBjm263H72uHAaBZuRgb98STaiFC2UbRTaQQ?ext=png",
        json_url: "https://www.arweave.net/jlyJVLtZh6Jspuokkm3hIH8kS3RmoV839Ds7FY2FcZM",
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
        image_url: "https://www.arweave.net/l5mm-1pTXa5vviyjhn0RUoxyNfZ5JGklqkRyv2gEuqY?ext=png",
        json_url: "https://www.arweave.net/2RpoeY1DaR-2nhv0rh52iJfAtE0lbX01V-1srkFKDCE",
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
        image_url: "https://www.arweave.net/bk4QVHu185xQ8cTCm4QIJqSCI4azTafISyZ5F_8qkL4?ext=png",
        json_url: "https://www.arweave.net/2U1dBRg1tfvjDYXTcuH6WHM1sonZkM-F7XPlvvk4bvc",
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
        image_url: "https://www.arweave.net/KLC82XpJzr6w4kKNLquiU4ENMeT_2R7CShhehZPR_Ao?ext=png",
        json_url: "https://www.arweave.net/pmxcd7mNMZDaGsqoIPuzVJ6SKJoTTcdRZBm6VGTd_vo",
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
        image_url: "https://www.arweave.net/H3Yv-6Us4pNAiqKrpPSkuiS-RB5n6UrMs5HMVYE2BsU?ext=png",
        json_url: "https://www.arweave.net/1aofXvjEumF6mgDuWNMm8KD-7_bO4VobB1kOk3HutU8",
        size: [2, 1, 5],
        relatedProject: "USDC",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 1000,
      },
      10: {
        tokenId: 10,
        name: "Uniswap Chess Piece",
        image_url: "https://www.arweave.net/o1VgjphTA-HNERSFAObA3ZdrBZOFMRgJDMr-96K1L48?ext=png",
        json_url: "https://www.arweave.net/XsY8uoWSx8ZkR6_SJJb7y3-3SuW8IWEK6s86eJFrvCQ",
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
        image_url: "https://www.arweave.net/tU1P25WbMYa4aCLsMXjA5R3P9sOD8cRNfvGAYYcFVBU?ext=png",
        json_url: "https://www.arweave.net/wTXgZQDoCCBEkS3h4KUQAnAnPtoiMqTLxWYSJc2PjEI",
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
        image_url: "https://www.arweave.net/nNEnTT8N5m9jC26IoPtVglIyXpA9O-4F4oqtY8XYf4A?ext=png",
        json_url: "https://www.arweave.net/5-yipJiR03p8OnW4QJuk4lLJyC8iHanuGpsFgrB3Ydw",
        size: [2, 2, 6],
        relatedProject: "Uniswap",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 2000,
      },
      13: {
        tokenId: 13,
        name: "Uniswap Ferris Wheel",
        image_url: "https://www.arweave.net/04dajaT5iKTpYBFGYhQS5_vQRi0-Qif68neldSoGlao?ext=png",
        json_url: "https://www.arweave.net/Cvy4a-E9wVvXK80KuF7x_HaPxDGpMaL2OzEtxGRj2yM",
        size: [2, 1, 4],
        relatedProject: "Uniswap",
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 6000,
      },
      14: {
        tokenId: 14,
        name: "DAI Pool",
        image_url: "https://www.arweave.net/9HtQvgrdG64w2ASZwk559QPRkrj8ALFdC9BCNMe7n4U?ext=png",
        json_url: "https://www.arweave.net/w8VAfSCZDGVAP9Qfc__doeG8KwsW3mCUPqMWTbGd6JU",
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
        image_url: "https://www.arweave.net/QdvQiUCrunOitab41XVclRxP9jsFM-jj5ePxQNuLnOA?ext=png",
        json_url: "https://www.arweave.net/ibFzkNYHHPEnQBQrUipe9wlliHMV3ZT3a784LLDw7Nw",
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
        image_url: "https://www.arweave.net/YCEhzoBngvSk-Sz5sCps_z3JqrIeTHYnF0Hyirfivy8?ext=png",
        json_url: "https://www.arweave.net/xodJhJjjdFuOAA7PpFboJf1XmdWfYvRxo6_SCf60AaI",
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
        image_url: "https://www.arweave.net/hka5U0gg0x48PWHsMMqaHKFL52xraKyeFwvcvxJ6UeM?ext=png",
        json_url: "https://www.arweave.net/ImhxkSVWMj-1mAmBmt1ku42BEYtZ84rvWRA4b109i5k",
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
        image_url: "https://www.arweave.net/TAFSLFJmF8AEzxOliqJdjqgfq-Fk6GW1y8yL7jJLEEo?ext=png",
        json_url: "https://www.arweave.net/BO8WcXVlGcIprtdxINVEv_kL_uSSalnDt5nmZ5Kyur0",
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
        image_url: "https://www.arweave.net/UC49CrzevlDFgXP9zy7TaKHBdsffbLCw_PjEi64gYUE?ext=png",
        json_url: "https://www.arweave.net/dBNm9SmGPyTRf-Lsm-HGTFxD9IhTcXtc7d9_HfvmY-c",
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
        image_url: "https://www.arweave.net/e_in9SgPL25cCqK-TbAdADrZeCSePyLtSUxYVum5cwU?ext=png",
        json_url: "https://www.arweave.net/xQq3ae1MheAt6tXCmTT2Nq4EjUtUDh5kZwvSJ0BrwTc",
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
        image_url: "https://www.arweave.net/XxeuqIxgq8UPYKNkK641KHq9eLLGQaDfC7WWSrZWxLE?ext=png",
        json_url: "https://www.arweave.net/PD5Qf9Xy_sXJmnffp5dQip1r_ifrVWgjVtaCVyddUDg",
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
        image_url: "https://www.arweave.net/1Ht5x6P5vOe2CQcdOn9rBn7y_f4vrbDSKMvZmzm--ro?ext=png",
        json_url: "https://www.arweave.net/9KaVIxUhSQ8CV8gON2yQZuNH0WpAwjvnqfFtsx9k9fw",
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
        image_url: "https://www.arweave.net/ud9I57aDTEUugHtQwC9IVKs1YaTulRnedy22oxwGhtU?ext=png",
        json_url: "https://www.arweave.net/8MyL1FdO55pKCVyhqfWQn9muGsBeefeUUumXBo9F27c",
        size: [1, 1, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      2: {
        tokenId: 2,
        name: "Discord Monument",
        image_url: "https://www.arweave.net/ywvSYWoeNdr5yLBQGuzZM0AE3MZauFYB1tWtdFrasqw?ext=png",
        json_url: "https://www.arweave.net/-F535YiF4LreRCcMn2-ZAZIB0aU9_IZp0C62vK9Iveo",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      3: {
        tokenId: 3,
        name: "Github Display",
        image_url: "https://www.arweave.net/ofaUcxRxhGVgNNMiYOyC86Jre4E8LjJgAcavBvnmbfw?ext=png",
        json_url: "https://www.arweave.net/O_BuSZvoll5Hy1svXoxKgspmpOU28rEArFZGFrPGfio",
        size: [1, 1, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      4: {
        tokenId: 4,
        name: "HardHat Group 1",
        image_url: "https://www.arweave.net/lWJgl02fbsEqL4wdIi5K1MrX3u_esdb39JO-oaikB9k?ext=png",
        json_url: "https://www.arweave.net/bupAcuEcIgb4fiEpvPhIHegYbOB7FltxwFJDhKdR1Ns",
        size: [2, 2, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      5: {
        tokenId: 5,
        name: "Puddle",
        image_url: "https://www.arweave.net/H_J8t9ejSCt9Q3_PzwZR0LEb_PsUfp9hCTtIR5Xs_d8?ext=png",
        json_url: "https://www.arweave.net/cF6d4yq0Nb3vODlf9JRWJh2MQGrOnTJwCeEaR5WpArI",
        size: [2, 2, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      6: {
        tokenId: 6,
        name: "Container Set 1",
        image_url: "https://www.arweave.net/NBCzoPcRG1t6cWruutbdiPfcz6mPkxDip6DLJY8mXDI?ext=png",
        json_url: "https://www.arweave.net/EcYzbwQN2LeNfXg2YZDgk8g8yqgenNxv6SOs0mz7SMo",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      7: {
        tokenId: 7,
        name: "Container Set 2",
        image_url: "https://www.arweave.net/lmACdJKDM16pD4Dd2e9iEMu7J-UpupVfx3uSGVcwE_k?ext=png",
        json_url: "https://www.arweave.net/DrZQgLenWMhtN_ykcvl3h4ykYq3IT_6ANKMKUHGD2Go",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      8: {
        tokenId: 8,
        name: "Container Set 3",
        image_url: "https://www.arweave.net/_LJEJ7BZ9S_GAFs000hX4m9ZjwQWbNFW41sroaoRCXo?ext=png",
        json_url: "https://www.arweave.net/qvHcXY4GKwRg-qf1-lgDlLQ6hdmRS8VY4hLegUnPuOA",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      9: {
        tokenId: 9,
        name: "Safe Building",
        image_url: "https://www.arweave.net/Ki1LWPQyhiFZiVT2eOvRacaoebeD1YjagH9O6fYN164?ext=png",
        json_url: "https://www.arweave.net/TJsAD_J6FG3s_qJHyiLDnX5mKuBe8Z9tekYzlxgC1-8",
        size: [2, 2, 3],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      10: {
        tokenId: 10,
        name: "404 Billboard",
        image_url: "https://www.arweave.net/T57Q-3oTKu2Y0cDf1ulEFx1HF3E5t2r9dmTU5DdP4wg?ext=png",
        json_url: "https://www.arweave.net/T2_e5ZivuTT6JJkT0qCvu5TlxY37WjgqKdEQ3h0NvTc",
        size: [1, 3, 3],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      11: {
        tokenId: 11,
        name: "Maintenance Logo",
        image_url: "https://www.arweave.net/I-hq8T-mf2Fh7E1L6ga0RLheHxk5sHgwwWBX8jZylX8?ext=png",
        json_url: "https://www.arweave.net/xoSAdML7yMN-VFTBTYT8vUOuJboeU5QkOMGCQsqd014",
        size: [2, 5, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      12: {
        tokenId: 12,
        name: "Red Tile",
        image_url: "https://www.arweave.net/XX289iZXBibHLg5fQkTzkAl0ndW6f64_iFHYAiKZmQ4?ext=png",
        json_url: "https://www.arweave.net/2ZGrKFhqtUGbpA6pGuZgbMaPTjjJ0BCtlGAhRkG52_U",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      13: {
        tokenId: 13,
        name: "Blue Tile",
        image_url: "https://www.arweave.net/Rd4OlZCQTSRcDfk02fRf2D2VmM96v-Fupjk-BMQG9Tc?ext=png",
        json_url: "https://www.arweave.net/8KLQiIKrReNqXkGipK_912qaso6Q13jiuy5QboXw8hA",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      14: {
        tokenId: 14,
        name: "Yellow Tile",
        image_url: "https://www.arweave.net/Uvj0s-Iw865VNqClMaxt2AyKFxMbUeK6QwVAcm8EjDw?ext=png",
        json_url: "https://www.arweave.net/OwAjvXiZQu3aRSJ6j5Np-kisV5pyXuREnZqrEdOY9fg",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      15: {
        tokenId: 15,
        name: "Green Tile",
        image_url: "https://www.arweave.net/jZrAoay12B1Oe7-NNYcpq-p0QtGNyknBjYBJqeeHZYU?ext=png",
        json_url: "https://www.arweave.net/h3qNIm3L-YLr6p0d6A5iAm5VZopMv4lAf75JPQ2BDhQ",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      16: {
        tokenId: 16,
        name: "Anthracite Tile",
        image_url: "https://www.arweave.net/BxYtyIU1BgDWXCM2zDptAcqQvsnfwrX5WiaFcsSvtEw?ext=png",
        json_url: "https://www.arweave.net/Qnd5Ri52YmggeqKTgVtQfcd6We5DmK3ZfyUMDdjwQQY",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      17: {
        tokenId: 17,
        name: "White Tile",
        image_url: "https://www.arweave.net/ddR5hBcemaLH4mv2x30gjb86FBE4SnZ3g475AFQG5Es?ext=png",
        json_url: "https://www.arweave.net/BNhskeykx5j39rYFWWxUY5N0fVKyZGosMGYIJNMAUu4",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      18: {
        tokenId: 18,
        name: "Street Straight X",
        image_url: "https://www.arweave.net/0HfIob06gr4WvyMhcWPx2KgFgjZVAPlc0E2MBVqx75Q?ext=png",
        json_url: "https://www.arweave.net/fOzwBcSJ9rrs7ETE6D4DyLO2cJ_2tQMc4BIZFHDNUk4",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      19: {
        tokenId: 19,
        name: "Street Straight Y",
        image_url: "https://www.arweave.net/-NzcPd78I1FT-LxLXb4I0svqtANh1-oq5E002X9OHmw?ext=png",
        json_url: "https://www.arweave.net/TaS2zgxM36F6WUWc7Hi0pUtiCSe5tRtz2vVKAFwRixo",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      20: {
        tokenId: 20,
        name: "Street Crossing",
        image_url: "https://www.arweave.net/9XifDanINijiNrvTY3FHUXsG_P7CuWgF8XzHddlC7T8?ext=png",
        json_url: "https://www.arweave.net/WORUnmTCbRes3vV4VCgf4h5u3pk194ef4wUZFNCHdUs",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      21: {
        tokenId: 21,
        name: "Street Corner Top",
        image_url: "https://www.arweave.net/KsJvyp4ltJTlzFOpTI1TCWRIAYDnficsxl_bJZ9MavE?ext=png",
        json_url: "https://www.arweave.net/-B0C_oKFPwoVn61wlBHJC5J5Q93hXAevfDlIwL9z2Cw",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      22: {
        tokenId: 22,
        name: "Street Corner Right",
        image_url: "https://www.arweave.net/XE23VrlrkCoOxAFgoEytQL4gK9LMwT-HMCGPOPp-Plo?ext=png",
        json_url: "https://www.arweave.net/o29FMH6PxCtDdx25OkD81QmcGvvNvLUvLEYHqXDZw8s",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      23: {
        tokenId: 23,
        name: "Street Corner Left",
        image_url: "https://www.arweave.net/GyWn3ACEHZPE801MOLKejYE7ZnXEtbauWOlqTFI-lYg?ext=png",
        json_url: "https://www.arweave.net/axECxJj8kdUuS97uMMaaaNYWdkBOd7ro31aWaeshSE0",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      24: {
        tokenId: 24,
        name: "Street Corner Bottom",
        image_url: "https://www.arweave.net/0SMTmm_-NAE5Bu_bczmq_lQ9uHdWY5No0tScEAkzP8c?ext=png",
        json_url: "https://www.arweave.net/6thsukM7LXJVRYFposUFIjbChHItRArTBzfgVyujVKo",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      25: {
        tokenId: 25,
        name: "Street Crossing X",
        image_url: "https://www.arweave.net/4CbnJkSaQFlRKkpRctMFAllxhwcF68JHZ_avIO73BBs?ext=png",
        json_url: "https://www.arweave.net/Dc2Ub3F1QNYmh3Cp73_6q-IxGqi2j3elHxe3dtngXGQ",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      26: {
        tokenId: 26,
        name: "Street Crossing Y",
        image_url: "https://www.arweave.net/WUar8BRh0h87Nplr0sKtWqGc2xNxmsWylRECslpv86M?ext=png",
        json_url: "https://www.arweave.net/Ween6a7VqmUBemqL0v4Nxot5_T7IQ6UY8T7XxyMo7x4",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      27: {
        tokenId: 27,
        name: "Street Phi Logo X",
        image_url: "https://www.arweave.net/ANvey_-7EqTQNnViyaR-_r0MxuMFHgiEojuxSAL7Oms?ext=png",
        json_url: "https://www.arweave.net/bMBO48-Q0agpD93_S6cYyA-44ifVttrRWjMUR-T3qiI",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      28: {
        tokenId: 28,
        name: "Street Phi Logo Y",
        image_url: "https://www.arweave.net/ccWuFy_q5dIrMUo56jo10WqQoC-I1xMLvuGxWA75Pco?ext=png",
        json_url: "https://www.arweave.net/FJeh2y-696htYW_YVJm2hxRjpwpyU135VG2hCrBVKvw",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      29: {
        tokenId: 29,
        name: "Street Blank",
        image_url: "https://www.arweave.net/iIupfq78Vd1moVKw1oIsh0DqFKx-PPlVaZBZdzTBGcM?ext=png",
        json_url: "https://www.arweave.net/WhrLlhuxlhmGuDD1Nag8TQIzcbvTUUg-rnxQ8svFWHw",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      30: {
        tokenId: 30,
        name: "Circuit Board Lawn",
        image_url: "https://www.arweave.net/_KbCSisIcTD1gm5iSIoTZLdJi1SfkxcL-i05kIjR9NQ?ext=png",
        json_url: "https://www.arweave.net/3-QT-n6t3pkXaAaHSR4g5c2d_CC7HBeKI70OznbsUjE",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      31: {
        tokenId: 31,
        name: "Circuit Board Tree 1",
        image_url: "https://www.arweave.net/dndu3kN-pRG_JKqvO6_QLZ7awQRXBmM9zkmLA42Zvuc?ext=png",
        json_url: "https://www.arweave.net/PE24QrLNBXA3QQGdwLUVprpqG1laqSxxXKmjn0bgMnU",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      32: {
        tokenId: 32,
        name: "Circuit Board Tree 2",
        image_url: "https://www.arweave.net/w-yQcu6FExSMfQaVU_wxKxCAk9v8QNLNpih1hEuBF4Y?ext=png",
        json_url: "https://www.arweave.net/54A4yGw-TI2p3eHW0-FNkHiS7KEJjK7J5hgoGSk9fw0",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      33: {
        tokenId: 33,
        name: "Circuit Board Tree 3",
        image_url: "https://www.arweave.net/8TRffO4pD591L3tsSRtZcsnNJ6RWpK_qOBwYqmiwXiQ?ext=png",
        json_url: "https://www.arweave.net/IKtnHt6nX7PxSjDzI-rzOEL1N57dypzXQHtAJQ37Yow",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      34: {
        tokenId: 34,
        name: "Circuit Board Tree 4",
        image_url: "https://www.arweave.net/uGIy0XRd2JrxiS6BXc6yZcfltqFgIcWrq2Rk23IFH40?ext=png",
        json_url: "https://www.arweave.net/H-r_7pJf8M-iz_ZN1aSSJClNGOJvxYpJ9X71sDTMQUI",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      35: {
        tokenId: 35,
        name: "Circuit Board Tree 5",
        image_url: "https://www.arweave.net/SPaAGtsR_FC121LbzqrcPTHmvvqlIG6U8XU6XsglgXk?ext=png",
        json_url: "https://www.arweave.net/46sNzGRRV7mmhYDCCGVw3LwyyykOPkYK3u1fN8z-sPc",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      36: {
        tokenId: 36,
        name: "Dotty",
        image_url: "https://www.arweave.net/Ksbs69xA66oOpOJcZAckPME3MCSpcP29Kce7PKbllkU?ext=png",
        json_url: "https://www.arweave.net/nY70I7zjx6U4G5GnWvxWmfLFxXoDFWhbGMg3gO85V2g",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      37: {
        tokenId: 37,
        name: "Lawn Builder",
        image_url: "https://www.arweave.net/puTkzB5-8lJh0ryCDIKcQtr_b7703LnT9FS2LW1u-Zw?ext=png",
        json_url: "https://www.arweave.net/NnWH-mVDK0xZp_AR9_lzXvJSPQa0yA_QFcMpQzqG8Ok",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      38: {
        tokenId: 38,
        name: "HardHat Group 2",
        image_url: "https://www.arweave.net/HJSZQPiz1Bh00ISZqz7GjIgAv0I-1EHDgQ3X6tapCMI?ext=png",
        json_url: "https://www.arweave.net/15SCmyf_u-eV8_oqMhxQ4vSBwvqG61j96jinQyb1zFk",
        size: [2, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      39: {
        tokenId: 39,
        name: "HardHat Group 3",
        image_url: "https://www.arweave.net/_o3s4Cms4TYKoJt-up6tiPxreKyIwJ_cDtoII6gPIqo?ext=png",
        json_url: "https://www.arweave.net/wbgkwV8jlJ8ACwIcvA1G6UMk49l3q10QDOPCCJnamZ8",
        size: [2, 2, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      40: {
        tokenId: 40,
        name: "Street Painter Back",
        image_url: "https://www.arweave.net/tVRfSYA5H5ZLjHi1twqNjftmqyFuLk1jO4X8k5yk2Ps?ext=png",
        json_url: "https://www.arweave.net/9N7xaDuiY86yZ6uvS5_e8fUpiyjotEXxRwUBf7T-6DU",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      41: {
        tokenId: 41,
        name: "Street Painter Front",
        image_url: "https://www.arweave.net/z2gL7udzvLSHlJYBFpWkHHca_3di5gw4iRQ16E_egvw?ext=png",
        json_url: "https://www.arweave.net/c9sWPpjjgD7dXKxHQ9ceumnh-o-l7VEt8PGGZcapB24",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      42: {
        tokenId: 42,
        name: "Street Painter Back Right",
        image_url: "https://www.arweave.net/u327hnCiDkoEFimBhoErgSuTFmPt31nPncEYNp99sHE?ext=png",
        json_url: "https://www.arweave.net/H_qnX6AMDjqcXlk9PQeOP6aoPk1nD49WZQhnYaua760",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      43: {
        tokenId: 43,
        name: "Street Painter Front Left",
        image_url: "https://www.arweave.net/t2tzjDWBdRx_Fp_XMzE0UcXXrFGXoXxmfMwK0crHRB0?ext=png",
        json_url: "https://www.arweave.net/iAAcIZj_x8zwq9-NPtG_x9g1CdzPZf3faCu6kYC38Rg",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      44: {
        tokenId: 44,
        name: "Water",
        image_url: "https://www.arweave.net/OLoGqOwEXGdtnJYcnQZwu5BMI_Uk_41y-RO58fs7NXw?ext=png",
        json_url: "https://www.arweave.net/UPH6WaibVZ3J4eAmQuGjHhbMC0G-spaIUMWB7v4GTKU",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      45: {
        tokenId: 45,
        name: "Wild Lawn",
        image_url: "https://www.arweave.net/3D5Nsf_oXONQzstPZaSaDz3v7ap6V8hek-DQfQncsrU?ext=png",
        json_url: "https://www.arweave.net/G9vJiTTS_28SLLJlqu7i524TlLa3znS2N_d1DnBq1KE",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
    },
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: {
      1: {
        tokenId: 1,
        name: "Creditcards",
        image_url: "https://www.arweave.net/40XQmaw3CdU6EOZ_2b7c24raCW1FX2LA17wIeoCNYcI?ext=png",
        json_url: "https://www.arweave.net/cVIzVd0ZvoOyg3cMPttlKkhgV7A0-gFm6buC_gYquEw",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      2: {
        tokenId: 2,
        name: "Verification",
        image_url: "https://www.arweave.net/K1a0ZarFqb_2e76tXJCGBGrTYUbiENmr3DMZ9pwnsMo?ext=png",
        json_url: "https://www.arweave.net/l48x9wBKaiHQ4u3yM_AYTveJioVULylMg_0IqA966r8",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      3: {
        tokenId: 3,
        name: "Heatmap Billboard",
        image_url: "https://www.arweave.net/515THlrKL1yNr_j8ghWC3_NGXlahZ1uinp2WmPpZ3UE?ext=png",
        json_url: "https://www.arweave.net/G8WaAgI0YOBUUm7cYhSr1d6f3qtdN-zCwM0Ht-wlq0g",
        size: [1, 3, 3],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      4: {
        tokenId: 4,
        name: "Phi Traffic Sign 1",
        image_url: "https://www.arweave.net/JkDRG9DDRnUOwt35q-Bla8Zq4CsyMIOVV2gEj7QA95U?ext=png",
        json_url: "https://www.arweave.net/5VDIpKP2oRtuRwdFZDJ-i8zp1GQgDmYJwHN0eAeslEU",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      5: {
        tokenId: 5,
        name: "Phi Traffic Sign 2",
        image_url: "https://www.arweave.net/zdNO0rpqkxXP9CvUCpedH0HpB66gyvgYiZzdSdX-oec?ext=png",
        json_url: "https://www.arweave.net/jXPMvEE1nShXvgVPjgzzzbudGV07rNodU-tsTSd_9n8",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      6: {
        tokenId: 6,
        name: "Phi Chopper EasyRider",
        image_url: "https://www.arweave.net/M2NSuwUWIfzSsFrjkDmWdyA_0rjhLIAcFWyrvgO2-8k?ext=png",
        json_url: "https://www.arweave.net/GI4GP9DjLYEcRTESobn4rttDmzhjSp04bj8YUsh3EHs",
        size: [1, 2, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      7: {
        tokenId: 7,
        name: "Phi Chopper StripesRider",
        image_url: "https://www.arweave.net/YLvpPKTGXaq7gMk-0UiFCOgwyMiiUsPE7yAfLpOoiM0?ext=png",
        json_url: "https://www.arweave.net/gjlFhkIg0EuPvVXbnxeSeG8yiV3-zcE-2MinG5sQoVg",
        size: [1, 2, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      8: {
        tokenId: 8,
        name: "Phi Chopper DirtRider",
        image_url: "https://www.arweave.net/R_Hxgk85mAbiZAl4TlsmNNBCCvb3jG31b_ss4tDyUvk?ext=png",
        json_url: "https://www.arweave.net/S5R1ZnRtoWk_Ppz40XCm0bVAxdwacU2Vv-qYVGsA1TA",
        size: [1, 2, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      9: {
        tokenId: 9,
        name: "Moon Rocket",
        image_url: "https://www.arweave.net/S-3JwzVb15x_HhbD4bhZvKlj3P2vcA-JcO993vVp51c?ext=png",
        json_url: "https://www.arweave.net/4j-eBHy_Mhczd28eUAT8HALQSTJytuZ7BbLyzraUlUI",
        size: [2, 2, 3],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 5,
      },
      10: {
        tokenId: 10,
        name: "Buy Sign",
        image_url: "https://www.arweave.net/NDJKWHk7sgb_hdnZUzLkd_ovnzAvlzGWeb7kQDU09xk?ext=png",
        json_url: "https://www.arweave.net/pVUXP_AUanjaclivSbPnJEB2xjM2MEdwbw1nVRF33yk",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      11: {
        tokenId: 11,
        name: "Sell Sign",
        image_url: "https://www.arweave.net/kZaLu3Lqx29FC09vhOiZE5CJiz1qd3ctFVaShuwPC_k?ext=png",
        json_url: "https://www.arweave.net/OBIVFjGVy4inXd4PKBIFQOe0Ct5vl4MC3-GGUZoH1b4",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      12: {
        tokenId: 12,
        name: "Bitcoin Snowman",
        image_url: "https://www.arweave.net/JIy87Ssc4gxnqIQHA5C_BACi4iR4oSvXHtRuiXoILOI?ext=png",
        json_url: "https://www.arweave.net/c5l7T8MOcMsX9zRxcnlbJQ1Z1bkiV9RW9Y4bPC0jWQI",
        size: [1, 2, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      13: {
        tokenId: 13,
        name: "Piggy Bank Pink",
        image_url: "https://www.arweave.net/uzqiYwctqLmLzjztp6mAGUquwWCGPUfiS2S5xKrHJQE?ext=png",
        json_url: "https://www.arweave.net/5E5xVMq7mWx8pWOULj51CXeMjt4Qx9hu13DzpFHsSeM",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      14: {
        tokenId: 14,
        name: "Piggy Bank Blue",
        image_url: "https://www.arweave.net/PSuYgSjc_6FSKg28r4u9btdDhL4mR0nsLcyci05WzTo?ext=png",
        json_url: "https://www.arweave.net/kjYIvWaUuap-hwpX1eIecujelvSuw7FuSmb-30AsDwQ",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      15: {
        tokenId: 15,
        name: "Doge Statue",
        image_url: "https://www.arweave.net/BJq7mlBi6F2XdS-9R4JeWbpCOjf-o8W7eL9alSuyO4M?ext=png",
        json_url: "https://www.arweave.net/CrIloGDoy7pvPXXgyRQMdnUTRtTMhzwud8TCJ5MIJ_Q",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 2,
      },
      16: {
        tokenId: 16,
        name: "Server Mine",
        image_url: "https://www.arweave.net/6mjlP3wuul82l_nAyHHpbSNbQuIEiUD8ekGtcPkIbL8?ext=png",
        json_url: "https://www.arweave.net/7gz5_WnWExOxZskgFTbTDdEE6iE56SaXgpzXi_Whan4",
        size: [3, 2, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 4,
      },
      17: {
        tokenId: 17,
        name: "Airdrop Helicopter",
        image_url: "https://www.arweave.net/Lwsqe7iEHzgOjvvBzjhgLAmWize6SSGWNSfr5v6XZ3s?ext=png",
        json_url: "https://www.arweave.net/6_WE3h2FGg8Oiq13RPfNvUwdFz69oS3zOK9rTIZQzrM",
        size: [1, 1, 3],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 2,
      },
      18: {
        tokenId: 18,
        name: "Billboard GM Sun",
        image_url: "https://www.arweave.net/1jReDD9q9LZh2trL4C24vPyYACrOQTDgIeTumLrinWE?ext=png",
        json_url: "https://www.arweave.net/0llAfGbMooiR2RfxoUYJdkURihEdzFlnDflKdNnFC1M",
        size: [4, 1, 4],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 3,
      },
      19: {
        tokenId: 19,
        name: "Bitcoin Chess Piece",
        image_url: "https://www.arweave.net/ft4UcdPW_xH4fjO4WKl26qo7Fmr-yn3BlHN2vCjWTXY?ext=png",
        json_url: "https://www.arweave.net/-eMlhwZNnYmikPCwlsLI-yN-hD6RYly28-McRkZVOYY",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
    },
    [WALLPAPER_CONTRACT_ADDRESS]: {
      1: {
        tokenId: 1,
        name: "Default",
        image_url: "https://www.arweave.net/0GsQqgJYsWDLGATuCh7wL_BKdd96QcL5OJ22Y8dqMeU?ext=png",
        json_url: "https://www.arweave.net/UlOBk3x7DprGGWDinzgNXfEbZ-EYR_x0nZMBzVddDLE",
        size: [8, 8],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      2: {
        tokenId: 2,
        name: "Cali",
        image_url: "https://www.arweave.net/XSPdpG4B2eXb7q8KR_b8Kv-Tj8AjPv5PvFBwtWoGF8w?ext=png",
        json_url: "https://www.arweave.net/nUvcfGH-LHrmfgF338I4z0AYmqgUy5r7hvYVmN4a6_A",
        size: [8, 8],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      3: {
        tokenId: 3,
        name: "Checkerscali",
        image_url: "https://www.arweave.net/j8mRWGsDNK94rlut9nGKG3OgWNbHHQmCWrDcdNG7U-Y?ext=png",
        json_url: "https://www.arweave.net/7ESQwfBDC-OXG0yOnSW3pe61E0R0z93C1_oFhtZDGOc",
        size: [8, 8],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      4: {
        tokenId: 4,
        name: "Checkmate",
        image_url: "https://www.arweave.net/Kdb3v4C57mKsZcgYq-wJygEGtSv6nj8zsApK6_0yle8?ext=png",
        json_url: "https://www.arweave.net/O7TpTi2YvbShamfOJ6CBZqgSwL5QVuQWwWsV8ZI-mOw",
        size: [8, 8],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
      5: {
        tokenId: 5,
        name: "Cobbleshindle",
        image_url: "https://www.arweave.net/rPdaQsm_JCDnZYWOaaLWrqUUZ4qeEXpDz4nCxPLX9V8?ext=png",
        json_url: "https://www.arweave.net/_CEyuqXxYUIofob41WHgfhwKr0ZLuxxUaSJuauJ6Mpk",
        size: [8, 8],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 1,
      },
    },
  };

export type ObjectTraits = {
  // todo: should be converted to a usable object
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
