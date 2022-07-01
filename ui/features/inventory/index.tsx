import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, Button, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { objectMetadataList } from "~/types/object";
import { BalanceObject, DepositObject, IObject, ObjectContractAddress } from "~/types";
import { Icon, IconButton, Modal, ModalBody, ModalFooter, ModalHeader, QuantityInput } from "~/ui/components";
import { AppContext } from "~/contexts";

type InventoryObject = DepositObject & { select: number; writed: boolean };

export const useInventory = (
  originItems: DepositObject[],
  isEdit: boolean
): [
  InventoryObject[],
  (idx: number) => void,
  (idx: number) => void,
  (contract: ObjectContractAddress, tokenId: number) => void,
  (contract: ObjectContractAddress, tokenId: number) => void,
  () => void
] => {
  const [items, setItems] = useState<InventoryObject[]>([]);

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
  const tryWrite = (contract: ObjectContractAddress, tokenId: number) => {
    const copied = [...items];
    const idx = copied.findIndex((c) => c.contractAddress === contract && c.tokenId === tokenId);
    copied[idx].used += 1;
    if (copied[idx].amount - copied[idx].used > 0) {
      setItems(copied);
    } else {
      setItems(copied.filter((_, i) => i !== idx));
    }
  };
  const tryRemove = (contract: ObjectContractAddress, tokenId: number) => {
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
          select: 0,
          writed: true,
        },
      ];
    }
    copied.sort((a, b) => a.tokenId - b.tokenId);
    setItems(copied);
  };
  const reset = () => {
    setItems(originItems.map((item) => ({ ...item, select: 0, writed: false })));
  };

  useEffect(() => {
    reset();
  }, [originItems.length, isEdit]);

  return [items, plus, minus, tryWrite, tryRemove, reset];
};

const Inventory: FC<{
  items: InventoryObject[];
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
  onClickPlus: (idx: number) => void;
  onClickMinus: (idx: number) => void;
  onClickItem: (object: IObject) => void;
  onSubmit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>;
  reset: () => void;
}> = ({ items, isEdit, isOpen, onClose, onClickPlus, onClickMinus, onClickItem, onSubmit, reset }) => {
  const { colorMode } = useContext(AppContext);
  return (
    <Modal
      w="408px"
      h="728px"
      left="24px"
      isOpen={isOpen}
      onClose={() => {}}
      onCloseComplete={() => {
        if (!isEdit) reset();
      }}
    >
      <ModalHeader
        title="INVENTORY"
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
        <SimpleGrid columns={2}>
          {items.map((item, i) => (
            <VStack key={i} height="320px" p="16px">
              <Box
                position="relative"
                w="100%"
                minH="144px"
                maxH="144px"
                cursor={isEdit ? "pointer" : ""}
                onClick={() => {
                  if (!isEdit) return;

                  const metadata = objectMetadataList[item.contractAddress][item.tokenId];
                  onClickItem({
                    contractAddress: item.contractAddress,
                    tokenId: item.tokenId,
                    sizeX: metadata.size[0],
                    sizeY: metadata.size[1],
                    link: { title: "", url: "" },
                  });
                  onClose();
                }}
              >
                <Image src={objectMetadataList[item.contractAddress][item.tokenId].image_url} layout="fill" objectFit="contain" />
              </Box>
              <Text>use: {item.used}</Text>
              <Text>name</Text>
              {!isEdit && !item.writed && (
                <QuantityInput
                  num={item.select}
                  balance={item.amount}
                  handleClickPlus={() => onClickPlus(i)}
                  handleClickMinus={() => onClickMinus(i)}
                />
              )}
            </VStack>
          ))}
        </SimpleGrid>
      </ModalBody>
      {items.some((item) => item.select > 0) && (
        <ModalFooter>
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
                      contract: item.contractAddress,
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
            Withdraw Objects / {items.filter((item) => item.select > 0).length}
          </Button>
        </ModalFooter>
      )}
    </Modal>
  );
};

export default Inventory;
