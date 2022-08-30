import Image from "next/image";
import { FC, useContext } from "react";
import { Box, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import type { MyScore as TypMyScore, TopScoreList } from "~/types/leaderboard";
import Icon from "~/ui/components/Icon";
import { Modal, ModalBody, ModalHeader } from "~/ui/components/common/Modal";
import IconButton from "~/ui/components/common/IconButton";
import Button from "~/ui/components/common/Button";
import { Tab, TabList } from "~/ui/components/common/Tab";
import MyScore from "./MyScore";
import RankingTable from "./RankingTable";

export const LeaderboardButton: FC<{ shadow?: boolean; onOpen: () => void }> = ({ shadow, onOpen }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Box zIndex="default" position="fixed" top="24px" left="calc(106px + 336px + 16px)">
      <Button
        w="146px"
        shadow={shadow}
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
  ens?: string;
  myScore?: TypMyScore;
  topScoreList: TopScoreList;
  isOpen: boolean;
  onClose: () => void;
}> = ({ ens, myScore, topScoreList, isOpen, onClose }) => {
  // const isMobile = useBreakpointValue({ base: true, lg: false }, { ssr: false });
  const { colorMode } = useContext(AppContext);

  return (
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
        <VStack spacing="24px" align={ens && myScore ? "flex-start" : "center"}>
          {ens && myScore && <MyScore ens={ens} myScore={myScore} />}
          <TabList>
            <Tab text="Active" />
            <Tab text="Social" disabled />
            <Tab text="Attention" disabled />
          </TabList>
        </VStack>
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
  );
};

export default Leaderboard;
