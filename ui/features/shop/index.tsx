import Image from "next/image";
import { FC, useContext, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, Center, HStack, SimpleGrid, TabPanel, TabPanels, Tabs, Text, useBoolean, VStack } from "@chakra-ui/react";
import { FREE_OBJECT_CONTRACT_ADDRESS, PREMIUM_OBJECT_CONTRACT_ADDRESS, WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { ObjectMetadata, objectMetadataList, objectTraisList } from "~/types/object";
import { Icon, IconButton, Modal, ModalBody, ModalHeader, ModalFooter, QuantityInput, Tab, TabList, useNavi } from "~/ui/components";
import { AppContext } from "~/contexts";
import { ShopItemContractAddress } from "~/types";

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
          height="320px"
          p="16px"
          spacing="8px"
          borderRadius="16px"
          align="flex-start"
          bgColor={colorMode === "light" ? "light.lg_orange40" : "dark.grey700"}
        >
          <Box position="relative" w="100%">
            <Box position="absolute" right="0" cursor="pointer" onClick={() => setSelected((prev) => !prev)}>
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
        <VStack height="320px" p="16px" spacing="16px" borderRadius="16px" bgColor={colorMode === "light" ? "white" : "grey.900"}>
          <Center position="relative" w="100%" h="144px">
            <Box position="relative" w="96px" h="96px">
              <Image src={item.image_url} layout="fill" objectFit="contain" quality={100} draggable={false} />
            </Box>
            <Box position="absolute" top="0" right="0" cursor="pointer" onClick={() => setSelected((prev) => !prev)}>
              <Icon name="info" color={colorMode === "light" ? "grey.900" : "white"} />
            </Box>
          </Center>

          <Text textStyle="headline-2" textAlign="center" color={colorMode === "light" ? "grey.900" : "white"}>
            {item.name}
          </Text>
          <HStack>
            <Image src="/icons/polygon_logo.svg" width="16px" height="16px" />
            <Text textStyle="label-1" color={colorMode === "light" ? "grey.900" : "white"}>
              {item.price}
            </Text>
          </HStack>

          <QuantityInput
            defaultText="+ Add to Cart"
            num={item.select}
            balance={contract === WALLPAPER_CONTRACT_ADDRESS ? 1 : 10}
            handleClickMinus={minus}
            handleClickPlus={plus}
          />
        </VStack>
      )}
    </>
  );
};

const Shop: FC<{
  isOpen: boolean;
  onOpenCollection: () => void;
  onClose: () => void;
  onSubmit: {
    [FREE_OBJECT_CONTRACT_ADDRESS]: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
    [WALLPAPER_CONTRACT_ADDRESS]: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
  };
}> = ({ isOpen, onOpenCollection, onClose, onSubmit }) => {
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
              subText="The deposited objects is stored in Inventory"
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
                    openNavi("Purchased Objects into Collection.", "Open Collection", () => {
                      onClose();
                      onOpenCollection();
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
