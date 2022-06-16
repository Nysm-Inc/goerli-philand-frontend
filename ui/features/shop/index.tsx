import Image from "next/image";
import { FC } from "react";
import {
  Box,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { FREE_OBJECT_CONTRACT_ADDRESS, PREMIUM_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { objectMetadataList } from "~/types/object";

const Shop: FC<{
  isOpen: boolean;
  onClose: () => void;
  onClickFreeItem: (tokenId: number) => Promise<void>;
  onClickPremiumItem: (tokenId: number) => Promise<void>;
}> = ({ isOpen, onClose, onClickFreeItem, onClickPremiumItem }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalContent border="2px solid" borderColor="black" borderRadius="none" minW="600px" minH="600px" maxW="600px" maxH="600px">
        <ModalHeader>Shop</ModalHeader>
        <ModalBody>
          <Tabs variant="soft-rounded" colorScheme="blackAlpha">
            <TabList position="absolute" top="24px" left="50%" transform="translate(-50%)">
              <Tab>Free</Tab>
              <Tab>Premium</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={3} spacing="16px">
                  {Object.values(objectMetadataList[FREE_OBJECT_CONTRACT_ADDRESS]).map((metadata, i) => {
                    return (
                      <Center key={i} height="128px" cursor="pointer" onClick={() => onClickFreeItem(metadata.tokenId)}>
                        <Box width="96px" height="96px" position="relative">
                          <Image src={metadata.image_url} layout="fill" objectFit="contain" />
                        </Box>
                      </Center>
                    );
                  })}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                <SimpleGrid columns={3} spacing="16px">
                  {Object.values(objectMetadataList[PREMIUM_OBJECT_CONTRACT_ADDRESS]).map((metadata, i) => {
                    return (
                      <Center key={i} height="128px" cursor="pointer" onClick={() => onClickPremiumItem(metadata.tokenId)}>
                        <Box width="96px" height="96px" position="relative">
                          <Image src={metadata.image_url} layout="fill" objectFit="contain" />
                        </Box>
                      </Center>
                    );
                  })}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Shop;
