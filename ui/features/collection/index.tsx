import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, Flex, SimpleGrid, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { BalanceObject } from "~/types";
import { objectMetadataList } from "~/types/object";
import { Icon, IconButton, Button, Modal, ModalBody, ModalFooter, ModalHeader, QuantityInput } from "~/ui/components";
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
  onClose: () => void;
  onApprove: {
    [PHI_OBJECT_CONTRACT_ADDRESS]: () => void;
    [FREE_OBJECT_CONTRACT_ADDRESS]: () => void;
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: () => void;
    [WALLPAPER_CONTRACT_ADDRESS]: () => void;
  };
  onSubmit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>;
}> = ({ items: originItems, isApproved, isEdit, isOpen, onClose, onApprove, onSubmit }) => {
  const { colorMode } = useContext(AppContext);
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
    <Modal
      w={isOpenApprove ? "528px" : "858px"}
      h={isOpenApprove ? "428px" : "700px"}
      isOpen={isOpen}
      onClose={() => {}}
      onCloseComplete={reset}
    >
      {isOpenApprove ? (
        <>
          <ModalHeader
            title="Collection"
            buttons={[
              <IconButton
                key="close"
                ariaLabel="close"
                icon={<Icon name="close" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
                size={32}
                onClick={onCloseApprove}
              />,
            ]}
          />
          <ModalBody>
            <VStack>
              <Flex w="full" h="72px" p="16px" align="center" justify="space-between">
                <Text>Phi Object</Text>
                <Button
                  w={isApproved[PHI_OBJECT_CONTRACT_ADDRESS] ? "183px" : "140px"}
                  color={isApproved[PHI_OBJECT_CONTRACT_ADDRESS] ? undefined : "purple"}
                  onClick={() => onApprove[PHI_OBJECT_CONTRACT_ADDRESS]()}
                  disabled={isApproved[PHI_OBJECT_CONTRACT_ADDRESS]}
                  leftIcon={isApproved[PHI_OBJECT_CONTRACT_ADDRESS] ? <Icon name="check" /> : undefined}
                >
                  <Text color="white" textStyle="button-1">
                    {isApproved[PHI_OBJECT_CONTRACT_ADDRESS] ? "Approved" : "Approve"}
                  </Text>
                </Button>
              </Flex>
              <Flex w="full" h="72px" p="16px" align="center" justify="space-between">
                <Text>Free Object</Text>
                <Button
                  w={isApproved[FREE_OBJECT_CONTRACT_ADDRESS] ? "183px" : "140px"}
                  color={isApproved[FREE_OBJECT_CONTRACT_ADDRESS] ? undefined : "purple"}
                  onClick={() => onApprove[FREE_OBJECT_CONTRACT_ADDRESS]()}
                  disabled={isApproved[FREE_OBJECT_CONTRACT_ADDRESS]}
                  leftIcon={isApproved[FREE_OBJECT_CONTRACT_ADDRESS] ? <Icon name="check" /> : undefined}
                >
                  <Text color="white" textStyle="button-1">
                    {isApproved[FREE_OBJECT_CONTRACT_ADDRESS] ? "Approved" : "Approve"}
                  </Text>
                </Button>
              </Flex>

              <Flex w="full" h="72px" p="16px" align="center" justify="space-between">
                <Text>Premium Object</Text>
                <Button
                  w={isApproved[PREMIUM_OBJECT_CONTRACT_ADDRESS] ? "183px" : "140px"}
                  color={isApproved[PREMIUM_OBJECT_CONTRACT_ADDRESS] ? undefined : "purple"}
                  onClick={() => onApprove[PREMIUM_OBJECT_CONTRACT_ADDRESS]()}
                  disabled={isApproved[PREMIUM_OBJECT_CONTRACT_ADDRESS]}
                  leftIcon={isApproved[PREMIUM_OBJECT_CONTRACT_ADDRESS] ? <Icon name="check" /> : undefined}
                >
                  <Text color="white" textStyle="button-1">
                    {isApproved[PREMIUM_OBJECT_CONTRACT_ADDRESS] ? "Approved" : "Approve"}
                  </Text>
                </Button>
              </Flex>
              <Flex w="full" h="72px" p="16px" align="center" justify="space-between">
                <Text>Wallpaper</Text>
                <Button
                  w={isApproved[WALLPAPER_CONTRACT_ADDRESS] ? "183px" : "140px"}
                  color={isApproved[WALLPAPER_CONTRACT_ADDRESS] ? undefined : "purple"}
                  onClick={() => onApprove[WALLPAPER_CONTRACT_ADDRESS]()}
                  disabled={isApproved[WALLPAPER_CONTRACT_ADDRESS]}
                  leftIcon={isApproved[WALLPAPER_CONTRACT_ADDRESS] ? <Icon name="check" /> : undefined}
                >
                  <Text color="white" textStyle="button-1">
                    {isApproved[WALLPAPER_CONTRACT_ADDRESS] ? "Approved" : "Approve"}
                  </Text>
                </Button>
              </Flex>
            </VStack>
          </ModalBody>
        </>
      ) : (
        <>
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
            <SimpleGrid columns={3}>
              {items.map((item, i) => (
                <VStack key={i} height="320px" p="16px">
                  <Box w="100%" minH="144px" maxH="144px" position="relative">
                    <Image src={objectMetadataList[item.contract][item.tokenId].image_url} layout="fill" objectFit="contain" />
                  </Box>
                  <Text>owned: {item.amount}</Text>
                  <Text>name</Text>
                  {!isEdit && (
                    <>
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
                    </>
                  )}
                </VStack>
              ))}
            </SimpleGrid>
          </ModalBody>
          {items.some((item) => item.select > 0) && (
            <ModalFooter>
              <Button
                w="200px"
                color="grey"
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
            </ModalFooter>
          )}
        </>
      )}
    </Modal>
  );
};

export default Collection;
