import Image from "next/image";
import { FC, useContext } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { FREE_OBJECT_CONTRACT_ADDRESS, PREMIUM_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { objectMetadataList } from "~/types/object";
import { Icon, IconButton, Modal, ModalBody, ModalHeader } from "~/ui/components";
import { AppContext } from "~/contexts";

const Shop: FC<{
  isOpen: boolean;
  onClose: () => void;
  onClickFreeItem: (tokenId: number) => Promise<TransactionResponse | undefined>;
  onClickPremiumItem: (tokenId: number) => Promise<TransactionResponse | undefined>;
}> = ({ isOpen, onClose, onClickFreeItem, onClickPremiumItem }) => {
  const { colorMode } = useContext(AppContext);
  return (
    <Modal w="858px" h="700px" isOpen={isOpen} onClose={() => {}}>
      <ModalHeader
        title="SHOP"
        buttons={[
          <IconButton
            key="close"
            ariaLabel="close"
            icon={<Icon name="close" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
            size={32}
            onClick={onClose}
          />,
        ]}
      />
      <ModalBody>
        <Tabs variant="soft-rounded" colorScheme="blackAlpha">
          <TabList>
            <Tab>Free</Tab>
            <Tab>Premium</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={3}>
                {Object.values(objectMetadataList[FREE_OBJECT_CONTRACT_ADDRESS]).map((metadata, i) => {
                  return (
                    <VStack key={i} height="320px" p="16px">
                      <Box
                        w="100%"
                        minH="144px"
                        maxH="144px"
                        position="relative"
                        cursor="pointer"
                        onClick={() => onClickFreeItem(metadata.tokenId)}
                      >
                        <Image src={metadata.image_url} layout="fill" objectFit="contain" />
                      </Box>

                      <Text>{metadata.name}</Text>
                      <Text>¥{metadata.price}</Text>
                    </VStack>
                  );
                })}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={3}>
                {Object.values(objectMetadataList[PREMIUM_OBJECT_CONTRACT_ADDRESS]).map((metadata, i) => {
                  return (
                    <VStack key={i} height="320px" p="16px">
                      <Box
                        w="100%"
                        minH="144px"
                        maxH="144px"
                        position="relative"
                        cursor="pointer"
                        onClick={() => onClickPremiumItem(metadata.tokenId)}
                      >
                        <Image src={metadata.image_url} layout="fill" objectFit="contain" />
                      </Box>

                      <Text>{metadata.name}</Text>
                      <Text>¥{metadata.price}</Text>
                    </VStack>
                  );
                })}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalBody>
    </Modal>
  );
};

export default Shop;
