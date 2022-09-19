import Image from "next/image";
import { Dispatch, FC, SetStateAction, useContext, useMemo } from "react";
import { useProvider } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { Box, Center, HStack, SimpleGrid, Text, useBoolean, VStack } from "@chakra-ui/react";
import { objectMetadataList } from "~/types/object";
import { BalanceObject, IObject } from "~/types";
import { AppContext } from "~/contexts";
import Icon from "~/ui/components/Icon";
import useNavi from "~/ui/components/NaviNotification";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "~/ui/components/common/Modal";
import IconButton from "~/ui/components/common/IconButton";
import Checkbox from "~/ui/components/common/Checkbox";
import QuantityInput from "~/ui/components/common/QuantityInput";
import { event } from "~/utils/ga/ga";
import { LandObject } from "./types";

const Land: FC<{
  objects: LandObject[];
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
  onClickPlus: (idx: number) => void;
  onClickMinus: (idx: number) => void;
  setObjects: Dispatch<SetStateAction<LandObject[]>>;
  onClickObject: (object: IObject) => void;
  onSubmit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>;
  reset: () => void;
  onClickNavi: () => void;
  onRefetch: () => void;
}> = ({
  objects,
  isEdit,
  isOpen,
  onClose,
  onClickPlus,
  onClickMinus,
  setObjects,
  onClickObject,
  onSubmit,
  reset,
  onClickNavi,
  onRefetch,
}) => {
  const { colorMode } = useContext(AppContext);
  const provider = useProvider();
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
                    <Box position="absolute" bottom="0" right="0">
                      <HStack
                        w="50px"
                        h="24px"
                        spacing="4px"
                        p="4px"
                        borderRadius="4px"
                        bgColor={colorMode === "light" ? "grey.100" : "dark.grey700"}
                      >
                        <Icon name="expand" color={colorMode === "light" ? "dark.grey600" : "grey.200"} />
                        <Text textStyle="label-2" color={colorMode === "light" ? "dark.grey600" : "grey.200"}>
                          {`${objectMetadataList[object.contractAddress][object.tokenId].size[0]}x${
                            objectMetadataList[object.contractAddress][object.tokenId].size[1]
                          }`}
                        </Text>
                      </HStack>
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
                      defaultText="Withdraw"
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
                  if (!res?.hash) throw new Error("invalid hash");
                  event({ action: "conversion_withdraw" });

                  reset();
                  await provider.waitForTransaction(res.hash);
                  onRefetch();
                  stopLoading();
                  openNavi("You can now find your objects in your wallet.", "Open Wallet", onClickNavi);
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
