import Image from "next/image";
import { FC, useContext, useMemo, useState } from "react";
import { useBalance, useProvider } from "wagmi";
import { utils } from "ethers";
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
import { event } from "~/utils/ga/ga";

type Item = ObjectMetadata & { select: number };

type Items = {
  [FREE_OBJECT_CONTRACT_ADDRESS]: Item[];
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: Item[];
  [WALLPAPER_CONTRACT_ADDRESS]: Item[];
};

const _defaultItems = (contract: ShopItemContractAddress): Item[] => {
  return Object.values(objectMetadataList[contract]).map((metadata) => ({ ...metadata, select: 0 }));
};

const defaultItems = () => ({
  [FREE_OBJECT_CONTRACT_ADDRESS]: _defaultItems(FREE_OBJECT_CONTRACT_ADDRESS),
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: _defaultItems(PREMIUM_OBJECT_CONTRACT_ADDRESS),
  [WALLPAPER_CONTRACT_ADDRESS]: _defaultItems(WALLPAPER_CONTRACT_ADDRESS),
});

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
              w="156px"
              defaultText="Add to Cart"
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
  address: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: {
    [FREE_OBJECT_CONTRACT_ADDRESS]: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
    [WALLPAPER_CONTRACT_ADDRESS]: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
  };
  onSubmit2: (fTokenIds: number[], pTokenIds: number[], wTokenIds: number[]) => Promise<TransactionResponse | undefined>;
  onClickNavi: () => void;
}> = ({ address, isOpen, onClose, onSubmit, onSubmit2, onClickNavi }) => {
  const { colorMode } = useContext(AppContext);
  const provider = useProvider();
  const { data } = useBalance({ addressOrName: address, watch: true });
  const [tabIdx, setTabIdx] = useState(0);
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();
  const openNavi = useNavi();

  const [items, setItems] = useState<Items>(defaultItems());
  const itemNum = useMemo(
    () => Object.values(items).reduce((sum, items) => sum + items.reduce((sum, item) => (item.select > 0 ? sum + item.select : sum), 0), 0),
    [items]
  );
  const itemPrice = useMemo(
    () =>
      Object.values(items).reduce(
        (sum, items) => sum + items.reduce((sum, item) => (item.select > 0 ? sum + item.select * item.price : sum), 0),
        0
      ),
    [items]
  );
  const isSelected = useMemo(() => Object.values(items).map((items) => items.some((item) => item.select > 0)), [items]);
  const insufficient = useMemo(() => !!data?.value?.lt(utils.parseUnits(itemPrice.toString(), data.decimals)), [data, itemPrice]);

  const plus = (contract: ShopItemContractAddress, idx: number) => {
    const copied = [...items[contract]];
    copied[idx].select += 1;
    setItems((prev) => ({ ...prev, [contract]: copied }));
  };
  const minus = (contract: ShopItemContractAddress, idx: number) => {
    const copied = [...items[contract]];
    copied[idx].select -= 1;
    setItems((prev) => ({ ...prev, [contract]: copied }));
  };
  const reset = () => setItems(defaultItems());

  return (
    <Tabs variant="unstyled" onChange={(idx) => setTabIdx(idx)}>
      <Modal w="832px" h="712px" isOpen={isOpen} onClose={onClose} onCloseComplete={reset}>
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
                  {items[tabIdx2Contract[tabIdx]].map((item, i) => (
                    <Cart
                      key={i}
                      contract={tabIdx2Contract[tabIdx]}
                      item={item}
                      plus={() => plus(tabIdx2Contract[tabIdx], i)}
                      minus={() => minus(tabIdx2Contract[tabIdx], i)}
                    />
                  ))}
                </SimpleGrid>
                {isSelected && <Box h="120px" />}
              </TabPanel>
            ))}
          </TabPanels>
        </ModalBody>
        {isSelected && (
          <Box w="full" position="absolute" bottom="0" left="0">
            <ModalFooter
              text="Purchase"
              subText="After purchase, your objects are stored in your wallet"
              itemNum={itemNum}
              itemPrice={itemPrice}
              isLoading={isLoading}
              disabled={insufficient}
              onClick={() => {
                startLoading();
                const tokenIds = Object.values(items).map((items) =>
                  items.reduce((memo, item) => {
                    return item.select > 0 ? [...memo, ...[...new Array(item.select)].map(() => item.tokenId)] : memo;
                  }, [] as number[])
                );
                console.log(tokenIds);
                onSubmit2(tokenIds[0], tokenIds[1], tokenIds[2])
                  .then(async (res) => {
                    if (!res?.hash) throw new Error("invalid hash");
                    // @ts-ignore
                    event({ action: { 0: "conversion_get_free", 1: "conversion_get_premium", 2: "conversion_get_wallpaper" }[tabIdx] });
                    reset();
                    await provider.waitForTransaction(res.hash);
                    stopLoading();
                    openNavi("You can now find your objects in your wallet.", "Open Wallet", onClickNavi);
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
