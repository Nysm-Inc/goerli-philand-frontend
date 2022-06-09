import { useContractWrite, useWaitForTransaction } from "wagmi";
import { PHI_MAP_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi } from "~/abi";
import { useContext, useEffect } from "react";
import { AppContext } from "~/contexts";
import { updateOGP } from "~/utils/ogp";

const useSave = (ens?: string | null) => {
  const { game } = useContext(AppContext);

  const { data, write } = useContractWrite(
    {
      addressOrName: PHI_MAP_CONTRACT_ADDRESS,
      contractInterface: PhiMapAbi,
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

  return (
    removeArgs: { removeIdxs: (string | number)[]; remove_check: boolean },
    writeArgs: {
      contractAddress: string;
      tokenId: number;
      xStart: number;
      yStart: number;
    }[],
    linkArgs: { title: string; url: string }[]
  ) => {
    if (!ens) return;

    const calldata = [ens.slice(0, -4), removeArgs.removeIdxs, removeArgs.remove_check, writeArgs, linkArgs];
    return write({ args: calldata });
  };
};

export default useSave;
