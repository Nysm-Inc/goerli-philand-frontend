import { useState } from "react";
import useInterval from "./useInterval";

// for testnet
const useBlockNumber = (watch?: boolean): number => {
  // mainnet
  // const { data: blockNumber } = useBlockNumber({ watch: !!watch });
  // mumbai
  const [blockNumber, setBlockNumber] = useState(0);

  useInterval(() => {
    if (watch) setBlockNumber((prev) => prev++);
  }, 5000);

  return blockNumber;
};

export default useBlockNumber;
