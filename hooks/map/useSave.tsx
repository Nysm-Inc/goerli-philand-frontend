import { useContext, useEffect, useState } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { MapAbi } from "~/abi";
import { AppContext } from "~/contexts";
import { updateOGP } from "~/utils/ogp";
import { Tx } from "~/types/tx";
import { PhiLink } from "~/types";

export type SaveArgs = {
  removeArgs: { removeIdxs: (string | number)[]; remove_check: boolean };
  writeArgs: {
    contractAddress: string;
    tokenId: number;
    xStart: number;
    yStart: number;
  }[];
  linkArgs: PhiLink[];
  wallpaperArgs: { contractAddress: string; tokenId: number; change_wall_check: boolean };
};

const useSave = (
  ens?: string | null
): { save: ({ removeArgs, writeArgs, linkArgs }: SaveArgs) => Promise<TransactionResponse | undefined>; tx: Tx } => {
  const { game, colorMode } = useContext(AppContext);
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
        setOGP(game.engine.exportImage(colorMode));
      }
      case "success": {
        updateOGP(ens, ogp); // todo
      }
    }
  }, [status]);

  return {
    save: async ({ removeArgs, writeArgs, linkArgs, wallpaperArgs }: SaveArgs) => {
      if (!ens) return;

      const calldata = [
        ens.slice(0, -4),
        removeArgs.removeIdxs,
        removeArgs.remove_check,
        writeArgs,
        linkArgs,
        ...Object.values(wallpaperArgs),
      ];
      return writeAsync({ args: calldata });
    },
    tx: {
      hash: data?.hash,
      tmpStatus,
      status,

      action: "Saving Your Land Data",
      msg: "Saving your land data to blockchain and updating OGP image.",
    },
  };
};

export default useSave;
