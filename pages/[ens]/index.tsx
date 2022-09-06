import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import axios from "axios";
import { useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { UTILS_API_GATEWAY } from "~/constants";
import { nullAddress, PhiObject, Wallpaper } from "~/types";
import useGame from "~/hooks/game/useGame";
import useClouds from "~/hooks/game/useClouds";
import useScore from "~/hooks/leaderboard/score";
import { useWallpaper, useViewPhiland } from "~/hooks/map";
import Leaderboard, { LeaderboardButton, LeaderboardButtonMd } from "~/ui/features/leaderboard";
import Dev from "~/ui/components/Dev";
import Header from "~/ui/components/Header";
import HeaderMd from "~/ui/components/HeaderMd";
import LandNotFound from "~/ui/components/LandNotFound";
import LandName from "~/ui/components/LandName";
import LinkList from "~/ui/components/LinkList";
import Help from "~/ui/components/Help";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const res = await axios.get<{ images: string[] }>(`${UTILS_API_GATEWAY}/images/list?name=${query.ens}`);
    const images = res.data.images;
    const ogp = images.length > 0 ? images[images.length - 1] : "";
    return { props: { ogp, title: `${query.ens} | Phi`, query } };
  } catch {
    return { props: { ogp: "", title: "", query } };
  }
};

const Philand: FC<{
  ens: string;
  phiObjects: (PhiObject & { removeIdx: number })[];
  wallpaper?: Wallpaper;
}> = ({ ens, phiObjects, wallpaper }) => {
  const phiObjectsWithLink = useMemo(() => phiObjects.filter((object) => object.link.title || object.link.url), [phiObjects]);
  const { initialized } = useGame({ state: { currentENS: ens, isEdit: false, phiObjects, wallpaper } });

  return (
    <>
      {initialized && <LinkList phiObjects={phiObjectsWithLink} defaultIsOpen />}
      <LandName ens={ens} />
    </>
  );
};

const Index: NextPage = () => {
  const router = useRouter();
  const ens = decodeURI(router.asPath).substring(1);
  const isMobile = useBreakpointValue({ base: true, lg: false }, { ssr: false });
  const { isOpen: isOpenLeaderboard, onOpen: onOpenLeaderboard, onClose: onCloseLeaderboard } = useDisclosure();

  const { myScore, topScoreList } = useScore(ens, isOpenLeaderboard);
  const { owner, isFetchedOwner, phiObjects } = useViewPhiland(ens);
  const isCreatedPhiland = useMemo(() => owner !== nullAddress || phiObjects.length > 0, [owner, phiObjects.length]);
  const { wallpaper } = useWallpaper(ens);
  useClouds(isMobile);

  return (
    <>
      <Dev />
      <Leaderboard
        isMobile={isMobile}
        ens={ens}
        myScore={myScore}
        topScoreList={topScoreList}
        isOpen={isOpenLeaderboard}
        onClose={onCloseLeaderboard}
      />
      {isCreatedPhiland && <Philand ens={ens} phiObjects={phiObjects} wallpaper={wallpaper} />}
      {isMobile ? (
        <>
          <HeaderMd />
          <LeaderboardButtonMd shadow onOpen={onOpenLeaderboard} />
          {isFetchedOwner && !isCreatedPhiland && <LandNotFound ens={ens} w="360px" />}
        </>
      ) : (
        <>
          <Header />
          <Help />
          <LeaderboardButton shadow onOpen={onOpenLeaderboard} />
          {isFetchedOwner && !isCreatedPhiland && <LandNotFound ens={ens} />}
        </>
      )}
    </>
  );
};

export default Index;
