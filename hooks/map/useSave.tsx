import { useContext, useEffect, useState } from "react";
import { useDeprecatedContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import MapAbi from "~/abi/map.json";
import { AppContext } from "~/contexts";
import { PhiLink } from "~/types";
import { wrapTxErr, Tx } from "~/types/tx";
import { updateOGP } from "~/utils/ogp";
import { getFastestGasWei } from "~/utils/gas";
import { captureError } from "~/utils/sentry";

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
): { save: ({ removeArgs, writeArgs, linkArgs }: SaveArgs) => Promise<TransactionResponse | undefined>; tx: Tx } => {
  const { game, addTx } = useContext(AppContext);
  const [ogp, setOGP] = useState("");

  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useDeprecatedContractWrite({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "save",
    onError: (error, variables) => {
      const err = wrapTxErr(error, variables);
      captureError(err.error, err.extra);
    },
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  useEffect(() => {
    switch (status) {
      case "loading": {
        setOGP(game.engine.exportImage());
        return;
      }
      case "success": {
        updateOGP(ens, ogp);
        return;
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
      const overrides = await getFastestGasWei();
      return writeAsync({ args: calldata, overrides });
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
