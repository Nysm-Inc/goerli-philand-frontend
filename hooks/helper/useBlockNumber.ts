import { useState } from "react";
import useInterval from "./useInterval";

const mumbaiBlockTime = 5000;

const useBlockNumber = (): number => {
  // mainnet
  // const { data: blockNumber } = useBlockNumber({ watch: !!watch });

  // mumbai
  const [blockNumber, setBlockNumber] = useState(0);
  useInterval(() => setBlockNumber((prev) => prev++), mumbaiBlockTime);

  return blockNumber;
};

export default useBlockNumber;
