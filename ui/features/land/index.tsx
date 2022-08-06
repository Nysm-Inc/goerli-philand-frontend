import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import type { TransactionResponse } from "@ethersproject/providers";
import { Box, Center, SimpleGrid, Text, useBoolean, VStack } from "@chakra-ui/react";
import { objectMetadataList } from "~/types/object";
import { BalanceObject, DepositObject, IObject, ObjectContractAddress } from "~/types";
import { Icon, IconButton, Modal, ModalBody, ModalFooter, ModalHeader, QuantityInput, useNavi } from "~/ui/components";
import { AppContext } from "~/contexts";

type LandObject = DepositObject & { select: number; writed: boolean };

export const useLand = (
  originObjects: DepositObject[],
  isEdit: boolean
): [
  LandObject[],
  (idx: number) => void,
  (idx: number) => void,
  (contract: ObjectContractAddress, tokenId: number) => void,
  (contract: ObjectContractAddress, tokenId: number) => void,
  () => void
] => {
  const [objects, setObjects] = useState<LandObject[]>([]);

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
    if (idx < 0) {
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
    } else {
      copied[idx].used -= 1;
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

const Land: FC<{
  objects: LandObject[];
  isEdit: boolean;
  isOpen: boolean;
  onOpenWallet: () => void;
  onClose: () => void;
  onClickPlus: (idx: number) => void;
  onClickMinus: (idx: number) => void;
  onClickObject: (object: IObject) => void;
  onSubmit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>;
  reset: () => void;
}> = ({ objects, isEdit, isOpen, onOpenWallet, onClose, onClickPlus, onClickMinus, onClickObject, onSubmit, reset }) => {
  const { colorMode } = useContext(AppContext);
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();
  const openNavi = useNavi();

  return (
    <Modal
      w="480px"
      h="720px"
      left="24px"
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={() => {
        if (!isEdit) reset();
      }}
    >
      <ModalHeader
        title="LAND"
        buttons={[
          <IconButton
            key="close"
            ariaLabel="close"
            icon={<Icon name="close" color={colorMode === "light" ? "grey.900" : "white"} />}
            size="32px"
            borderRadius="8px"
            boxShadow={false}
            onClick={onClose}
          />,
        ]}
      />
      <Box h="16px" />
      <ModalBody>
        {objects.length > 0 ? (
          <>
            <SimpleGrid columns={2} spacing="8px">
              {objects.map((object, i) => (
                <VStack
                  key={i}
                  align="flex-start"
                  height={isEdit ? "244px" : "288px"}
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
                      <Image
                        src={objectMetadataList[object.contractAddress][object.tokenId].image_url}
                        layout="fill"
                        objectFit="contain"
                        draggable={false}
                      />
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
                      w="full"
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
            {objects.some((object) => object.select > 0) && <Box h="120px" />}
          </>
        ) : (
          <Center w="100%" h="606px" borderRadius="16px" bgColor={colorMode === "light" ? "white" : "grey.900"}>
            <VStack spacing="32px">
              <Image src={`/assets/empty-land_${colorMode}.png`} width="360px" height="270px" />
              <Text w="300px" h="40px" color="grey.500" textStyle="paragraph-2" textAlign="center">
                {"To place Objects & Wallpapers in Land, Deposit them from Wallet."}
              </Text>
            </VStack>
          </Center>
        )}
      </ModalBody>
      {objects.some((object) => object.select > 0) && (
        <Box w="full" position="absolute" bottom="0" left="0">
          <ModalFooter
            text="Withdraw"
            itemNum={objects.reduce((sum, item) => (item.select > 0 ? sum + item.select : sum), 0)}
            buttonW="full"
            subText="The selected object is withdrawn from the Wallet"
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
                  openNavi("Withdrew Objects into Wallet.", "Open Wallet", () => {
                    onClose();
                    onOpenWallet();
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

export default Land;