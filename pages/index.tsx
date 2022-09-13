import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import useClouds from "~/hooks/game/useClouds";
import useScore from "~/hooks/leaderboard/score";
import Main from "~/ui/features/main";
import Leaderboard, { LeaderboardButton, LeaderboardButtonMd } from "~/ui/features/leaderboard";
import Dev from "~/ui/components/Dev";
import Mobile from "~/ui/components/Mobile";

const Index: NextPage = () => {
  const { game } = useContext(AppContext);
  const isMobile = useBreakpointValue({ base: true, lg: false }, { ssr: false });
  const { isOpen: isOpenLeaderboard, onOpen: onOpenLeaderboard, onClose: onCloseLeaderboard } = useDisclosure();
  const { topScoreList } = useScore(undefined, isOpenLeaderboard);

  useClouds(isMobile);
  useEffect(() => {
    isMobile ? game.engine.hide() : game.engine.show();
    return () => {
      isMobile && game.engine.show();
    };
  }, [isMobile]);

  return (
    <>
      <Dev />
      <Leaderboard isMobile={isMobile} topScoreList={topScoreList} isOpen={isOpenLeaderboard} onClose={onCloseLeaderboard} />
      {isMobile ? (
        <>
          <LeaderboardButtonMd shadow onOpen={onOpenLeaderboard} />
          <Mobile />
        </>
      ) : (
        <>
          <LeaderboardButton shadow onOpen={onOpenLeaderboard} />
          <Main />
        </>
      )}
    </>
  );
};

export default Index;
