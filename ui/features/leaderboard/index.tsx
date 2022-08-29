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
import Icon from "~/ui/components/Icon";
import { Modal, ModalBody, ModalHeader } from "~/ui/components/common/Modal";
import IconButton from "~/ui/components/common/IconButton";
import Button from "~/ui/components/common/Button";
import { Tab, TabList } from "~/ui/components/common/Tab";
import Badge from "~/ui/components/common/Badge";

// todo: replace hooks
const mockScoreList = [
  { rank: 1, user: "nick.eth", active: 88.23, social: NaN, attention: NaN },
  { rank: 1, user: "nick.eth", active: 88.23, social: NaN, attention: NaN },
  { rank: 1, user: "nick.eth", active: 88.23, social: NaN, attention: NaN },
  { rank: 1, user: "nick.eth", active: 88.23, social: NaN, attention: NaN },
  { rank: 1, user: "nick.eth", active: 88.23, social: NaN, attention: NaN },
  { rank: 1, user: "nick.eth", active: 88.23, social: NaN, attention: NaN },
  { rank: 1, user: "nick.eth", active: 88.23, social: NaN, attention: NaN },
  { rank: 1, user: "nick.eth", active: 88.23, social: NaN, attention: NaN },
  { rank: 1, user: "nick.eth", active: 88.23, social: NaN, attention: NaN },
  { rank: 1, user: "nick.eth", active: 88.23, social: NaN, attention: NaN },
];

const MyScore: FC<{ title: string; score: number; rank: number }> = ({ title, score, rank }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <VStack w="200px" h="80px" spacing="4px" align="flex-start">
      <Text textStyle="label-1" color="grey.500">
        {title}
      </Text>
      <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
        {score}
      </Text>
      <Badge text={`Ranked ${rank.toLocaleString()}`} />
    </VStack>
  );
};

const Leaderboard: FC<{ isOpen: boolean; onOpen: () => void; onClose: () => void }> = ({ isOpen, onOpen, onClose }) => {
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
                  Jane Cooper
                </Text>
                <HStack spacing="16px">
                  <MyScore title="Active Score" score={64.09} rank={1245} />
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
                      {mockScoreList.map((score, i) => (
                        <Tr key={i} cursor="pointer" onClick={() => (window.location.href = score.user)}>
                          <Td>{score.rank}</Td>
                          <Td>{score.user}</Td>
                          <Td>{score.active}</Td>
                          <Td>{score.social}</Td>
                          <Td>{score.attention}</Td>
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
