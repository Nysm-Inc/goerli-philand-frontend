import { HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useContext } from "react";
import { AppContext } from "~/contexts";
import { event } from "~/utils/ga/ga";
import IconButton from "./common/IconButton";

const MainMenu: FC<{ isOpenQuest: boolean; isOpenShop: boolean; onOpenQuest: () => void; onOpenShop: () => void }> = ({
  isOpenQuest,
  isOpenShop,
  onOpenQuest,
  onOpenShop,
}) => {
  const { colorMode } = useContext(AppContext);

  return (
    <HStack zIndex="default" position="fixed" left="32px" bottom="30px" spacing="20px">
      <IconButton
        ariaLabel="quest"
        size="76px"
        borderRadius="20px"
        icon={
          <VStack p="8px 0" spacing="4px">
            <Image priority src="/icons/sword.svg" width="40px" height="40px" alt="" />
            <Text textStyle="label-2" color={colorMode === "light" ? "grey.900" : "white"}>
              Quest
            </Text>
          </VStack>
        }
        isActive={isOpenQuest}
        onClick={() => {
          onOpenQuest();
          event({ action: "click", category: "menubar", label: "quest" });
        }}
      />
      <IconButton
        ariaLabel="shop"
        size="76px"
        borderRadius="20px"
        icon={
          <VStack p="8px 0" spacing="4px">
            <Image priority src="/icons/bag.svg" width="40px" height="40px" alt="" />
            <Text textStyle="label-2" color={colorMode === "light" ? "grey.900" : "white"}>
              Shop
            </Text>
          </VStack>
        }
        isActive={isOpenShop}
        onClick={() => {
          onOpenShop();
          event({ action: "click", category: "menubar", label: "shop" });
        }}
      />
    </HStack>
  );
};

export default MainMenu;
