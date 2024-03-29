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
    <Box zIndex="default" position="fixed" top={"24px"} left="calc(106px + 336px + 16px)">
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

export const LeaderboardButtonMd: FC<{ shadow?: boolean; onOpen: () => void }> = ({ shadow, onOpen }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Box zIndex="default" position="fixed" top="89px" left="12px">
      <Button
        w="154px"
        h="40px"
        justify="space-between"
        shadow={shadow}
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
  isMobile?: boolean;
  ens?: string;
  myScore?: TypMyScore;
  topScoreList: TopScoreList;
  isOpen: boolean;
  onClose: () => void;
}> = ({ isMobile, ens, myScore, topScoreList, isOpen, onClose }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Tabs variant="unstyled">
      <Modal
        w={isMobile ? "full" : "832px"}
        h={isMobile ? "full" : "712px"}
        {...(isMobile && { borderRadius: "0px" })}
        isOpen={isOpen}
        onClose={onClose}
      >
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
          <TabList w={isMobile ? "full" : "510px"}>
            <Tab text="Land Power" />
            <Tab text="Social" />
            <Tab text="Attention" />
          </TabList>
        </VStack>
        <Box h="24px" />
        <ModalBody>
          <TabPanels maxH="396px">
            <TabPanel p="0">
              <RankingTable rank="landPower" topScoreList={topScoreList} onClose={onClose} />
            </TabPanel>
            <TabPanel p="0">
              <RankingTable rank="social" topScoreList={topScoreList} onClose={onClose} />
            </TabPanel>
            <TabPanel p="0">
              <RankingTable rank="attention" topScoreList={topScoreList} onClose={onClose} />
            </TabPanel>
          </TabPanels>
        </ModalBody>
      </Modal>
    </Tabs>
  );
};

export default Leaderboard;
