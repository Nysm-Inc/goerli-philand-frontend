import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { objectMetadataList } from "~/types/object";
import { BalanceObject, DepositObject, IObject, ObjectContractAddress } from "~/types";
import { Icon, IconButton, Modal, ModalBody, ModalFooter, ModalFooterButton, ModalHeader, QuantityInput } from "~/ui/components";
import { AppContext } from "~/contexts";

type InventoryObject = DepositObject & { select: number; writed: boolean };

export const useInventory = (
  originObjects: DepositObject[],
  isEdit: boolean
): [
  InventoryObject[],
  (idx: number) => void,
  (idx: number) => void,
  (contract: ObjectContractAddress, tokenId: number) => void,
  (contract: ObjectContractAddress, tokenId: number) => void,
  () => void
] => {
  const [objects, setObjects] = useState<InventoryObject[]>([]);

  const plus = (idx: number) => {
    const copied = [...objects];
    copied[idx].select += 1;
    setObjects(copied);
  };
  const minus = (idx: number) => {
    const copied = [...objects];
    copied[idx].select -= 1;
    setObjects(copied);
  };
  const tryWrite = (contract: ObjectContractAddress, tokenId: number) => {
    const copied = [...objects];
    const idx = copied.findIndex((c) => c.contractAddress === contract && c.tokenId === tokenId);
    copied[idx].used += 1;
    if (copied[idx].amount - copied[idx].used > 0) {
      setObjects(copied);
    } else {
      setObjects(copied.filter((_, i) => i !== idx));
    }
  };
  const tryRemove = (contract: ObjectContractAddress, tokenId: number) => {
    let copied = [...objects];
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
    setObjects(copied);
  };
  const reset = () => {
    setObjects(originObjects.map((object) => ({ ...object, select: 0, writed: false })));
  };

  useEffect(() => {
    reset();
  }, [originObjects.length, isEdit]);

  return [objects, plus, minus, tryWrite, tryRemove, reset];
};

const Inventory: FC<{
  objects: InventoryObject[];
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
  onClickPlus: (idx: number) => void;
  onClickMinus: (idx: number) => void;
  onClickObject: (object: IObject) => void;
  onSubmit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>;
  reset: () => void;
}> = ({ objects, isEdit, isOpen, onClose, onClickPlus, onClickMinus, onClickObject, onSubmit, reset }) => {
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
        <SimpleGrid columns={2} spacing="8px">
          {objects.map((object, i) => (
            <VStack
              key={i}
              align="flex-start"
              height="320px"
              p="16px"
              borderRadius="16px"
              bgColor={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"}
            >
              <Box
                position="relative"
                w="100%"
                minH="144px"
                maxH="144px"
                cursor={isEdit ? "pointer" : ""}
                onClick={() => {
                  if (!isEdit) return;

                  const metadata = objectMetadataList[object.contractAddress][object.tokenId];
                  onClickObject({
                    contractAddress: object.contractAddress,
                    tokenId: object.tokenId,
                    sizeX: metadata.size[0],
                    sizeY: metadata.size[1],
                    link: { title: "", url: "" },
                  });
                  onClose();
                }}
              >
                <Image src={objectMetadataList[object.contractAddress][object.tokenId].image_url} layout="fill" objectFit="contain" />
              </Box>
              <Text textStyle="label-2" color="#808080">
                OWNED {object.amount - object.used}
              </Text>
              <Text h="40px" textStyle="headline-3" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
                {objectMetadataList[object.contractAddress][object.tokenId].name}
              </Text>
              {!isEdit && !object.writed && (
                <QuantityInput
                  num={object.select}
                  balance={object.amount - object.used}
                  handleClickPlus={() => onClickPlus(i)}
                  handleClickMinus={() => onClickMinus(i)}
                />
              )}
            </VStack>
          ))}
        </SimpleGrid>
      </ModalBody>
      {objects.some((object) => object.select > 0) && (
        <ModalFooter>
          <ModalFooterButton
            text="Withdraw Objects"
            buttonText={`${objects.reduce((sum, item) => (item.select > 0 ? sum + item.select : sum), 0)} ITEMS`}
            onClick={() => {
              const args = objects.reduce((memo, object) => {
                if (object.select > 0) {
                  return [
                    ...memo,
                    {
                      contract: object.contractAddress,
                      tokenId: object.tokenId,
                      amount: object.select,
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

export default Inventory;
