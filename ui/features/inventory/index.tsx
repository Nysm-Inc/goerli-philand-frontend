import Image from "next/image";
import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
} from "@chakra-ui/react";
import { objectMetadataList } from "~/types/object";
import { BalanceObject, DepositObject, IObject } from "~/types";
import { QuantityInput } from "~/ui/components";

type InventoryObject = DepositObject & { selected: number; deposited: boolean };

export const useInventory = (
  originItems: DepositObject[]
): [
  InventoryObject[],
  (idx: number) => void,
  (idx: number) => void,
  (contract: string, tokenId: number) => void,
  (contract: string, tokenId: number) => void,
  () => void
] => {
  const [items, setItems] = useState<InventoryObject[]>([]);

  const plus = (idx: number) => {
    const copied = [...items];
    copied[idx].selected += 1;
    setItems(copied);
  };
  const minus = (idx: number) => {
    const copied = [...items];
    copied[idx].selected -= 1;
    setItems(copied);
  };
  const plusUsed = (contract: string, tokenId: number) => {
    const copied = [...items];
    const idx = copied.findIndex((c) => c.contractAddress === contract && c.tokenId === tokenId);
    copied[idx].used += 1;
    if (copied[idx].amount - copied[idx].used > 0) {
      setItems(copied);
    } else {
      setItems(copied.filter((_, i) => i !== idx));
    }
  };
  const minusUsed = (contract: string, tokenId: number) => {
    let copied = [...items];
    const idx = copied.findIndex((c) => c.contractAddress === contract && c.tokenId === tokenId);
    if (idx > 0) {
      copied[idx].used -= 1;
    } else {
      copied = [
        ...copied,
        {
          contractAddress: contract,
          tokenId: tokenId,
          amount: 1,
          used: 0,
          selected: 0,
          deposited: true,
        },
      ];
    }
    copied.sort((a, b) => a.tokenId - b.tokenId);
    setItems(copied);
  };
  const reset = () => {
    const origin = originItems.map((item) => {
      return { ...item, selected: 0, deposited: false };
    });
    setItems(origin);
  };

  useEffect(() => {
    const deposited = items.filter((item) => item.deposited);
    const origin = originItems.map((item) => {
      return { ...item, selected: 0, deposited: false };
    });

    const updated = [...deposited, ...origin];
    updated.sort((a, b) => a.tokenId - b.tokenId);
    setItems(updated);
  }, [originItems.length]);

  return [items, plus, minus, plusUsed, minusUsed, reset];
};

const Inventory: FC<{
  items: InventoryObject[];
  isOpen: boolean;
  readonly: boolean;
  onClose: () => void;
  onClickPlus: (idx: number) => void;
  onClickMinus: (idx: number) => void;
  onClickItem: (object: IObject) => void;
  onSubmit: (args: BalanceObject[]) => void;
}> = ({ readonly, items, isOpen, onClose, onClickPlus, onClickMinus, onClickItem, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalContent
        border="2px solid"
        borderColor="black"
        borderRadius="none"
        minW="480px"
        minH="600px"
        maxW="480px"
        maxH="600px"
        position="absolute"
        left="48px"
      >
        <ModalHeader>Inventory</ModalHeader>
        <ModalBody>
          <SimpleGrid columns={3} spacing="16px">
            {items.map((item, i) => (
              <Center key={i} position="relative" height="128px">
                <Box
                  position="relative"
                  width="96px"
                  height="96px"
                  cursor={readonly ? "" : "pointer"}
                  onClick={() => {
                    if (readonly) return;

                    const metadata = objectMetadataList[item.contractAddress][item.tokenId];
                    onClickItem({
                      contractAddress: item.contractAddress,
                      tokenId: item.tokenId,
                      sizeX: metadata.size[0],
                      sizeY: metadata.size[1],
                    });
                    onClose();
                  }}
                >
                  <Image
                    src={objectMetadataList[item.contractAddress][item.tokenId].image_url}
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
                {!item.deposited && (
                  <Box position="absolute" top={0} right={0}>
                    <QuantityInput
                      num={item.selected}
                      balance={item.amount}
                      handleClickPlus={() => onClickPlus(i)}
                      handleClickMinus={() => onClickMinus(i)}
                    />
                  </Box>
                )}
              </Center>
            ))}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            bgColor="gray.800"
            borderRadius="12px"
            color="white"
            onClick={() => {
              const args = items.reduce((memo, item) => {
                if (item.selected > 0) {
                  return [
                    ...memo,
                    {
                      contract: item.contractAddress,
                      tokenId: item.tokenId,
                      amount: item.selected,
                    },
                  ];
                } else {
                  return memo;
                }
              }, [] as BalanceObject[]);
              onSubmit(args);
            }}
          >
            Withdraw Objects / {items.filter((item) => item.selected > 0).length}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Inventory;
