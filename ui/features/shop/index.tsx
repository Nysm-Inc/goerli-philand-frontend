import Image from "next/image";
import { FC, useContext, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, HStack, SimpleGrid, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { FREE_OBJECT_CONTRACT_ADDRESS, PREMIUM_OBJECT_CONTRACT_ADDRESS, WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { ObjectMetadata, objectMetadataList, objectTraisList } from "~/types/object";
import {
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalFooterButton,
  QuantityInput,
  Tab,
  TabList,
} from "~/ui/components";
import { AppContext } from "~/contexts";
import { ShopItemContractAddress } from "~/types";

type Item = ObjectMetadata & { select: number };

const defaultItems: { [contract in ShopItemContractAddress]: Item[] } = {
  [FREE_OBJECT_CONTRACT_ADDRESS]: Object.values(objectMetadataList[FREE_OBJECT_CONTRACT_ADDRESS]).map((metadata) => ({
    ...metadata,
    select: 0,
  })),
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: Object.values(objectMetadataList[PREMIUM_OBJECT_CONTRACT_ADDRESS]).map((metadata) => ({
    ...metadata,
    select: 0,
  })),
  [WALLPAPER_CONTRACT_ADDRESS]: Object.values(objectMetadataList[WALLPAPER_CONTRACT_ADDRESS]).map((metadata) => ({
    ...metadata,
    select: 0,
  })),
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
          bgColor={colorMode === "light" ? "#F5F2EB" : "#333333"}
        >
          <Box position="relative" w="100%">
            <Box position="absolute" right="0" cursor="pointer" onClick={() => setSelected((prev) => !prev)}>
              <Icon name="infoActive" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />
            </Box>
          </Box>
          <Text textStyle="headline-2" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
            {item.name}
          </Text>
          <Text textStyle="paragraph-2" color={colorMode === "light" ? "#808080" : "#CCCCCC"}>
            {objectTraisList[contract][item.tokenId].description}
          </Text>
        </VStack>
      ) : (
        <VStack height="320px" p="16px" spacing="16px" borderRadius="16px" bgColor={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"}>
          <Box w="100%" minH="144px" maxH="144px" position="relative">
            <Image src={item.image_url} layout="fill" objectFit="contain" />
            <Box position="absolute" right="0" cursor="pointer" onClick={() => setSelected((prev) => !prev)}>
              <Icon name="info" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />
            </Box>
          </Box>

          <Text textStyle="headline-2" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
            {item.name}
          </Text>
          <HStack>
            <Image src="/icons/eth.svg" width="16px" height="16px" />
            <Text textStyle="label-1" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
              {item.price}
            </Text>
          </HStack>

          <QuantityInput defaultText="+ Add to Cart" num={item.select} balance={10} handleClickMinus={minus} handleClickPlus={plus} />
        </VStack>
      )}
    </>
  );
};

const Shop: FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: {
    [FREE_OBJECT_CONTRACT_ADDRESS]: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
    [WALLPAPER_CONTRACT_ADDRESS]: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
  };
}> = ({ isOpen, onClose, onSubmit }) => {
  const { colorMode } = useContext(AppContext);
  const [items, setItems] = useState<Item[]>(defaultItems[FREE_OBJECT_CONTRACT_ADDRESS]);
  const [tabIdx, setTabIdx] = useState(0);

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
    setItems(defaultItems[contract]);
  };

  return (
    <Tabs
      variant="unstyled"
      onChange={(idx) => {
        setTabIdx(idx);
        reset(tabIdx2Contract[idx]);
      }}
    >
      <Modal w="858px" h="700px" isOpen={isOpen} onClose={() => {}}>
        <ModalHeader
          title="SHOP"
          buttons={[
            <IconButton
              key="close"
              ariaLabel="close"
              icon={<Icon name="close" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
              size={32}
              borderRadius={8}
              boxShadow={false}
              onClick={onClose}
            />,
          ]}
        />
        <TabList>
          <Tab text="Free" />
          <Tab text="Premium" />
          <Tab text="Wallpaper" />
        </TabList>
        <ModalBody>
          <TabPanels id="8">
            {Object.values(tabIdx2Contract).map((idx) => (
              <TabPanel key={idx}>
                <SimpleGrid columns={3} spacing="8px">
                  {items.map((item, i) => (
                    <Cart key={i} contract={tabIdx2Contract[tabIdx]} item={item} plus={() => plus(i)} minus={() => minus(i)} />
                  ))}
                </SimpleGrid>
              </TabPanel>
            ))}
          </TabPanels>
        </ModalBody>
        {items.some((item) => item.select > 0) && (
          <ModalFooter>
            <ModalFooterButton
              text={`PURCHASE ${
                {
                  [FREE_OBJECT_CONTRACT_ADDRESS]: "FREE OBJECTS",
                  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: "PREMIUM OBJECTS",
                  [WALLPAPER_CONTRACT_ADDRESS]: "WALLPAPER",
                }[tabIdx2Contract[tabIdx]]
              }`}
              buttonText={`${items.reduce((sum, item) => (item.select > 0 ? sum + item.select : sum), 0)} ITEMS`}
              onClick={() => {
                const tokenIds = items.reduce((memo, item) => {
                  return item.select > 0 ? [...memo, ...[...new Array(item.select)].map(() => item.tokenId)] : memo;
                }, [] as number[]);
                onSubmit[tabIdx2Contract[tabIdx]](tokenIds).then(() => reset(tabIdx2Contract[tabIdx]));
              }}
            />
          </ModalFooter>
        )}
      </Modal>
    </Tabs>
  );
};

export default Shop;
