import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import { useChangePhilandOwner, useCreatePhiland } from "~/hooks/registry";
import { useViewPhiland } from "~/hooks/map";
import CreatePhiland from "~/ui/components/CreatePhiland";

const Philand = dynamic(() => import("./Philand"));

const HasENS: FC<{ address: string; currentENS: string; domains: string[]; switchCurrentENS: (ens: string) => void }> = ({
  address,
  currentENS,
  domains,
  switchCurrentENS,
}) => {
  const { createPhiland } = useCreatePhiland(address, currentENS);
  const { changePhilandOwner } = useChangePhilandOwner(address, currentENS);
  const { owner, phiObjects } = useViewPhiland(currentENS);
  const isCreatedPhiland = useMemo(() => owner === address && phiObjects.length > 0, [owner, address, phiObjects.length]);

  return (
    <>
      {isCreatedPhiland ? (
        <Philand
          //
          address={address}
          currentENS={currentENS}
          domains={domains}
          switchCurrentENS={switchCurrentENS}
          phiObjects={phiObjects}
        />
      ) : (
        <CreatePhiland
          address={address}
          owner={owner}
          currentENS={currentENS}
          domains={domains}
          switchCurrentENS={switchCurrentENS}
          createPhiland={createPhiland}
          changePhilandOwner={changePhilandOwner}
        />
      )}
    </>
  );
};

export default HasENS;
