import dynamic from "next/dynamic";
import { FC } from "react";
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
  const [{ isCreated }, { createPhiland }] = useCreatePhiland(address, currentENS);
  const { changePhilandOwner } = useChangePhilandOwner(address, currentENS);
  const { owner, phiObjects } = useViewPhiland(currentENS);
  const isCreatedPhiland = owner === address && (isCreated || phiObjects.length > 0);

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
          owner={owner}
          currentENS={currentENS}
          domains={domains}
          isCreatedPhiland={isCreatedPhiland}
          switchCurrentENS={switchCurrentENS}
          createPhiland={createPhiland}
          changePhilandOwner={changePhilandOwner}
        />
      )}
    </>
  );
};

export default HasENS;
