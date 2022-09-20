import Image from "next/image";
import { FC, useContext, useState } from "react";
import { Box, Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { objectTraits } from "~/types/object";
import { ShopItemContractAddress } from "~/types";
import Icon from "~/ui/components/Icon";
import NewBadge from "~/ui/components/NewBadge";
import Size from "~/ui/components/Size";
import QuantityInput from "~/ui/components/common/QuantityInput";
import { Item, newShopIds } from "./types";

const ShopItem: FC<{
  contract: ShopItemContractAddress;
  item: Item;
  plus: () => void;
  minus: () => void;
}> = ({ contract, item, plus, minus }) => {
  const { colorMode } = useContext(AppContext);
  const [selected, setSelected] = useState(false);

  return (
    <>
      {selected ? (
        <VStack
          position="relative"
          height="322px"
          p="32px 16px 16px"
          spacing="8px"
          borderRadius="16px"
          align="flex-start"
          bgColor={colorMode === "light" ? "light.lg_orange40" : "dark.grey700"}
        >
          <Box w="100%">
            <Box position="absolute" top="16px" right="16px" cursor="pointer" onClick={() => setSelected((prev) => !prev)}>
              <Icon name="infoActive" color={colorMode === "light" ? "grey.900" : "white"} />
            </Box>
          </Box>
          <Text textStyle="headline-2" color={colorMode === "light" ? "grey.900" : "white"}>
            {item.name}
          </Text>
          <Text textStyle="paragraph-2" color={colorMode === "light" ? "grey.500" : "grey.200"}>
            {objectTraits[contract][item.tokenId].description}
          </Text>
        </VStack>
      ) : (
        <VStack
          position="relative"
          height="322px"
          p="32px 16px 16px"
          spacing="4px"
          borderRadius="16px"
          bgColor={colorMode === "light" ? "white" : "grey.900"}
          _hover={{
            bgColor: colorMode === "light" ? "light.lg_orange40" : "dark.grey700",
          }}
        >
          {newShopIds.find((id) => id.contract === contract && id.tokenId === item.tokenId) && (
            <Box position="absolute" top="16px" left="16px">
              <NewBadge />
            </Box>
          )}
          <Box position="absolute" top="16px" right="16px" cursor="pointer" onClick={() => setSelected((prev) => !prev)}>
            <Icon name="info" color={colorMode === "light" ? "grey.900" : "white"} />
          </Box>
          <Center position="relative" w="100%" h="144px" minH="144px">
            <Box position="relative" w="96px" h="96px">
              <Image src={item.image_url} layout="fill" objectFit="contain" draggable={false} alt="" />
            </Box>
            <Box position="absolute" bottom="0" right="0">
              <Size sizeX={item.size[0]} sizeY={item.size[1]} />
            </Box>
          </Center>

          <VStack spacing="16px">
            <VStack spacing="6px">
              <Flex h="48px" flexDirection="column" justify="flex-end">
                <Text textStyle="headline-2" textAlign="center" color={colorMode === "light" ? "grey.900" : "white"}>
                  {item.name}
                </Text>
              </Flex>
              <HStack>
                <Image src="/icons/polygon_logo.svg" width="16px" height="16px" alt="" />
                <Text textStyle="label-1" color={colorMode === "light" ? "grey.900" : "white"}>
                  {item.price + " MATIC"}
                </Text>
              </HStack>
            </VStack>

            <QuantityInput
              w="156px"
              defaultText="Add to Cart"
              num={item.select}
              balance={contract === WALLPAPER_CONTRACT_ADDRESS ? 1 : 64}
              handleClickMinus={minus}
              handleClickPlus={plus}
            />
          </VStack>
        </VStack>
      )}
    </>
  );
};

export default ShopItem;
