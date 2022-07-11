import axios from "axios";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  PHI_OBJECT_CONTRACT_ADDRESS,
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
};

export const objectMetadataList: { [contract in ObjectContractAddress | WallpaperContractAddress]: { [tokenId: number]: ObjectMetadata } } =
  {
    [PHI_OBJECT_CONTRACT_ADDRESS]: {
      1: {
        tokenId: 1,
        name: "ENS Signboard",
        image_url: "https://www.arweave.net/zZoOX7qkd48YP1IV3WKbRkC0OjUIX-vy62U5-009sRI?ext=png",
        json_url: "https://www.arweave.net/bTuSaTyTiKYgx1gk_lPBZJTFndrHgIMYkuCb84QOPzQ",
        size: [1, 1, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 100,
      },
      2: {
        tokenId: 2,
        name: "ETH Signboard",
        image_url: "https://www.arweave.net/Fej44kdEFoGqU43sng3Zo3UqjOLJl8CbrxW_ALEEgsE?ext=png",
        json_url: "https://www.arweave.net/U0_6k9tcMiVkmxKczlSbX4iNMrFGkWx9veXFvj9k-_8",
        size: [1, 1, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 100,
      },
      3: {
        tokenId: 3,
        name: "ETH Motorbike",
        image_url: "https://www.arweave.net/2Vy_KC4slYVWU--uqiope9j1tAW1UsCAz81MSWMzmHc?ext=png",
        json_url: "https://www.arweave.net/zHg6UE_a2m3ZLay7cqCh6Sy5aMbcfC8XbPXI0rMYh70",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 1000,
      },
      4: {
        tokenId: 4,
        name: "ETH People",
        image_url: "https://www.arweave.net/wkWQvloaZoY8H1rgm1PdN99p4sU4vCv92NiCPaQNOzc?ext=png",
        json_url: "https://www.arweave.net/Yw_hbBffTqYBH3Z_Tu3QwjJ1VbMqGsFnoF82yWS6v0g",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 5000,
      },
      5: {
        tokenId: 5,
        name: "ETH Truck",
        image_url: "https://www.arweave.net/oCVxQ0SNTnvYjn1EzfiFoxgsgLCSsUllw7lobZbFv38?ext=png",
        json_url: "https://www.arweave.net/FNGnUgSVfO83E1WDNEGuiYT8-bCEsv7l_tqKILCwul8",
        size: [1, 2, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 10000,
      },
      6: {
        tokenId: 6,
        name: "ETH Building",
        image_url: "https://www.arweave.net/rMTI8P5V5m7E8bEKDfBsrT5PP41hSP3FoDXtoVT5f1Y?ext=png",
        json_url: "https://www.arweave.net/z_vGRaQZoUswqk4vvvhKEgP_NHS2qrkpRFn5J8YykqY",
        size: [3, 3, 4],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 50000,
      },
      7: {
        tokenId: 7,
        name: "USDC Seesaw",
        image_url: "https://www.arweave.net/iUlAJ4JzJKSX4JYXMPukNDDebhQa6vv_IUm3bBDe-RA?ext=png",
        json_url: "https://www.arweave.net/B2a3D5HfGU3XIzm4oD4_F2yrwHjDKLDwzte2bzFT_rU",
        size: [1, 2, 2],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 100,
      },
      8: {
        tokenId: 8,
        name: "USDC Card Tower",
        image_url: "https://www.arweave.net/0cEsSp-WyRV0wi7Y7Ode8S_LkuJczJscJWIh8xrTNF8?ext=png",
        json_url: "https://www.arweave.net/atuCpqajUIdCJlz6pCOfmtf372neIc3hhU1wZY-C_94",
        size: [2, 2, 5],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 1000,
      },
      9: {
        tokenId: 9,
        name: "USDC Jenga Building",
        image_url: "https://www.arweave.net/QPBEH-bw8jI74IbAWeW0lHOi5H11bSUWDJ2pcY1NDec?ext=png",
        json_url: "https://www.arweave.net/9MsvzaV1rG0sDDHUooUmeroCASQiPKh0-LHekNQPSgM",
        size: [2, 2, 6],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 10000,
      },
      10: {
        tokenId: 10,
        name: "Uniswap Chess Piece",
        image_url: "https://www.arweave.net/fk4Gltd5jAYJBZjyESFxlDTdLkN_ale-e3d4Sx3y7KU?ext=png",
        json_url: "https://www.arweave.net/e-sE5jAxNtCTHlKrWO93TGix9Yn0P-WyBX_E3tqJzbc",
        size: [1, 1, 2],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 200,
      },
      11: {
        tokenId: 11,
        name: "Uniswap Motorbike",
        image_url: "https://www.arweave.net/HuH3BqNBGco4uT2bCu-IPn3Qt6DtXThRT-uaNnpM9HQ?ext=png",
        json_url: "https://www.arweave.net/qTxpcAz1wu8C_o1OwgYqK7xh_xQQ9Bg8KLuYd2pXgoc",
        size: [1, 2, 1],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 1000,
      },
      12: {
        tokenId: 12,
        name: "Uniswap Building",
        image_url: "https://www.arweave.net/VirvNqqPf2ZjSYCVz8GBxvwRytrTxPZKGbZ4ubCMXS8?ext=png",
        json_url: "https://www.arweave.net/aX2JRMEShrymmCe6wUOJIh3CepuQDqy3tTEs5P5h490",
        size: [2, 2, 6],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 2000,
      },
      13: {
        tokenId: 13,
        name: "Uniswap Ferris Wheel",
        image_url: "https://www.arweave.net/nUAkteLkLuijuMmyih_-Uvi4_5e886yC2sQA2UnYLec?ext=png",
        json_url: "https://www.arweave.net/QkDNUSBc4p3ooGizAV7ml2ZDB_jYkLDLPdaRSQChhOg",
        size: [3, 2, 4],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 6000,
      },
      14: {
        tokenId: 14,
        name: "DAI Pool",
        image_url: "https://www.arweave.net/X-f00rfDxf8HasnVkUZzFu2GDDLt2RCAKEikoeogiN0?ext=png",
        json_url: "https://www.arweave.net/pQHpQ8KP2Pb271QVTHNeWgCEUUOkpXYrqF1s3CM6X40",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 200,
      },
      15: {
        tokenId: 15,
        name: "DAI Car",
        image_url: "https://www.arweave.net/_qMhQRjR3ww0XUQUfQsdLP3ANX1ZctfRLRnMOhywx14?ext=png",
        json_url: "https://www.arweave.net/vXmLtw3nyotkt4HzaPX4lwvLBxe7AwWOURM6P400IWU",
        size: [1, 2, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 2000,
      },
      16: {
        tokenId: 16,
        name: "DAI Building",
        image_url: "https://www.arweave.net/6c4y-ILrPuNaCkRP9I4ps7-lNzYwkaxKphYP4Oyb_D8?ext=png",
        json_url: "https://www.arweave.net/HGWLnAukr3N9fxgKRhBI7BhVQkT-DN9C5pa0qAuy77k",
        size: [3, 3, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 20000,
      },
    },
    [FREE_OBJECT_CONTRACT_ADDRESS]: {
      1: {
        tokenId: 1,
        name: "Twitter Tree",
        image_url: "https://www.arweave.net/XFTGG24Fp0J_wetrj5nrfyX2f5Y-oh5Tlu05ei3SQE8?ext=png",
        json_url: "https://www.arweave.net/j_72sXzB1jIMw2ikyj_4ZE5RXzpq2--ahYfmzqHbYlU",
        size: [1, 1, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      2: {
        tokenId: 2,
        name: "Discord Monument",
        image_url: "https://www.arweave.net/DxhSHY9Fp4m9wYuMSZ6aBNGamO5Rai5Sl7MAVMXEN2A?ext=png",
        json_url: "https://www.arweave.net/yLyXWXACjMod7lu7_aM_Ab85n1KB9NKfZDTluReoP4Y",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      3: {
        tokenId: 3,
        name: "Github Display",
        image_url: "https://www.arweave.net/zAL4CTozNHZovbKYr95c5FV-ZLYZ8ZEt5qxQkxqsGUg?ext=png",
        json_url: "https://www.arweave.net/EDVgqEsEMijQ-G0vj43l_dBbseh-tKyQLO0S-ShFZPU",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      4: {
        tokenId: 4,
        name: "People A",
        image_url: "https://www.arweave.net/2xsqrw4QAN-9wm6I7zMoR_TlQF4U_cklj9foEDn1KYw?ext=png",
        json_url: "https://www.arweave.net/a6lmGebj73H8NogE5wRTSqOxarGAgKW43wy0R3L5_Bg",
        size: [2, 2, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      5: {
        tokenId: 5,
        name: "Puddle",
        image_url: "https://www.arweave.net/camQqKoEpOtsEpBXxbpzyVbfWBlIt5wwu_ycfvgd0as?ext=png",
        json_url: "https://www.arweave.net/S6MzpnPYpMc9RJ1Nz9htjFZg7cuDAM_aVPfQbYHyhhM",
        size: [2, 2, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      6: {
        tokenId: 6,
        name: "Container Set 1",
        image_url: "https://www.arweave.net/nb676Jn65YgvaJDHbUI5rFJivvcn9J-CwRiEB5Lp7vg?ext=png",
        json_url: "https://www.arweave.net/91zpU2BQ2Whv9suuT5hpocuiLoInQKuAK6mgoo7pzs8",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      7: {
        tokenId: 7,
        name: "Container Set 2",
        image_url: "https://www.arweave.net/LH0jyNUP31bdMajZmP2z42On-oTeOZWghA2FGYUGza4?ext=png",
        json_url: "https://www.arweave.net/a6eWogwF6roHTz811N1JNy4zbDEWoU8AjOUSYSOP_HA",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      8: {
        tokenId: 8,
        name: "Container Set 3",
        image_url: "https://www.arweave.net/IFYeI-L4P7Hk-yI4MRf3itNBtE02EqMde4EzKxpHZZs?ext=png",
        json_url: "https://www.arweave.net/mMqRW3bjpIsH5UjlohUXo5LVpzebXWDHgBf0Af_1WJ8",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      9: {
        tokenId: 9,
        name: "House A",
        image_url: "https://www.arweave.net/nc2kHf8uf72z-gbAJljM-s-XXRBLDAcofkKgUCKPnlM?ext=png",
        json_url: "https://www.arweave.net/OWMlKL4Q3PMfd9XZ--aevjk4WvC6rgHy8erlnka4S40",
        size: [2, 3, 3],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      10: {
        tokenId: 10,
        name: "Red Tile",
        image_url: "https://www.arweave.net/vm8MMZxP2T0uazFz40gJ76fYDv8iFMh8fccb-5EZq9I?ext=png",
        json_url: "https://www.arweave.net/BbjCM8UgTbVuOeiCtmoHwYfC28mBfKQ0pby49Lu-bXI",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      11: {
        tokenId: 11,
        name: "Blue Tile",
        image_url: "https://www.arweave.net/k_eXPLe67t555Wyhcj4pA1LqaKOR3YlkyYe1vXSx7aM?ext=png",
        json_url: "https://www.arweave.net/wd5HAu4T06VfLN-FJiD2D3h2d3gh2XTMAoil3oX5B0I",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      12: {
        tokenId: 12,
        name: "Yellow Tile",
        image_url: "https://www.arweave.net/1En6bcQlhoaogVvY0w98VU2tZbdiCeFO4Yxi5s-hjAc?ext=png",
        json_url: "https://www.arweave.net/qRobWIvtAwSi0tlycxh4Kc6LHXCzluZPD6wqYld7ud0",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      13: {
        tokenId: 13,
        name: "Green Tile",
        image_url: "https://www.arweave.net/GCjgLm1KHRtGAXqbocrk9FSFWtByW7N_dqJnAN_ilos?ext=png",
        json_url: "https://www.arweave.net/GhPleITNwKEJOcD86o6EmTv5jzT0UeQZq8SJyLnh0GI",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      14: {
        tokenId: 14,
        name: "Black Tile",
        image_url: "https://www.arweave.net/MYdq3IRBDC6Cirrl0OUqbwh2eZ_yz64HbIA8ZUZzhD0?ext=png",
        json_url: "https://www.arweave.net/eYYhUEdFpLfw7cM2uo-rjvgctgi8bPuyINFJDAHnC9g",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      15: {
        tokenId: 15,
        name: "White Tile",
        image_url: "https://www.arweave.net/z6p6GB_c19jiGcddeNc9A22CcP-VhZn0LV0ACJqDIAA?ext=png",
        json_url: "https://www.arweave.net/SKclMJ70_fng0Edhp4LChZGfimI-dFoh0aXpz5JrOsM",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      16: {
        tokenId: 16,
        name: "Street Straight X",
        image_url: "https://www.arweave.net/EjY6M9ObQPT8WiVRimaT16-J71HJW9q2enqMTpQphJo?ext=png",
        json_url: "https://www.arweave.net/U-omHQf4mjmJXSuvZNT4LPKhig9JzAqvaLY1AQ2dhoo",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      17: {
        tokenId: 17,
        name: "Street Straight Y",
        image_url: "https://www.arweave.net/LbGkQs3nVG8bJzB-aCRUKoFAtToenUtYh9M1Bfi1qyQ?ext=png",
        json_url: "https://www.arweave.net/1t-fOkBSRgacSxNkANVY5SIWCyn65AQXAEZKmFbA5jM",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      18: {
        tokenId: 18,
        name: "Street Crossing",
        image_url: "https://www.arweave.net/NCtwC4n-Qt5Z4dJHF72ONDUINbplXpI0JDrz-MAQGxs?ext=png",
        json_url: "https://www.arweave.net/TjtnT3pVEvqrHKL_XCEoJroQlcuV3pSFefrWv64rFME",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      19: {
        tokenId: 19,
        name: "Street Corner Top",
        image_url: "https://www.arweave.net/ua-9aEJerFcSgqto4cx2K2Y-oWKAnGv6Sxl99BdGKGQ?ext=png",
        json_url: "https://www.arweave.net/dIUa6tLuG3oQEQQ7iBuItthpf3zYdlHs7AYEEz4MVXk",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      20: {
        tokenId: 20,
        name: "Street Corner Right",
        image_url: "https://www.arweave.net/XIF3BlEN6hM0aAqrVuzBn9Bh5E0CbRtE-IgqzibNZVA?ext=png",
        json_url: "https://www.arweave.net/caPc-t5znwCFZLwBmWChnnoA2BJ8ybjiSD7W2BWLSWU",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      21: {
        tokenId: 21,
        name: "Street Corner Left",
        image_url: "https://www.arweave.net/1loVbC4D6ubG_u4tpcFnNfVd8kapp7-551V0EEQTnoc?ext=png",
        json_url: "https://www.arweave.net/EOdWQLLDvhBxpI7NEYgo__ILIRN-oP79oghW38793u4",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      22: {
        tokenId: 22,
        name: "Street Corner Bottom",
        image_url: "https://www.arweave.net/57ngw00Rzk8ErLtSuQIhf6tNpNJNbTZ4vpKaNdNSPBc?ext=png",
        json_url: "https://www.arweave.net/pAY6dPno1tjkS5e2k8Gb5pxsWWpd9Wy30HxXPCVjWek",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      23: {
        tokenId: 23,
        name: "Street Crossing X",
        image_url: "https://www.arweave.net/Um--02tqrBS3It_ZuLzGTBag2gUxW-TvHnYgXTg_rYY?ext=png",
        json_url: "https://www.arweave.net/MShdg9SLTagfLNBS9H28cVPGERl6pTRpwwxsFJlIEIE",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      24: {
        tokenId: 24,
        name: "Street Crossing Y",
        image_url: "https://www.arweave.net/iIxLchbrNQisKjHyOolgEM4MD3akpmom8juX1F4Q-aw?ext=png",
        json_url: "https://www.arweave.net/XmF77ckCZRCrNaQZnMzjdfNhyWChnLMA7YmMBesowZE",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      25: {
        tokenId: 25,
        name: "Street Phi Logo X",
        image_url: "https://www.arweave.net/-juAU38rYfaT4q-TOiui-BtG7smjETF8VFq9dVjl_1M?ext=png",
        json_url: "https://www.arweave.net/Empchx4Wpspd6G60VjwoFSNYwuFxHSi4yPf3iEJ7Gdk",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      26: {
        tokenId: 26,
        name: "Street Phi Logo Y",
        image_url: "https://www.arweave.net/qWsiwyD_CF4Ogpt4B9cYOr4bzVgYsqX93tYE1kOCDas?ext=png",
        json_url: "https://www.arweave.net/BbLUMWW8nJzTMfTnO7rNTrwKOaX45-OMoPTBV4MHjA8",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      27: {
        tokenId: 27,
        name: "Street Blank",
        image_url: "https://www.arweave.net/SJWeXuzhCEcUN0b1vT90-IAabuscPUcLalveGH_drtM?ext=png",
        json_url: "https://www.arweave.net/iNcxMtNh2So4CS6mQ9JnufW8rouushtF5wVYxOJS6D0",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
    },
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: {
      4: {
        tokenId: 4,
        name: "Phi TrafficSign 1",
        image_url: "https://www.arweave.net/nxA2Za1avhXvXcUSc2_7S3sSaUQs9UNoTaZUBZgToo8?ext=png",
        json_url: "https://www.arweave.net/B-uoml1C53BWQikZdpWCHh0wvfwa9O8jAzyiP4S2zYk",
        size: [1, 1, 2],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 20,
      },
      5: {
        tokenId: 5,
        name: "Phi TrafficSign 2",
        image_url: "https://www.arweave.net/Mbzfc7ZW4jdz1j6CBQRj4hkdT_Rp5cHt4R1VL-N-5K8?ext=png",
        json_url: "https://www.arweave.net/K-GcUd3ec5vBgbKdwtOukVhYIwGYPkuHU2tpCjn-HE8",
        size: [1, 1, 2],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 20,
      },
      6: {
        tokenId: 6,
        name: "Phi-Chopper EasyRider",
        image_url: "https://www.arweave.net/RWTQ16cJmz0HvaJU5-G-cn6OTkriYdg7gteDDJDTRlc?ext=png",
        json_url: "https://www.arweave.net/JYo_cfEu4RERBVj2hgB9Od2ZxcF9Bx2NMSpc2EZ843U",
        size: [1, 2, 1],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 40,
      },
      7: {
        tokenId: 7,
        name: "Phi-Chopper StripesRider",
        image_url: "https://www.arweave.net/O6GXFRPPrtqIDtijw5QQkF7kaTEtMBYVnilzwK6UB8o?ext=png",
        json_url: "https://www.arweave.net/azqeSHKcxG-ktwbt7T0EZesVmOpvbSp4ek6fiDirGw4",
        size: [1, 2, 1],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 40,
      },
      8: {
        tokenId: 8,
        name: "Phi-Chopper DirtRider",
        image_url: "https://www.arweave.net/vp-DeStQTrEYS5M9uxsGLiF7S63RIKT2p2L6dTgdgaU?ext=png",
        json_url: "https://www.arweave.net/Zy2rAOqavj1usn0Tl3cjZEULw01PPX9z9Ww4aO9ygLA",
        size: [1, 2, 1],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 40,
      },
      10: {
        tokenId: 10,
        name: "Buy Sign",
        image_url: "https://www.arweave.net/QRKDHgAweb0xwOZs2biOJE_NMq6h-k2So7iCQy_TaSc?ext=png",
        json_url: "https://www.arweave.net/roatFQcSlbK2xG_K9HazHwowy6dzOaIcgzu9Gx20SjQ",
        size: [1, 1, 2],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 20,
      },
      11: {
        tokenId: 11,
        name: "Sell Sign",
        image_url: "https://www.arweave.net/MsEvPZIdzg4lT7xDYbOTGdOh9KH-xWZtZ8FJAHGLvFM?ext=png",
        json_url: "https://www.arweave.net/cg3_f-uIOYWd56YDxPDnUoJrifeBK4BCfW32uwOYTyQ",
        size: [1, 1, 2],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 20,
      },
      13: {
        tokenId: 13,
        name: "Piggy Bank Pink",
        image_url: "https://www.arweave.net/84JttX_6gUlMCBUF1U1yVbVwKAwlOcq-Hb-K8odW7g8?ext=png",
        json_url: "https://www.arweave.net/-VyIjYmEkcJI3lHg2kC5E0PifprrUgOX3QMeAwUY4CA",
        size: [1, 2, 1],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 60,
      },
      19: {
        tokenId: 19,
        name: "Bitcoin Chess Piece",
        image_url: "https://www.arweave.net/0QLkTyXk7r3olkbY3OndjU_wOy7LDvrkyltl8XklYgE?ext=png",
        json_url: "https://www.arweave.net/DIC_LjfXDvoIXDo8BssDt-ZX3Jo-QnQIXQYrCR86p_c",
        size: [3, 2, 2],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 20,
      },
      20: {
        tokenId: 20,
        name: "Tezos Chess Piece",
        image_url: "https://www.arweave.net/2eNPGg7V3eyDPPhy9ATAdd5rWuulyskK64ixKfKKez4?ext=png",
        json_url: "https://www.arweave.net/kafByUuq7vbxm-q-xXZ_s2eUhrs4v4XHT7CqUvS8N_s",
        size: [3, 2, 2],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 20,
      },
      22: {
        tokenId: 22,
        name: "PHI Shrub",
        image_url: "https://www.arweave.net/4r3L7KYO6C5bjSJrAHOdHcYjhBj3dpFEeVCyCMhZjro?ext=png",
        json_url: "https://www.arweave.net/tSXzSnriqDZVeXKvJGqXdXM9QxcPH_mD8iWWHE8tHSU",
        size: [3, 2, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 20,
      },
    },
    [WALLPAPER_CONTRACT_ADDRESS]: {
      1: {
        tokenId: 1,
        name: "Default",
        image_url: "https://www.arweave.net/A4Zg4LGVMSMri9ypkRSG9zF_AhmIwOvuJfHIC_KXWTg?ext=png",
        json_url: "https://www.arweave.net/NwB7NqrkmbeW96F9cJKKZY4DVbjrluSWe_W1fNPy484",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      2: {
        tokenId: 2,
        name: "Cali",
        image_url: "https://www.arweave.net/eTRzk6NYBoYxW6Z4woOo0_NAlUC4KkjKIxAWua72PrQ?ext=png",
        json_url: "https://www.arweave.net/8o-wx6UNmfMXRyTOl3AOJScCahhepQ4oSL9NIxi0sAg",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      3: {
        tokenId: 3,
        name: "Checkerscali",
        image_url: "https://www.arweave.net/rmr9ubFZayxSrGrEjvd-vgpGzOXsIi-PAIezU7NhAFg?ext=png",
        json_url: "https://www.arweave.net/rz2ldHOqCCl6dxCtORTXNYT7CMA-8IF_MXHUblvQaNU",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      4: {
        tokenId: 4,
        name: "Crossdirt",
        image_url: "https://www.arweave.net/tiHKCbRqhYcClB-6U9XXdslsUrZJxpkgalRkvIzIaq8?ext=png",
        json_url: "https://www.arweave.net/PMTNxss9Sy8qIy59eEqiDrmD5IcVFnL8dWjxuV7g5rs",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      14: {
        tokenId: 14,
        name: "Logoisoisospaced",
        image_url: "https://www.arweave.net/2-g-SmCzF2Me6P76dcfj7Yt61qNtmKw7tipgZtJk8sc?ext=png",
        json_url: "https://www.arweave.net/QrfBRXzphQ9Q2SkycNNCdoPeapxDX7L8oBl1SpsDbvc",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      15: {
        tokenId: 15,
        name: "Logoisoisospacedorig",
        image_url: "https://www.arweave.net/795dKnnyQ0g8oVUmITtJnTHJ_u4xBa8coBGXaXr2zCE?ext=png",
        json_url: "https://www.arweave.net/spBs3wBEW8D1D87LKTiVzzQm7EvkeBw94H1UJfWRhJs",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
    },
  };

export type ObjectTraits = {
  attributes: { trait_type: string; value: string }[];
  // attributes_map?: { [trait_type: string]: string };
  name: string;
  description: string;
  collection: {
    family: string;
    name: string;
  };
};

export let objectTraisList: { [contract in ObjectContractAddress | WallpaperContractAddress]: { [tokenId: number]: ObjectTraits } } = {
  [PHI_OBJECT_CONTRACT_ADDRESS]: {},
  [FREE_OBJECT_CONTRACT_ADDRESS]: {},
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: {},
  [WALLPAPER_CONTRACT_ADDRESS]: {},
};

const getTraits = () => {
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
getTraits();
