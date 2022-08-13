import Image from "next/image";
import { Dispatch, FC, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import type { TransactionResponse } from "@ethersproject/providers";
import { Box, Center, HStack, SimpleGrid, Text, useBoolean, VStack } from "@chakra-ui/react";
import { objectMetadataList } from "~/types/object";
import { BalanceObject, DepositObject, IObject, ObjectContractAddress } from "~/types";
import { AppContext } from "~/contexts";
import Icon from "~/ui/components/Icon";
import useNavi from "~/ui/components/NaviNotification";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "~/ui/components/common/Modal";
import IconButton from "~/ui/components/common/IconButton";
import Checkbox from "~/ui/components/common/Checkbox";
import QuantityInput from "~/ui/components/common/QuantityInput";
import { FREE_OBJECT_CONTRACT_ADDRESS, PREMIUM_OBJECT_CONTRACT_ADDRESS, QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";

type LandObject = DepositObject & { select: number; writed: boolean };

// todo
const priority: { [contract in ObjectContractAddress]: number } = {
  [QUEST_OBJECT_CONTRACT_ADDRESS]: 1,
  [FREE_OBJECT_CONTRACT_ADDRESS]: 1 * 1000,
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: 1000 * 1000,
};

const sort = (objects: LandObject[]): LandObject[] => {
  return [...objects].sort((a, b) => priority[a.contractAddress] * a.tokenId - priority[b.contractAddress] * b.tokenId);
};

export const useLand = (
  originObjects: DepositObject[],
  isEdit: boolean
): [
  LandObject[],
  (idx: number) => void,
  (idx: number) => void,
  Dispatch<SetStateAction<LandObject[]>>,
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
    setObjects((prev) => {
      const copied = [...prev];
      const idx = copied.findIndex((c) => c.contractAddress === contract && c.tokenId === tokenId);
      copied[idx].used += 1;
      if (copied[idx].amount - copied[idx].used > 0) {
        return copied;
      } else {
        return copied.filter((_, i) => i !== idx);
      }
    });
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
    setObjects(sort(copied));
  };
  const reset = () => {
    setObjects(sort(originObjects.map((object) => ({ ...object, select: 0, writed: false }))));
  };

  useEffect(() => {
    reset();
  }, [originObjects.length, isEdit]);

  return [objects, plus, minus, setObjects, tryWrite, tryRemove, reset];
};

const Land: FC<{
  objects: LandObject[];
  isEdit: boolean;
  isOpen: boolean;
  onOpenWallet: () => void;
  onClose: () => void;
  onClickPlus: (idx: number) => void;
  onClickMinus: (idx: number) => void;
  setObjects: Dispatch<SetStateAction<LandObject[]>>;
  onClickObject: (object: IObject) => void;
  onSubmit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>;
  reset: () => void;
}> = ({ objects, isEdit, isOpen, onOpenWallet, onClose, onClickPlus, onClickMinus, setObjects, onClickObject, onSubmit, reset }) => {
  const { colorMode } = useContext(AppContext);
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();
  const openNavi = useNavi();
  const checked = useMemo(() => {
    return objects.reduce((memo, object) => memo + object.amount - object.used - object.select, 0) === 0;
  }, [objects]);

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
      clickThrough={isEdit}
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
      {objects.length > 0 ? (
        <>
          {isEdit ? (
            <Box h="16px" />
          ) : (
            <HStack h="36px" m="16px 0 24px 0" align="center" spacing="8px">
              <Checkbox
                checked={checked}
                onCheck={() => {
                  setObjects((prev) =>
                    prev.reduce((memo, p) => {
                      return [...memo, { ...p, select: checked ? 0 : p.amount - p.used }];
                    }, [] as LandObject[])
                  );
                }}
              />
              <Text textStyle="label-1" color={colorMode === "light" ? "grey.900" : "grey.100"}>
                Select All
              </Text>
            </HStack>
          )}
        </>
      ) : (
        <Box h="16px" />
      )}
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
                  _hover={{
                    bgColor: colorMode === "light" ? "light.lg_orange40" : "dark.grey700",
                  }}
                  {...(isEdit && { cursor: "pointer" })}
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
              <Image src={`/assets/empty-land_${colorMode}.png`} width="360px" height="270px" alt="" />
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
