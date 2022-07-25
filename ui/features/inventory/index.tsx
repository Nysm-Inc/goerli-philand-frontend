import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, Center, SimpleGrid, Text, useBoolean, VStack } from "@chakra-ui/react";
import { objectMetadataList } from "~/types/object";
import { BalanceObject, DepositObject, IObject, ObjectContractAddress } from "~/types";
import { Icon, IconButton, Modal, ModalBody, ModalFooterButton, ModalHeader, QuantityInput, useNavi } from "~/ui/components";
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
  onOpenCollection: () => void;
  onClose: () => void;
  onClickPlus: (idx: number) => void;
  onClickMinus: (idx: number) => void;
  onClickObject: (object: IObject) => void;
  onSubmit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>;
  reset: () => void;
}> = ({ objects, isEdit, isOpen, onOpenCollection, onClose, onClickPlus, onClickMinus, onClickObject, onSubmit, reset }) => {
  const { colorMode } = useContext(AppContext);
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();
  const openNavi = useNavi();

  return (
    <Modal
      w="480px"
      h="720px"
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
            icon={<Icon name="close" color={colorMode === "light" ? "grey.900" : "white"} />}
            size={32}
            borderRadius={8}
            boxShadow={false}
            onClick={onClose}
          />,
        ]}
      />
      <Box h="16px" />
      <ModalBody>
        {objects.length > 0 ? (
          <SimpleGrid columns={2} spacing="8px">
            {objects.map((object, i) => (
              <VStack
                key={i}
                align="flex-start"
                height="288px"
                p="16px"
                borderRadius="16px"
                bgColor={colorMode === "light" ? "white" : "grey.900"}
              >
                <Center
                  position="relative"
                  w="100%"
                  h="144px"
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
                  <Box position="relative" w="96px" h="96px">
                    <Image src={objectMetadataList[object.contractAddress][object.tokenId].image_url} layout="fill" objectFit="contain" />
                  </Box>
                </Center>
                <Text textStyle="label-2" color="grey.500">
                  OWNED {object.amount - object.used}
                </Text>
                <Text h="40px" textStyle="headline-3" color={colorMode === "light" ? "grey.900" : "white"}>
                  {objectMetadataList[object.contractAddress][object.tokenId].name}
                </Text>
                {!isEdit && !object.writed && (
                  <QuantityInput
                    defaultText="+ Withdraw"
                    num={object.select}
                    balance={object.amount - object.used}
                    handleClickPlus={() => onClickPlus(i)}
                    handleClickMinus={() => onClickMinus(i)}
                  />
                )}
              </VStack>
            ))}
          </SimpleGrid>
        ) : (
          <Center w="100%" h="616px" borderRadius="16px" bgColor={colorMode === "light" ? "white" : "grey.900"}>
            <VStack spacing="32px">
              <Image src="/assets/empty-inventory.png" width="360px" height="270px" />
              <Text w="300px" h="40px" color="grey.500" textStyle="paragraph-2" textAlign="center">
                {"To place Objects & Wallpapers in Land, Deposit them from Collection."}
              </Text>
            </VStack>
          </Center>
        )}
      </ModalBody>
      {objects.some((object) => object.select > 0) && (
        <Box w="full" position="absolute" bottom="0" left="0">
          <ModalFooterButton
            text="Withdraw"
            buttonText={`${objects.reduce((sum, item) => (item.select > 0 ? sum + item.select : sum), 0)} ITEMS`}
            buttonW="full"
            subText="The deposited objects is stored in Inventory"
            isLoading={isLoading}
            onClick={() => {
              startLoading();
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
              onSubmit(args)
                .then(async (res) => {
                  reset();
                  await res?.wait();
                  stopLoading();
                  openNavi("Withdrew Objects into Collection.", "Open Collection", () => {
                    onClose();
                    onOpenCollection();
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

export default Inventory;
