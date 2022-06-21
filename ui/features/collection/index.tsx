import { FC, useEffect, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, Button, Center, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, SimpleGrid } from "@chakra-ui/react";
import { BalanceObject } from "~/types";
import Image from "next/image";
import { objectMetadataList } from "~/types/object";
import { QuantityInput } from "~/ui/components";

type CollectionObject = BalanceObject & { select: number };

const Collection: FC<{
  items: BalanceObject[];
  isApproved: {
    phi: boolean;
    free: boolean;
    premium: boolean;
  };
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
  onApprove: {
    phi: () => void;
    free: () => void;
    premium: () => void;
  };
  onSubmit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>;
}> = ({ items: originItems, isApproved, isEdit, isOpen, onClose, onApprove, onSubmit }) => {
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalContent border="2px solid" borderColor="black" borderRadius="none" minW="600px" minH="600px" maxW="600px" maxH="600px">
        <ModalHeader>Collection</ModalHeader>
        <ModalBody>
          <SimpleGrid columns={3} spacing="16px">
            {items.map((item, i) => (
              <Center key={i} position="relative" height="128px">
                <Box position="relative" width="96px" height="96px">
                  <Image src={objectMetadataList[item.contract][item.tokenId].image_url} layout="fill" objectFit="contain" />
                </Box>
                {!isEdit && (
                  <Box position="absolute" top={0} right={0}>
                    <QuantityInput
                      num={item.select}
                      balance={item.amount}
                      handleClickMinus={() => minus(i)}
                      handleClickPlus={() => plus(i)}
                    />
                  </Box>
                )}
              </Center>
            ))}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter justifyContent="center">
          {!isEdit && isApproved.phi && isApproved.free && isApproved.premium && (
            <Button
              bgColor="gray.800"
              borderRadius="12px"
              color="white"
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
              disabled={!items.some((item) => item.select > 0)}
            >
              Deposit Objects / {items.filter((item) => item.select > 0).length}
            </Button>
          )}
          <HStack>
            {!isApproved.phi && (
              <Button bgColor="gray.800" borderRadius="12px" color="white" onClick={() => onApprove.phi()}>
                Approve Phi
              </Button>
            )}
            {!isApproved.free && (
              <Button bgColor="gray.800" borderRadius="12px" color="white" onClick={() => onApprove.free()}>
                Approve Free
              </Button>
            )}
            {!isApproved.premium && (
              <Button bgColor="gray.800" borderRadius="12px" color="white" onClick={() => onApprove.premium()}>
                Approve Premium
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Collection;
