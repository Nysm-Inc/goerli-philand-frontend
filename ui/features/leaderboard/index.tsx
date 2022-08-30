import Image from "next/image";
import { FC, useContext } from "react";
import {
  Avatar,
  Box,
  HStack,
  Table,
  TableContainer,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import type { MyScore, TopScoreList } from "~/types/leaderboard";
import Icon from "~/ui/components/Icon";
import { Modal, ModalBody, ModalHeader } from "~/ui/components/common/Modal";
import IconButton from "~/ui/components/common/IconButton";
import Button from "~/ui/components/common/Button";
import { Tab, TabList } from "~/ui/components/common/Tab";

const ScoreBadge: FC<{ rank: number }> = ({ rank }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <HStack h="24px" p="4px 8px" spacing="8px" borderRadius="8px" bgColor={colorMode === "light" ? "warmgrey.80" : "grey.900"}>
      <Text textStyle="label-1" color={colorMode === "light" ? "warmgrey.60" : "warmgrey.50"}>
        Ranked
      </Text>
      <Text textStyle="label-1" color={colorMode === "light" ? "warmgrey.40" : "white"}>
        {rank.toLocaleString()}
      </Text>
    </HStack>
  );
};

const MyScore: FC<{ title: string; score: number; rank: number }> = ({ title, score, rank }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <VStack w="200px" h="80px" spacing="4px" align="flex-start">
      <Text textStyle="label-1" color="grey.500">
        {title}
      </Text>
      <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
        {score.toFixed(2)}
      </Text>
      <ScoreBadge rank={rank} />
    </VStack>
  );
};

const Leaderboard: FC<{
  ens: string;
  myScore: MyScore;
  topScoreList: TopScoreList;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}> = ({ ens, myScore, topScoreList, isOpen, onOpen, onClose }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <>
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
          <VStack spacing="24px" align="flex-start">
            <HStack w="full" h="128px" spacing="24px">
              <Avatar
                w="128px"
                h="128px"
                bgColor={colorMode === "light" ? "purple.150" : "red.150"}
                icon={
                  <Box position="absolute" top="16px">
                    <Image width="112px" height="112px" src="/icons/dotty.svg" alt="" quality={100} />
                  </Box>
                }
              />
              <VStack spacing="16px" align="flex-start">
                <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
                  {ens}
                </Text>
                <HStack spacing="16px">
                  <MyScore title="Active Score" score={myScore.activity} rank={myScore.activityRank} />
                  <MyScore title="Social Score" score={NaN} rank={NaN} />
                  <MyScore title="Attention Score" score={NaN} rank={NaN} />
                </HStack>
              </VStack>
            </HStack>
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
                <TableContainer minH="396px" borderRadius="16px" bgColor={colorMode === "light" ? "white" : "grey.900"}>
                  <Table variant="unstyled">
                    <Thead textStyle="label-2" color="grey.500">
                      <Tr>
                        <Th>Rank</Th>
                        <Th>User</Th>
                        <Th>Active</Th>
                        <Th>Social</Th>
                        <Th>Attention</Th>
                      </Tr>
                    </Thead>
                    <Tbody textStyle="paragraph-2" color={colorMode === "light" ? "grey.900" : "white"}>
                      {topScoreList.activity.map((score, i) => (
                        <Tr
                          key={i}
                          cursor="pointer"
                          _hover={{
                            bgColor: colorMode === "light" ? "warmgrey.90" : "dark.grey700",
                          }}
                          onClick={() => (window.location.href = score.name + ".eth")}
                        >
                          <Td>{i + 1}</Td>
                          <Td>{score.name}</Td>
                          <Td>{score.value.toFixed(2)}</Td>
                          <Td>{NaN}</Td>
                          <Td>{NaN}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
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
