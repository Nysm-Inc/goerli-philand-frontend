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
        image_url: "https://www.arweave.net/J3nKEB_czj13TuTyeMZlT5vletFBKNYVb1VndZRiQfM?ext=png",
        json_url: "https://www.arweave.net/KK1-AZKdLhbLgiUWmmbV6o94P8srnxiMaT_pKt2oBYc",
        size: [1, 1, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 100,
      },
      2: {
        tokenId: 2,
        name: "ETH Signboard",
        image_url: "https://www.arweave.net/h6gfFrJUrKRfbIq0O9A57_ytIwclKse0GjiqVU67TW0?ext=png",
        json_url: "https://www.arweave.net/kuM6YIHkJbt4PHojsn-2ICPzUDKZmhI7QJp2c7Yr_Xg",
        size: [1, 1, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 100,
      },
      3: {
        tokenId: 3,
        name: "ETH Motorbike",
        image_url: "https://www.arweave.net/nb1dS2agA93-1IWRzez1ePZhkhHVh0-ePgfbLO42nd8?ext=png",
        json_url: "https://www.arweave.net/X7Z11fGRzV5VCh1BiTl1Drf2UEBvVxmiS8Pe4W7tmBQ",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 1000,
      },
      4: {
        tokenId: 4,
        name: "ETH People",
        image_url: "https://www.arweave.net/L5OrHmyhLwD68kNCXdhpXotHXI4a7T74_TfDhSBwts8?ext=png",
        json_url: "https://www.arweave.net/r_f8WsusZGxLBJkqGOCWFMsukC2LkDWNiA9EWqNaLcw",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 5000,
      },
      5: {
        tokenId: 5,
        name: "ETH Truck",
        image_url: "https://www.arweave.net/GU2ChAJkqAvUYmEtHdi0jU5Qt5nnP2qOUcCvdqCyi1g?ext=png",
        json_url: "https://www.arweave.net/IMV3iYz90tusVqhFEIJvVxUpxtcLVUdxwcfGUXUomqY",
        size: [1, 2, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 10000,
      },
      6: {
        tokenId: 6,
        name: "ETH Building",
        image_url: "https://www.arweave.net/OQRrD-cCEOBp8y7TQpJhLKG2JOxGNQEGDgF8fys6LgY?ext=png",
        json_url: "https://www.arweave.net/r3NnKZiECMw_xU6miasWGhcX5OfcuI8-f4IHYy9eRnk",
        size: [3, 3, 4],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 50000,
      },
      7: {
        tokenId: 7,
        name: "USDC Seesaw",
        image_url: "https://www.arweave.net/V79a28Kwny8nbrSGolA2GIpDhXixjMA0CoCQWeVJbdk?ext=png",
        json_url: "https://www.arweave.net/MUbG0Bx5e0UbKNxdkMQyO5Edx_hbBE5-Pq2mtXsTppE",
        size: [1, 2, 2],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 100,
      },
      8: {
        tokenId: 8,
        name: "USDC Card Tower",
        image_url: "https://www.arweave.net/_SmwZ9hz7k9o-wHDziM0iPUPLn3uk4W7dPpPYKWHErg?ext=png",
        json_url: "https://www.arweave.net/4mtqXrhXi8-i7NVD2BF6tU0ZCPY_YvCcL1xV2-74vHk",
        size: [2, 2, 5],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 1000,
      },
      9: {
        tokenId: 9,
        name: "USDC Jenga Building",
        image_url: "https://www.arweave.net/AAl9SPPiWhyzqC9-zQKZVgdUxou9urdtg90u93d7ZYk?ext=png",
        json_url: "https://www.arweave.net/TDDqYQF7RyApkzRvLbNFouijDnd3TN4s5UySQVp8TSc",
        size: [2, 2, 6],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 10000,
      },
      10: {
        tokenId: 10,
        name: "Uniswap Chess Piece",
        image_url: "https://www.arweave.net/Cr2gPGKhKRcxy3WjoipPpc46JWSCLOPJUOLqKWE7NPc?ext=png",
        json_url: "https://www.arweave.net/jRM4mmGHIeesYoWVDi4b6Zki5u_xADNq4t6Gxsll1A4",
        size: [1, 1, 2],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 200,
      },
      11: {
        tokenId: 11,
        name: "Uniswap Motorbike",
        image_url: "https://www.arweave.net/lk1o3jZIOWtumKfBuCAXBydX7Wb_hPeg1g0NmrfjQzk?ext=png",
        json_url: "https://www.arweave.net/yeiFQgTZdpqF_o-3CgJQc4OmofqbvjHpyTxB-D6b4Co",
        size: [1, 2, 1],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 1000,
      },
      12: {
        tokenId: 12,
        name: "Uniswap Building",
        image_url: "https://www.arweave.net/fuW9VLPzVKgIHKMEvqXDE4i6MtHINbKQ-zatFUqrx4o?ext=png",
        json_url: "https://www.arweave.net/zoQAL2tva9FY9keD6LFyzB_YX6SI8xi9ndsg0ub6Nqo",
        size: [2, 2, 6],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 2000,
      },
      13: {
        tokenId: 13,
        name: "Uniswap Ferris Wheel",
        image_url: "https://www.arweave.net/iadP3fKJit4a6znqEX_MihI7aBd4DUJNoj2R0mdpL10?ext=png",
        json_url: "https://www.arweave.net/IFOhFI9vtHsWLKOkgLEh--PXu17zqux3rkMOtKjfpcw",
        size: [3, 2, 4],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0,
        EXP: 6000,
      },
      14: {
        tokenId: 14,
        name: "DAI Pool",
        image_url: "https://www.arweave.net/CL5LJ3gbquTXEUSf5xD-XgvCSXa6rCKFVL-lJlGw7Jw?ext=png",
        json_url: "https://www.arweave.net/w-4UHbVQUND7P6GM11vfYWLoIWjWA-SvBw-kGs9NYEk",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 200,
      },
      15: {
        tokenId: 15,
        name: "DAI Car",
        image_url: "https://www.arweave.net/9gE-2tDS9gY13ibckX7pqNjN_r_6XJcJXhcrot8OVJY?ext=png",
        json_url: "https://www.arweave.net/AADyaqecb_4CtvlyuVQgAKCj9SKFPVofYFYjEW0zCkg",
        size: [1, 2, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
        EXP: 2000,
      },
      16: {
        tokenId: 16,
        name: "DAI Building",
        image_url: "https://www.arweave.net/SvhGltPvEn8Lqt8QFaj5FeAUFCHnXYlbZ5lPEi9MU1U?ext=png",
        json_url: "https://www.arweave.net/3QmFhp0Q1isGdqyhPw6M79fKr5GrhEUfaR9UsF-aAWw",
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
        image_url: "https://www.arweave.net/6j2kj5uGbtOQFQY0JHpQSS8vfGqzt6JwlVPUNNRkqGI?ext=png",
        json_url: "https://www.arweave.net/Mq0HORYrbkGcuAjarhUQWE6y1K0qviIWDw5xoTuDwr0",
        size: [1, 1, 2],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      2: {
        tokenId: 2,
        name: "Discord Monument",
        image_url: "https://www.arweave.net/ekt7B3Q3aRR8K2bNB9njIU0xVcUuvgQdXpis_TMbKGk?ext=png",
        json_url: "https://www.arweave.net/9a71-M8-jyPvTGnEBjFrt9dclx4MEeN1aZ-WvqSwUFg",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      3: {
        tokenId: 3,
        name: "Github Display",
        image_url: "https://www.arweave.net/hm-CD9NPqssVVc-1k23Jm2MUkvFrS6JR-zes6y5j8Ao?ext=png",
        json_url: "https://www.arweave.net/ql754o9JzLPyCFXchHk3je6e8c5Jc0wapKfuQkRKqzo",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      4: {
        tokenId: 4,
        name: "People A",
        image_url: "https://www.arweave.net/Q1rNoiemgXa9NXzfRIuxx7OFfrtnaHeVSh3cTXU63Cw?ext=png",
        json_url: "https://www.arweave.net/WhqNWVXhQJG3KmQdfp2irs2LcBi6OB1a4UsB1J5-vwQ",
        size: [2, 2, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      5: {
        tokenId: 5,
        name: "Puddle",
        image_url: "https://www.arweave.net/gGz8B3l-bC3kfFanOcZf5hVTHJZxP14M6vmRwd7keE8?ext=png",
        json_url: "https://www.arweave.net/IBdHzFCIfWmnGmbSCAc24XgUvMc_RoTDy7ZN33uTJkY",
        size: [2, 2, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      6: {
        tokenId: 6,
        name: "Container Set 1",
        image_url: "https://www.arweave.net/BOmXhleMEaabBvsGO7s7yIggtCz8u08MMfhrOKYe0o4?ext=png",
        json_url: "https://www.arweave.net/1v4DQIVBIwFMVaeGDyl25PQglMgIg1piHVLyVbjn_qk",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      7: {
        tokenId: 7,
        name: "Container Set 2",
        image_url: "https://www.arweave.net/ndqCfDqawxw5dThq0OtqraNcBBQpetq0-_Eez1xSeRU?ext=png",
        json_url: "https://www.arweave.net/ItsgCplGM4pnW_VUflv0rj1Lg-3q7xTSsHcMnpZD8eI",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      8: {
        tokenId: 8,
        name: "Container Set 3",
        image_url: "https://www.arweave.net/mDLidTLXIt9d2u_JQLXKglovAIhgpuMN3Ir_rPLIZ8k?ext=png",
        json_url: "https://www.arweave.net/JXUKfHjfdaucuJ9vLbiH7Js8kQz-mnl26xi6hEnL1_8",
        size: [1, 1, 2],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      9: {
        tokenId: 9,
        name: "House A",
        image_url: "https://www.arweave.net/2ZmuxpL3G5T7u3YOoAt-TkBcsW0XycHJ0IQy9Bhg5jg?ext=png",
        json_url: "https://www.arweave.net/jV3GJ1HHkc4oSTy1aGZC_rEeR5FHTBlVrZ1ittU9L-E",
        size: [2, 3, 3],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      10: {
        tokenId: 10,
        name: "Red Tile",
        image_url: "https://www.arweave.net/KQPXsVIHdGwaRCGE5sMIfB1tZWiyb1gAgmipdmzCSOk?ext=png",
        json_url: "https://www.arweave.net/b_ZATV1A3gXWpGWPho0NBvyanFHINXP_lRmNLeq1fBU",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      11: {
        tokenId: 11,
        name: "Blue Tile",
        image_url: "https://www.arweave.net/zbsLX7r2abibTNAPBQCtX-01zxUV81ourmOWpRrChOs?ext=png",
        json_url: "https://www.arweave.net/kd2jJWv7HC0sVnnQlNyUEcvPQnJ4R1_EXYOOaiYoItU",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      12: {
        tokenId: 12,
        name: "Yellow Tile",
        image_url: "https://www.arweave.net/ro3oR-k1ECiaxz9Iaepm200S8UHTnt1qgD2MCLBEdDo?ext=png",
        json_url: "https://www.arweave.net/lZ12A_s6Z2LXWJRM3piNx6UUnM60uxSXsYeJO6m2pwc",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      13: {
        tokenId: 13,
        name: "Green Tile",
        image_url: "https://www.arweave.net/kgszq3r5AfnGpDdmci8IwHEX9VIcKWPYS3ZydzbkNdk?ext=png",
        json_url: "https://www.arweave.net/-V7ZCihxKrnvwcyIHgzOGnu3LkuW2xGk0mLk4vo7Qbw",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      14: {
        tokenId: 14,
        name: "Black Tile",
        image_url: "https://www.arweave.net/LgsS9KyymsswLYE9ffe1Tbpm91edLlcDQQCKt-yjIi4?ext=png",
        json_url: "https://www.arweave.net/u2RYO-LUj2FtSB_plFOlo73N2KUfWVa2uv7XB1Y9Uvc",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      15: {
        tokenId: 15,
        name: "White Tile",
        image_url: "https://www.arweave.net/9cQ8Jeds7laTK6oujSYSfD_SY5QSVgHvxbg6DV-CbEo?ext=png",
        json_url: "https://www.arweave.net/a4-7Eu4oDV6Cct5Ju2mWlLkPeDhetZG0ItjByZoWbtA",
        size: [1, 1, 1],
        creator: "ta2nb",
        maxClaimed: 999999999,
        price: 0,
      },
      16: {
        tokenId: 16,
        name: "Street Straight X",
        image_url: "https://www.arweave.net/Tzbc78qsbMUhP7OscicBPLBtVd1Meaeh4bs6D4VDfQU?ext=png",
        json_url: "https://www.arweave.net/6guXNYHqoTEAEqHTYWJawRfHA-n80wJsBzfViGshiUw",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      17: {
        tokenId: 17,
        name: "Street Straight Y",
        image_url: "https://www.arweave.net/MCx4QBo8rDvt7BOjFUSdgaSr9kDnV3oP2mUB-q1w8VA?ext=png",
        json_url: "https://www.arweave.net/CjcblCSOLrEdyTm03c58IV-inL-ec5c1x_m4SLXX0Io",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      18: {
        tokenId: 18,
        name: "Street Crossing",
        image_url: "https://www.arweave.net/3CpsDouvUzrY7_iXQx0KJnux6ywBZmA2b4BTO5ddu8A?ext=png",
        json_url: "https://www.arweave.net/SWh2tOE1_JxBDFmq0b9WD_4XM76QJoLvuu4uxigHOGo",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      19: {
        tokenId: 19,
        name: "Street Corner Top",
        image_url: "https://www.arweave.net/wC3O7ttvlE__6kNK43ySPKl4u7LElA4ZsN8nMG-8CfY?ext=png",
        json_url: "https://www.arweave.net/Emg9E6kiIIkGtmKKrSg9kMW8zy-JUiuOSnQRYUirk0U",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      20: {
        tokenId: 20,
        name: "Street Corner Right",
        image_url: "https://www.arweave.net/yxBJA6mhuxegNbtv7zbAJaFKKT3gOByBfnddMU3qrzo?ext=png",
        json_url: "https://www.arweave.net/15UKnjrG_PIl7ttld7J-rsg4cJ2DzVCailcryYRgXbQ",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      21: {
        tokenId: 21,
        name: "Street Corner Left",
        image_url: "https://www.arweave.net/l9-QoYNLvNCvvFRzGJeeXB3lLtLHaR_-99Kp7_a89YQ?ext=png",
        json_url: "https://www.arweave.net/mOuRYAGYpNsdZvnsiwFrilosTaoH-GHUZkb-5jtzdew",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      22: {
        tokenId: 22,
        name: "Street Corner Bottom",
        image_url: "https://www.arweave.net/-Zjk3XXpNGBPeFSplUhU7aU2p3ingiUa7YMk9_zLjZY?ext=png",
        json_url: "https://www.arweave.net/GCI5Jm2d2WboTtCWOLYukF8aJittOB0Q1l3rWJdfUb0",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      23: {
        tokenId: 23,
        name: "Street Crossing X",
        image_url: "https://www.arweave.net/zNNvASY7XLbSoAmjQT0l6JpcLm0K-FIZATNidVUhPSg?ext=png",
        json_url: "https://www.arweave.net/ObnvYDF7_v2OIRshnUwdqoIBsODqEKUBUDDVuJ1wxs8",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      24: {
        tokenId: 24,
        name: "Street Crossing Y",
        image_url: "https://www.arweave.net/i-woRZPKwpBe6W_xB3d2RIqE-Ce2Y_Z3arR-m5Er8oM?ext=png",
        json_url: "https://www.arweave.net/6BopybXdwOrejVMhUpeaNbiMy9LYy0ZAjH_GXDwKGQU",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      25: {
        tokenId: 25,
        name: "Street Phi Logo X",
        image_url: "https://www.arweave.net/dxZDR4tvXajW1g5_ukrL5dVHhR021xzNPSb-yh_m9V0?ext=png",
        json_url: "https://www.arweave.net/IptJdUzxQmwJJV21wmZlsUZOrgBXcYoWQsWV8fZGRbY",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      26: {
        tokenId: 26,
        name: "Street Phi Logo Y",
        image_url: "https://www.arweave.net/Nn07I8v5JG6uO9k8YqpGuqZU6yUJUP8e3zl4bBACrnc?ext=png",
        json_url: "https://www.arweave.net/TGAmVoMSrpdlONMeumtBEpRkJ_v99nDGyFV-M4hRfbU",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      27: {
        tokenId: 27,
        name: "Street Blank",
        image_url: "https://www.arweave.net/dCS8jwHdgI61P1rQzNw9f7wSx3Gwcz9wUUKT6jjbGgU?ext=png",
        json_url: "https://www.arweave.net/vJwh9rH0oIk8780KRwbqaACOlRl4jvJ9qubyjoLnyy8",
        size: [1, 1, 1],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
    },
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: {
      1: {
        tokenId: 1,
        name: "Phi TrafficSign 1",
        image_url: "https://www.arweave.net/IvabPSD21vUaihbNSqBzX2TaLIDlnmtmUURo2avx48g?ext=png",
        json_url: "https://www.arweave.net/_izfA34G7HPlCrgeRScaaqGF5eDjIpUw18md1fjGazs",
        size: [1, 1, 2],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0.01,
      },
      2: {
        tokenId: 2,
        name: "Phi TrafficSign 2",
        image_url: "https://www.arweave.net/6FIfMVlDvSTycFeRHy9ygdojkrSXrolCQZ7_Q8jDINo?ext=png",
        json_url: "https://www.arweave.net/6mcm5903CmAjhfE5qmkqKiigvIfJK1j8ewNb1Gud16Y",
        size: [1, 1, 2],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0.01,
      },
      3: {
        tokenId: 3,
        name: "Phi-Chopper EasyRider",
        image_url: "https://www.arweave.net/vscwKD5NhURV-237bDdU1fPC_crg5VTTPbj6t6h7ysc?ext=png",
        json_url: "https://www.arweave.net/QdcMRFpOl1p9LZjBI2n-1otUZASY0-k36hZnL9T1r0A",
        size: [1, 2, 1],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0.02,
      },
      4: {
        tokenId: 4,
        name: "Phi-Chopper StripesRider",
        image_url: "https://www.arweave.net/LgCziQb5e3SdJ2zQkrsktykgB8XcgF-BMbJOxPLJSOY?ext=png",
        json_url: "https://www.arweave.net/MPymA2Y7hU5NgFcFApFfPZpMnMSysiFrAzpWSt_Zj5A",
        size: [1, 2, 1],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0.02,
      },
      5: {
        tokenId: 5,
        name: "Phi-Chopper DirtRider",
        image_url: "https://www.arweave.net/JTDEgLkWPwiw5acmRZ9LfzUZbkT41-g8Vq-Otopp8Qs?ext=png",
        json_url: "https://www.arweave.net/XMJawJGO0egXFcZGEb1A2GG8fYhptAhuyW-1LxdM0uw",
        size: [1, 2, 1],
        creator: "eboy",
        maxClaimed: 999999999,
        price: 0.02,
      },
    },
    [WALLPAPER_CONTRACT_ADDRESS]: {
      1: {
        tokenId: 1,
        name: "Cali",
        image_url: "https://www.arweave.net/sS4Dt7BU6u1rauntoH7berk3Or46AhWInya2Dlm2mVM?ext=png",
        json_url: "https://www.arweave.net/PAjpbMkd4OBNFg5H25qWAJz5uqLpCMjjd_1q48xkHCY",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      2: {
        tokenId: 2,
        name: "Checkerscali",
        image_url: "https://www.arweave.net/raOAHo79uG326A4OU6-tFBCh3YD_UU6KKya9XNFUuuA?ext=png",
        json_url: "https://www.arweave.net/xfA5ASvNqUWSyBlB5UfvaYlYqc9yCN0Kme1zR7kRfm4",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      3: {
        tokenId: 3,
        name: "Crossdirt",
        image_url: "https://www.arweave.net/6-OFlv78nasA3g9XBd1aVzbwAXIP-KLsaMuErg8EPy8?ext=png",
        json_url: "https://www.arweave.net/gQ7u5oHsEvr78x4FOmNbkGX4dDXG2MDMYeVXrMrZqSc",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      4: {
        tokenId: 4,
        name: "Grid",
        image_url: "https://www.arweave.net/V8Nlng5A9Jn10Xn7-bmHmuScZCE_iLeDD41QzdlPeoM?ext=png",
        json_url: "https://www.arweave.net/FNFL1T5TdS-LpzjOKwQHXRcgr0IIFA9me5RZMMHnzk4",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      5: {
        tokenId: 5,
        name: "Philogo",
        image_url: "https://www.arweave.net/oA8AVRrWvKQYATBDCMGFdl4jFBez9nek99ZmllLtW3Y?ext=png",
        json_url: "https://www.arweave.net/27871qFZH-U76uXVgulxqLsG81zmgGkiikQfXjLb8R0",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      6: {
        tokenId: 6,
        name: "Picnic",
        image_url: "https://www.arweave.net/T4KqyuCvGTnU1cI7CtoxKg9WbtPr4ia5rsfb2PYqYzg?ext=png",
        json_url: "https://www.arweave.net/FDYNumJ5jelmGx_eKFtvmBOvhrB3xXhBOhIo7OzhjSY",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      7: {
        tokenId: 7,
        name: "Picnicmime",
        image_url: "https://www.arweave.net/EHzAbc3JMsrmYYRbePRKk76sh2e3uNYU1_UNN0TUGG0?ext=png",
        json_url: "https://www.arweave.net/gVnwoZX6_ojSQnnEl6RO2J_rYrLCBwcm47_7sWxZtj0",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      8: {
        tokenId: 8,
        name: "Procomp",
        image_url: "https://www.arweave.net/KGpi5b9A8hFEoj_abTG53Ecm87roaX4RqQGDZQrS8sw?ext=png",
        json_url: "https://www.arweave.net/3K2cFU3jwYNnUqV3PO9HLv6tE3e19qKsp-umYRli_GA",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      9: {
        tokenId: 9,
        name: "Softone",
        image_url: "https://www.arweave.net/eq643Q5G_-9VO7noUgvWENwnPs1n0N5IZRNQ9UDfFcc?ext=png",
        json_url: "https://www.arweave.net/3PfY5-nc7jUU4MsHCc5xgJlDl_AZ5Vv1aJqTHEMkzDc",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      10: {
        tokenId: 10,
        name: "Softtwo",
        image_url: "https://www.arweave.net/uXnjUby6VKzDrQBgOa_cRYoj41b_PgJCrLwOa7llUhQ?ext=png",
        json_url: "https://www.arweave.net/le4algEdCx8CgIOlA0o0Yj-04EZga0S9nU54vAf3BT4",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      11: {
        tokenId: 11,
        name: "Toyrecs",
        image_url: "https://www.arweave.net/s4suN9TYdL66z3vjuxbSKopahuFSBf6M_xm7PWo29fo?ext=png",
        json_url: "https://www.arweave.net/bPUVbwQwMbdZPJJHsONvyeYPdzakSxkET9syRjQgjzI",
        size: [16, 16],
        creator: "eBoy",
        maxClaimed: 999999999,
        price: 0,
      },
      12: {
        tokenId: 12,
        name: "Cobbleshindle",
        image_url: "https://www.arweave.net/ROccmLIhJsEPA4Zs7g7nNeIB_dyIPSkMw_9BJ1mAMQI?ext=png",
        json_url: "https://www.arweave.net/z_H2z6I-NjJqoPyx5E7XkT-2G5dOq0ha6pU0kUiekVw",
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
