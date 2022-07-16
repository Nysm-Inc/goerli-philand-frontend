import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { BalanceObject } from "~/types";
import { objectMetadataList } from "~/types/object";
import { Icon, IconButton, Modal, ModalBody, ModalFooter, ModalHeader, QuantityInput, ModalFooterButton } from "~/ui/components";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  PHI_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";
import { AppContext } from "~/contexts";

type CollectionObject = BalanceObject & { select: number };

const Collection: FC<{
  items: BalanceObject[];
  isApproved: {
    [PHI_OBJECT_CONTRACT_ADDRESS]: boolean;
    [FREE_OBJECT_CONTRACT_ADDRESS]: boolean;
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: boolean;
    [WALLPAPER_CONTRACT_ADDRESS]: boolean;
  };
  isEdit: boolean;
  isOpen: boolean;
  onOpenPermissions: () => void;
  onClose: () => void;
  onSubmit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>;
}> = ({ items: originItems, isApproved, isEdit, isOpen, onOpenPermissions, onClose, onSubmit }) => {
  const { colorMode } = useContext(AppContext);
  const [items, setItems] = useState<CollectionObject[]>([]);

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
    <Modal w="858px" h="700px" isOpen={isOpen} onClose={() => {}} onCloseComplete={reset}>
      <ModalHeader
        title="COLLECTION"
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
        <SimpleGrid columns={3} spacing="8px">
          {items.map((item, i) => (
            <VStack key={i} height="320px" p="16px" borderRadius="16px" bgColor={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"}>
              <Box w="100%" minH="144px" maxH="144px" position="relative">
                <Image src={objectMetadataList[item.contract][item.tokenId].image_url} layout="fill" objectFit="contain" />
              </Box>
              <Text textStyle="label-2" color="#808080">
                OWNED: {item.amount}
              </Text>
              <Text textStyle="headline-2" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
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
                    <Text textStyle="label-1" color="#8080FF" cursor="pointer" onClick={onOpenPermissions}>
                      + Deposit
                    </Text>
                  )}
                </>
              )}
            </VStack>
          ))}
        </SimpleGrid>
      </ModalBody>
      {items.some((item) => item.select > 0) && (
        <ModalFooter>
          <ModalFooterButton
            text="Deposit Objects"
            buttonText={`${items.reduce((sum, item) => (item.select > 0 ? sum + item.select : sum), 0)} ITEMS`}
            onClick={() => {
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
              onSubmit(args).then(() => reset());
            }}
          />
        </ModalFooter>
      )}
    </Modal>
  );
};

export default Collection;
