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
import { BalanceObject } from "~/types";
import Image from "next/image";
import { phiObjectMetadataList } from "~/types/object";
import { QuantityInput } from "~/ui/components";

export const useCollection = (
  originItems: BalanceObject[]
): [(BalanceObject & { selected: number })[], (idx: number) => void, (idx: number) => void] => {
  const [items, setItems] = useState<(BalanceObject & { selected: number })[]>([]);

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

  useEffect(() => {
    setItems(
      originItems.map((item) => {
        return { ...item, selected: 0 };
      })
    );
  }, [originItems.length]);

  return [items, plus, minus];
};

const Collection: FC<{
  items: (BalanceObject & { selected: number })[];
  isApproved: boolean;
  isOpen: boolean;
  onClose: () => void;
  onClickPlus: (idx: number) => void;
  onClickMinus: (idx: number) => void;
  onApprove: () => void;
  onSubmit: (args: BalanceObject[]) => void;
}> = ({ items, isApproved, isOpen, onClose, onClickPlus, onClickMinus, onApprove, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl" scrollBehavior="inside">
      <ModalContent border="2px solid" borderColor="black" borderRadius="none">
        <ModalHeader>Collection</ModalHeader>
        <ModalBody>
          <SimpleGrid columns={3} spacing="16px">
            {items.map((item, i) => (
              <Center key={i} position="relative" height="128px" cursor="pointer">
                <Box position="relative" width="96px" height="96px">
                  <Image
                    src={phiObjectMetadataList[item.contract][item.tokenId].image_url}
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
                <Box position="absolute" top={0} right={0}>
                  <QuantityInput
                    num={item.selected}
                    balance={item.amount}
                    handleClickMinus={() => onClickMinus(i)}
                    handleClickPlus={() => onClickPlus(i)}
                  />
                </Box>
              </Center>
            ))}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter justifyContent="center">
          {isApproved ? (
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
                        contract: item.contract,
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
              Deposit Objects / {items.filter((item) => item.selected > 0).length}
            </Button>
          ) : (
            <Button bgColor="gray.800" borderRadius="12px" color="white" onClick={() => onApprove()}>
              Approve
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Collection;
