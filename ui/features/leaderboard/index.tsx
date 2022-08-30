import Image from "next/image";
import { FC, useContext } from "react";
import { Box, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import type { MyScore as TypMyScore, TopScoreList } from "~/types/leaderboard";
import Icon from "~/ui/components/Icon";
import { Modal, ModalBody, ModalHeader } from "~/ui/components/common/Modal";
import IconButton from "~/ui/components/common/IconButton";
import Button from "~/ui/components/common/Button";
import MyScore from "./MyScore";
import RankingTable from "./RankingTable";

const LeaderboardButton: FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Box zIndex="default" position="fixed" top="24px" left="calc(106px + 336px + 16px)">
      <Button
        w="146px"
        shadow
        justify="space-between"
        leftIcon={<Image src="/icons/leaderboard.svg" width="24px" height="24px" alt="" />}
        onClick={onOpen}
      >
        <Text textStyle="button-2" color={colorMode === "light" ? "grey.900" : "white"}>
          Leaderboard
        </Text>
      </Button>
    </Box>
  );
};

const Leaderboard: FC<{
  ens: string;
  myScore: TypMyScore;
  topScoreList: TopScoreList;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}> = ({ ens, myScore, topScoreList, isOpen, onOpen, onClose }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <>
      <LeaderboardButton onOpen={onOpen} />

      <Tabs variant="unstyled">
        <Modal w="832px" h="712px" isOpen={isOpen} onClose={onClose}>
          <ModalHeader
            title="LEADERBOARD"
            buttons={[
              <IconButton
                key="close"
                ariaLabel="close"
                icon={<Icon name="close" color={colorMode === "light" ? "grey.900" : "white"} />}
                size="32px"
                borderRadius="8px"
                boxShadow={false}
                onClick={onClose}
              />,
            ]}
          />
          <Box h="24px" />
          <MyScore ens={ens} myScore={myScore} />
          <Box h="24px" />
          <ModalBody>
            <TabPanels>
              <TabPanel p="0">
                <RankingTable topScoreList={topScoreList} />
              </TabPanel>
              <TabPanel p="0"></TabPanel>
              <TabPanel p="0"></TabPanel>
            </TabPanels>
          </ModalBody>
        </Modal>
      </Tabs>
    </>
  );
};

export default Leaderboard;
