import dynamic from "next/dynamic";
import { FC } from "react";
import { useAccount, useNetwork } from "wagmi";
import { useDisclosure } from "@chakra-ui/react";
import useScore from "~/hooks/leader/score";
import Leaderboard, { LeaderboardButton } from "~/ui/features/leaderboard";
import Header from "~/ui/components/Header";
import Help from "~/ui/components/Help";
import WrongNetwork from "~/ui/components/WrongNetwork";
import LetsConnect from "~/ui/components/LetsConnect";

const Authed = dynamic(() => import("./Authed"));

const Main: FC = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { isOpen: isOpenLeaderboard, onOpen: onOpenLeaderboard, onClose: onCloseLeaderboard } = useDisclosure();
  const { topScoreList } = useScore(undefined, isOpenLeaderboard);

  return (
    <>
      <Header />
      <Help />
      <LeaderboardButton shadow onOpen={onOpenLeaderboard} />
      <Leaderboard topScoreList={topScoreList} isOpen={isOpenLeaderboard} onClose={onCloseLeaderboard} />

      {address ? <>{chain?.unsupported ? <WrongNetwork /> : <Authed address={address} />}</> : <LetsConnect />}
    </>
  );
};

export default Main;
