import Image from "next/image";
import { FC, useContext, useState } from "react";
import type { TransactionResponse } from "@ethersproject/providers";
import { Box, Center, Flex, HStack, SimpleGrid, TabPanel, TabPanels, Tabs, Text, useBoolean, VStack } from "@chakra-ui/react";
import { FREE_OBJECT_CONTRACT_ADDRESS, PREMIUM_OBJECT_CONTRACT_ADDRESS, WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { ObjectMetadata, objectMetadataList, objectTraisList } from "~/types/object";
import { AppContext } from "~/contexts";
import { ShopItemContractAddress } from "~/types";
import Icon from "~/ui/components/Icon";
import useNavi from "~/ui/components/NaviNotification";
import QuantityInput from "~/ui/components/common/QuantityInput";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "~/ui/components/common/Modal";
import IconButton from "~/ui/components/common/IconButton";
import { Tab, TabList } from "~/ui/components/common/Tab";

type Item = ObjectMetadata & { select: number };

const defaultItems = (contract: ShopItemContractAddress): Item[] => {
  return Object.values(objectMetadataList[contract]).map((metadata) => ({ ...metadata, select: 0 }));
};

const tabIdx2Contract: { [idx: number]: ShopItemContractAddress } = {
  0: FREE_OBJECT_CONTRACT_ADDRESS,
  1: PREMIUM_OBJECT_CONTRACT_ADDRESS,
  2: WALLPAPER_CONTRACT_ADDRESS,
};

const Cart: FC<{
  contract: ShopItemContractAddress;
  item: Item;
  plus: () => void;
  minus: () => void;
}> = ({ contract, item, plus, minus }) => {
  const { colorMode } = useContext(AppContext);
  const [selected, setSelected] = useState(false);

  return (
    <>
      {selected ? (
        <VStack
          position="relative"
          height="322px"
          p="32px 16px 16px"
          spacing="8px"
          borderRadius="16px"
          align="flex-start"
          bgColor={colorMode === "light" ? "light.lg_orange40" : "dark.grey700"}
        >
          <Box w="100%">
            <Box position="absolute" top="16px" right="16px" cursor="pointer" onClick={() => setSelected((prev) => !prev)}>
              <Icon name="infoActive" color={colorMode === "light" ? "grey.900" : "white"} />
            </Box>
          </Box>
          <Text textStyle="headline-2" color={colorMode === "light" ? "grey.900" : "white"}>
            {item.name}
          </Text>
          <Text textStyle="paragraph-2" color={colorMode === "light" ? "grey.500" : "grey.200"}>
            {objectTraisList[contract][item.tokenId].description}
          </Text>
        </VStack>
      ) : (
        <VStack
          position="relative"
          height="322px"
          p="32px 16px 16px"
          spacing="4px"
          borderRadius="16px"
          bgColor={colorMode === "light" ? "white" : "grey.900"}
          _hover={{
            bgColor: colorMode === "light" ? "light.lg_orange40" : "dark.grey700",
          }}
        >
          <Center w="100%" h="144px" minH="144px">
            <Box position="relative" w="96px" h="96px">
              <Image src={item.image_url} layout="fill" objectFit="contain" draggable={false} alt="" />
            </Box>
            <Box position="absolute" top="16px" right="16px" cursor="pointer" onClick={() => setSelected((prev) => !prev)}>
              <Icon name="info" color={colorMode === "light" ? "grey.900" : "white"} />
            </Box>
          </Center>

          <VStack spacing="16px">
            <VStack spacing="6px">
              <Flex h="48px" flexDirection="column" justify="flex-end">
                <Text textStyle="headline-2" textAlign="center" color={colorMode === "light" ? "grey.900" : "white"}>
                  {item.name}
                </Text>
              </Flex>
              <HStack>
                <Image src="/icons/polygon_logo.svg" width="16px" height="16px" alt="" />
                <Text textStyle="label-1" color={colorMode === "light" ? "grey.900" : "white"}>
                  {item.price + " MATIC"}
                </Text>
              </HStack>
            </VStack>

            <QuantityInput
              defaultText="+ Add to Cart"
              num={item.select}
              balance={contract === WALLPAPER_CONTRACT_ADDRESS ? 1 : 10}
              handleClickMinus={minus}
              handleClickPlus={plus}
            />
          </VStack>
        </VStack>
      )}
    </>
  );
};

const Shop: FC<{
  isOpen: boolean;
  onOpenWallet: () => void;
  onClose: () => void;
  onSubmit: {
    [FREE_OBJECT_CONTRACT_ADDRESS]: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
    [WALLPAPER_CONTRACT_ADDRESS]: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
  };
}> = ({ isOpen, onOpenWallet, onClose, onSubmit }) => {
  const { colorMode } = useContext(AppContext);
  const [items, setItems] = useState<Item[]>(defaultItems(FREE_OBJECT_CONTRACT_ADDRESS));
  const [tabIdx, setTabIdx] = useState(0);
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();
  const openNavi = useNavi();

  const plus = (idx: number) => {
    const copied = [...items];
    copied[idx].select += 1;
    setItems(copied);
  };
  const minus = (idx: number) => {
    const copied = [...items];
    copied[idx].select -= 1;
    setItems(copied);
  };
  const reset = (contract: ShopItemContractAddress) => {
    setItems(defaultItems(contract));
  };

  return (
    <Tabs
      variant="unstyled"
      onChange={(idx) => {
        setTabIdx(idx);
        reset(tabIdx2Contract[idx]);
      }}
    >
      <Modal w="832px" h="712px" isOpen={isOpen} onClose={onClose} onCloseComplete={() => reset(tabIdx2Contract[tabIdx])}>
        <ModalHeader
          title="SHOP"
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
        <Box minH="16px" h="16px" />
        <TabList>
          <Tab text="Object (Free)" />
          <Tab text="Object (Premium)" />
          <Tab text="Wallpaper" />
        </TabList>
        <Box minH="16px" h="16px" />
        <ModalBody>
          <TabPanels id="8">
            {Object.values(tabIdx2Contract).map((idx) => (
              <TabPanel key={idx} p="0">
                <SimpleGrid columns={3} spacing="8px">
                  {items.map((item, i) => (
                    <Cart key={i} contract={tabIdx2Contract[tabIdx]} item={item} plus={() => plus(i)} minus={() => minus(i)} />
                  ))}
                </SimpleGrid>
                {items.some((item) => item.select > 0) && <Box h="120px" />}
              </TabPanel>
            ))}
          </TabPanels>
        </ModalBody>
        {items.some((item) => item.select > 0) && (
          <Box w="full" position="absolute" bottom="0" left="0">
            <ModalFooter
              text="Purchase"
              itemNum={items.reduce((sum, item) => (item.select > 0 ? sum + item.select : sum), 0)}
              itemPrice={items.reduce((sum, item) => (item.select > 0 ? sum + item.select * item.price : sum), 0)}
              subText="The objects you purchase will be sent to your wallet."
              isLoading={isLoading}
              onClick={() => {
                startLoading();
                const tokenIds = items.reduce((memo, item) => {
                  return item.select > 0 ? [...memo, ...[...new Array(item.select)].map(() => item.tokenId)] : memo;
                }, [] as number[]);
                onSubmit[tabIdx2Contract[tabIdx]](tokenIds)
                  .then(async (res) => {
                    reset(tabIdx2Contract[tabIdx]);
                    await res?.wait();
                    stopLoading();
                    openNavi("Purchased Objects into Wallet.", "Open Wallet", () => {
                      onClose();
                      onOpenWallet();
                    });
                  })
                  .catch(stopLoading);
              }}
            />
          </Box>
        )}
      </Modal>
    </Tabs>
  );
};

export default Shop;
