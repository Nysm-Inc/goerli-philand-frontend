import { useContext, useEffect, useState } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { MapAbi } from "~/abi";
import { AppContext } from "~/contexts";
import { updateOGP } from "~/utils/ogp";
import { PhiLink } from "~/types";

export type SaveArgs = {
  removeArgs: { removeIdxs: (string | number)[] };
  writeArgs: {
    contractAddress: string;
    tokenId: number;
    xStart: number;
    yStart: number;
  }[];
  linkArgs: PhiLink[];
  wallpaperArgs: { contractAddress: string; tokenId: number };
};

const useSave = (
  ens?: string | null
): { save: ({ removeArgs, writeArgs, linkArgs }: SaveArgs) => Promise<TransactionResponse | undefined> } => {
  const { game, addTx } = useContext(AppContext);
  const [ogp, setOGP] = useState("");

  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "save",
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  useEffect(() => {
    switch (status) {
      case "loading": {
        setOGP(game.engine.exportImage());
      }
      case "success": {
        updateOGP(ens, ogp); // todo
      }
    }
  }, [status]);

  useEffect(() => {
    addTx({
      hash: data?.hash,
      tmpStatus,
      status,
      action: "Saving Your Land Data",
      msg: "Saving your land data to blockchain and updating OGP image.",
    });
  }, [tmpStatus, status]);

  return {
    save: async ({ removeArgs, writeArgs, linkArgs, wallpaperArgs }: SaveArgs) => {
      if (!ens) return;

      const calldata = [ens.slice(0, -4), removeArgs.removeIdxs, writeArgs, linkArgs, ...Object.values(wallpaperArgs)];
      return writeAsync({ args: calldata });
    },
  };
};

export default useSave;
