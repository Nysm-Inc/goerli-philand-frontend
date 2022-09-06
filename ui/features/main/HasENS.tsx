import dynamic from "next/dynamic";
import { FC, useCallback, useMemo } from "react";
import { useChangePhilandOwner, useCreatePhiland } from "~/hooks/registry";
import { useViewPhiland, useWallpaper } from "~/hooks/map";
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
  const { owner, phiObjects, refetchPhiObjects } = useViewPhiland(currentENS);
  const isCreatedPhiland = useMemo(() => owner === address, [owner, address]);
  const { wallpaper, refetch: refetchWallpaper } = useWallpaper(currentENS);
  const refetchPhiland = useCallback(() => (refetchPhiObjects(), refetchWallpaper()), []);

  return (
    <>
      {isCreatedPhiland ? (
        <Philand
          address={address}
          currentENS={currentENS}
          domains={domains}
          switchCurrentENS={switchCurrentENS}
          phiObjects={phiObjects}
          wallpaper={wallpaper}
          refetchPhiland={refetchPhiland}
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
          refetchPhiObjects={refetchPhiland}
        />
      )}
    </>
  );
};

export default HasENS;
