import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { BalanceObject } from "~/types";
import { objectMetadataList } from "~/types/object";
import { QuantityInput } from "~/ui/components";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  PHI_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";

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
  onClose: () => void;
  onApprove: {
    [PHI_OBJECT_CONTRACT_ADDRESS]: () => void;
    [FREE_OBJECT_CONTRACT_ADDRESS]: () => void;
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: () => void;
    [WALLPAPER_CONTRACT_ADDRESS]: () => void;
  };
  onSubmit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>;
}> = ({ items: originItems, isApproved, isEdit, isOpen, onClose, onApprove, onSubmit }) => {
  const [items, setItems] = useState<CollectionObject[]>([]);
  const { isOpen: isOpenApprove, onOpen: onOpenApprove, onClose: onCloseApprove } = useDisclosure();

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
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside" onCloseComplete={reset}>
      <ModalContent border="2px solid" borderColor="black" borderRadius="none" minW="600px" minH="600px" maxW="600px" maxH="600px">
        {isOpenApprove ? (
          <>
            <ModalHeader>
              <Flex justify="space-between">
                <Text>Collection</Text>
                <Button onClick={onCloseApprove}>👈</Button>
              </Flex>
            </ModalHeader>
            <ModalBody>
              <VStack spacing="24px">
                {!isApproved[PHI_OBJECT_CONTRACT_ADDRESS] && (
                  <Button bgColor="gray.800" borderRadius="12px" color="white" onClick={() => onApprove[PHI_OBJECT_CONTRACT_ADDRESS]()}>
                    Approve Phi
                  </Button>
                )}
                {!isApproved[FREE_OBJECT_CONTRACT_ADDRESS] && (
                  <Button bgColor="gray.800" borderRadius="12px" color="white" onClick={() => onApprove[FREE_OBJECT_CONTRACT_ADDRESS]()}>
                    Approve Free
                  </Button>
                )}
                {!isApproved[PREMIUM_OBJECT_CONTRACT_ADDRESS] && (
                  <Button bgColor="gray.800" borderRadius="12px" color="white" onClick={() => onApprove[PREMIUM_OBJECT_CONTRACT_ADDRESS]()}>
                    Approve Premium
                  </Button>
                )}
                {!isApproved[WALLPAPER_CONTRACT_ADDRESS] && (
                  <Button bgColor="gray.800" borderRadius="12px" color="white" onClick={() => onApprove[WALLPAPER_CONTRACT_ADDRESS]()}>
                    Approve Wallpaper
                  </Button>
                )}
              </VStack>
            </ModalBody>
          </>
        ) : (
          <>
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
                        {isApproved[item.contract] ? (
                          <QuantityInput
                            num={item.select}
                            balance={item.amount}
                            handleClickMinus={() => minus(i)}
                            handleClickPlus={() => plus(i)}
                          />
                        ) : (
                          <Text cursor="pointer" onClick={onOpenApprove}>
                            + Deposit
                          </Text>
                        )}
                      </Box>
                    )}
                  </Center>
                ))}
              </SimpleGrid>
            </ModalBody>
            <ModalFooter justifyContent="center">
              {!isEdit && (
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
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Collection;
