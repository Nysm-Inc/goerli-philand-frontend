import Image from "next/image";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useProvider } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { Box, Center, HStack, SimpleGrid, Text, useBoolean, VStack } from "@chakra-ui/react";
import { BalanceObject } from "~/types";
import { objectMetadataList } from "~/types/object";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { AppContext } from "~/contexts";
import Icon from "~/ui/components/Icon";
import useNavi from "~/ui/components/NaviNotification";
import QuantityInput from "~/ui/components/common/QuantityInput";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "~/ui/components/common/Modal";
import IconButton from "~/ui/components/common/IconButton";
import Checkbox from "~/ui/components/common/Checkbox";
import { event } from "~/utils/ga/ga";

type WalletObject = BalanceObject & { select: number };

const Wallet: FC<{
  items: BalanceObject[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>;
  onClickNavi: () => void;
  onRefetchDepositObjects: () => void;
}> = ({ items: originItems, isOpen, onClose, onSubmit, onClickNavi, onRefetchDepositObjects }) => {
  const { colorMode } = useContext(AppContext);
  const provider = useProvider();
  const [items, setItems] = useState<WalletObject[]>([]);
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();
  const openNavi = useNavi();
  const checked = useMemo(() => {
    return items.reduce((memo, item) => (item.contract === WALLPAPER_CONTRACT_ADDRESS ? memo : memo + item.amount - item.select), 0) === 0;
  }, [items]);

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
    <Modal w="832px" h="680px" isOpen={isOpen} onClose={onClose} onCloseComplete={reset}>
      <ModalHeader
        title="WALLET"
        buttons={[
          <IconButton
            key="close"
            ariaLabel="close"
            boxShadow={false}
            icon={<Icon name="close" color={colorMode === "light" ? "grey.900" : "white"} />}
            size="32px"
            onClick={onClose}
          />,
        ]}
      />
      {items.length > 0 ? (
        <HStack h="36px" m="16px 0 24px 0" align="center" spacing="8px">
          <Checkbox
            checked={checked}
            onCheck={() => {
              setItems((prev) =>
                prev.reduce((memo, p) => {
                  return [...memo, p.contract === WALLPAPER_CONTRACT_ADDRESS ? p : { ...p, select: checked ? 0 : p.amount }];
                }, [] as WalletObject[])
              );
            }}
          />
          <Text textStyle="label-1" color={colorMode === "light" ? "grey.900" : "grey.100"}>
            Select All
          </Text>
        </HStack>
      ) : (
        <Box h="16px" />
      )}
      <ModalBody>
        {items.length > 0 ? (
          <>
            <SimpleGrid columns={3} spacing="8px">
              {items.map((item, i) => (
                <VStack
                  key={i}
                  height="288px"
                  p="16px"
                  borderRadius="16px"
                  bgColor={colorMode === "light" ? "white" : "grey.900"}
                  _hover={{
                    bgColor: colorMode === "light" ? "light.lg_orange40" : "dark.grey700",
                  }}
                >
                  <Center w="100%" h="144px">
                    <Box position="relative" w="96px" h="96px">
                      <Image
                        src={objectMetadataList[item.contract][item.tokenId].image_url}
                        layout="fill"
                        objectFit="contain"
                        draggable={false}
                      />
                    </Box>
                  </Center>
                  <Text textStyle="label-2" color="grey.500">
                    OWNED: {item.amount}
                  </Text>
                  <Text h="40px" textStyle="headline-2" textAlign="center" color={colorMode === "light" ? "grey.900" : "white"}>
                    {objectMetadataList[item.contract][item.tokenId].name}
                  </Text>
                  {item.contract !== WALLPAPER_CONTRACT_ADDRESS && (
                    <QuantityInput
                      defaultText="Deposit"
                      num={item.select}
                      balance={item.amount}
                      handleClickMinus={() => minus(i)}
                      handleClickPlus={() => plus(i)}
                    />
                  )}
                </VStack>
              ))}
            </SimpleGrid>
            {items.some((item) => item.select > 0) && <Box h="120px" />}
          </>
        ) : (
          <Center w="100%" h="562px" borderRadius="16px" bgColor={colorMode === "light" ? "white" : "grey.900"}>
            <VStack spacing="32px">
              <Image src={`/assets/empty-wallet_${colorMode}.png`} width="360px" height="270px" alt="" />
              <Text w="300px" h="40px" color="grey.500" textStyle="paragraph-2" textAlign="center">
                {"Manage Objects & Wallpaper collected from Shops and Quests"}
              </Text>
            </VStack>
          </Center>
        )}
      </ModalBody>
      {items.some((item) => item.select > 0) && (
        <Box w="full" position="absolute" bottom="0" left="0">
          <ModalFooter
            text="Deposit"
            itemNum={items.reduce((sum, item) => (item.select > 0 ? sum + item.select : sum), 0)}
            subText="Objects Selected here will be placed on your PHI land"
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
                  if (!res?.hash) throw new Error("invalid hash");
                  event({ action: "conversion_deposit" });

                  reset();
                  await provider.waitForTransaction(res.hash);
                  onRefetchDepositObjects();
                  stopLoading();
                  openNavi("All Set! Let’s Edit Your Land.", "Edit Land", onClickNavi);
                })
                .catch(stopLoading);
            }}
          />
        </Box>
      )}
    </Modal>
  );
};

export default Wallet;
