import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, Center, SimpleGrid, Text, useBoolean, VStack } from "@chakra-ui/react";
import { BalanceObject } from "~/types";
import { objectMetadataList } from "~/types/object";
import { Icon, IconButton, Modal, ModalBody, ModalHeader, QuantityInput, ModalFooterButton, useNavi } from "~/ui/components";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  QUEST_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";
import { AppContext } from "~/contexts";

type CollectionObject = BalanceObject & { select: number };

const Collection: FC<{
  items: BalanceObject[];
  isApproved: {
    [QUEST_OBJECT_CONTRACT_ADDRESS]: boolean;
    [FREE_OBJECT_CONTRACT_ADDRESS]: boolean;
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: boolean;
    [WALLPAPER_CONTRACT_ADDRESS]: boolean;
  };
  isEdit: boolean;
  isOpen: boolean;
  onOpenPermissions: () => void;
  onOpenInventory: () => void;
  onClose: () => void;
  onSubmit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>;
}> = ({ items: originItems, isApproved, isEdit, isOpen, onOpenPermissions, onOpenInventory, onClose, onSubmit }) => {
  const { colorMode } = useContext(AppContext);
  const [items, setItems] = useState<CollectionObject[]>([]);
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
  const reset = () => {
    setItems(originItems.map((item) => ({ ...item, select: 0 })));
  };

  useEffect(() => {
    reset();
  }, [originItems.length]);

  return (
    <Modal w="832px" h="680px" isOpen={isOpen} onClose={() => {}} onCloseComplete={reset}>
      <ModalHeader
        title="COLLECTION"
        buttons={[
          <IconButton
            key="close"
            ariaLabel="close"
            icon={<Icon name="close" color={colorMode === "light" ? "grey.900" : "white"} />}
            size={32}
            onClick={onClose}
          />,
        ]}
      />
      <Box h="16px" />
      <ModalBody>
        {items.length > 0 ? (
          <SimpleGrid columns={3} spacing="8px">
            {items.map((item, i) => (
              <VStack key={i} height="320px" p="16px" borderRadius="16px" bgColor={colorMode === "light" ? "white" : "grey.900"}>
                <Box w="100%" minH="144px" maxH="144px" position="relative">
                  <Image src={objectMetadataList[item.contract][item.tokenId].image_url} layout="fill" objectFit="contain" />
                </Box>
                <Text textStyle="label-2" color="grey.500">
                  OWNED: {item.amount}
                </Text>
                <Text textStyle="headline-2" color={colorMode === "light" ? "grey.900" : "white"}>
                  {objectMetadataList[item.contract][item.tokenId].name}
                </Text>
                <Box h="8px" />
                {!isEdit && (
                  <>
                    {isApproved[item.contract] ? (
                      <>
                        {item.contract !== WALLPAPER_CONTRACT_ADDRESS && (
                          <QuantityInput
                            defaultText="+ Deposit"
                            num={item.select}
                            balance={item.amount}
                            handleClickMinus={() => minus(i)}
                            handleClickPlus={() => plus(i)}
                          />
                        )}
                      </>
                    ) : (
                      <Text textStyle="label-1" color="primary.500" cursor="pointer" onClick={onOpenPermissions}>
                        + Deposit
                      </Text>
                    )}
                  </>
                )}
              </VStack>
            ))}
          </SimpleGrid>
        ) : (
          <Center w="100%" h="562px" borderRadius="16px" bgColor={colorMode === "light" ? "white" : "grey.900"}>
            <VStack spacing="32px">
              <Image src="/assets/empty-collection.png" width="360px" height="240px" />
              <Text w="300px" h="40px" color="grey.500" textStyle="paragraph-2" textAlign="center">
                {"Manage Objects & Wallpaper collected from Shops and Quests"}
              </Text>
            </VStack>
          </Center>
        )}
      </ModalBody>
      {items.some((item) => item.select > 0) && (
        <Box w="full" position="absolute" bottom="0" left="0">
          <ModalFooterButton
            text="Deposit"
            buttonText={`${items.reduce((sum, item) => (item.select > 0 ? sum + item.select : sum), 0)} ITEMS`}
            subText="The deposited objects is stored in Inventory"
            isLoading={isLoading}
            onClick={() => {
              startLoading();
              const args = items.reduce((memo, item) => {
                if (item.select > 0) {
                  return [
                    ...memo,
                    {
                      contract: item.contract,
                      tokenId: item.tokenId,
                      amount: item.select,
                    },
                  ];
                } else {
                  return memo;
                }
              }, [] as BalanceObject[]);
              onSubmit(args)
                .then(async (res) => {
                  reset();
                  await res?.wait();
                  stopLoading();
                  openNavi("Deposited Objects into Inventory.", "Open Inventory", () => {
                    onClose();
                    onOpenInventory();
                  });
                })
                .catch(stopLoading);
            }}
          />
        </Box>
      )}
    </Modal>
  );
};

export default Collection;
