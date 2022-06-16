import { useContractWrite, useWaitForTransaction } from "wagmi";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { MapAbi } from "~/abi";
import { useContext, useEffect } from "react";
import { AppContext } from "~/contexts";
import { updateOGP } from "~/utils/ogp";
import { Tx } from "~/types/wagmi";

export type SaveArgs = {
  removeArgs: { removeIdxs: (string | number)[]; remove_check: boolean };
  writeArgs: {
    contractAddress: string;
    tokenId: number;
    xStart: number;
    yStart: number;
  }[];
  linkArgs: { title: string; url: string }[];
};

const useSave = (ens?: string | null): { save: ({ removeArgs, writeArgs, linkArgs }: SaveArgs) => void; tx: Tx } => {
  const { game } = useContext(AppContext);

  const {
    data,
    write,
    status: tmpStatus,
  } = useContractWrite(
    {
      addressOrName: MAP_CONTRACT_ADDRESS,
      contractInterface: MapAbi,
    },
    "save"
  );
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  useEffect(() => {
    if (status !== "success") return;

    (async () => {
      const ogp = game.engine.getViewImageDataURL();
      const res = await updateOGP(ens, ogp);

      if (res.status === 200) {
        alert("updated OGP");
      }
    })();
  }, [status]);

  return {
    save: ({ removeArgs, writeArgs, linkArgs }: SaveArgs) => {
      if (!ens) return;

      const calldata = [ens.slice(0, -4), removeArgs.removeIdxs, removeArgs.remove_check, writeArgs, linkArgs];
      return write({ args: calldata });
    },
    tx: {
      hash: data?.hash,
      tmpStatus,
      status,
    },
  };
};

export default useSave;
