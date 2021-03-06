import Image from "next/image";
import { FC, useContext } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Divider, HStack, Text, useBoolean } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { Button, SelectBox, Icon } from "~/ui/components";
import IconButton from "./IconButton";
import { BalanceObject, Wallpaper } from "~/types";
import SelectWallpaper from "./SelectWallpaper";

const MenuBar: FC<{
  initialized: boolean;
  isEdit: boolean;
  isOpen: {
    quest: boolean;
    shop: boolean;
    collection: boolean;
    inventory: boolean;
  };
  currentENS: string;
  domains: string[];
  isApprovedWallpaper: boolean;
  currentWallpaper?: Wallpaper;
  balanceWallpapers: BalanceObject[];
  actionHandler: {
    onOpenQuest: () => void;
    onOpenShop: () => void;
    onOpenCollection: () => void;
    onOpenInventry: () => void;
    onSwitchCurrentENS: (ens: string) => void;
    onChangeWallpaper: (tokenId: number) => void;
    onView: () => void;
    onEdit: () => void;
    onSave: () => Promise<TransactionResponse | undefined>;
  };
}> = ({ initialized, isEdit, isOpen, currentENS, domains, isApprovedWallpaper, currentWallpaper, balanceWallpapers, actionHandler }) => {
  const { colorMode } = useContext(AppContext);
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();

  return (
    <HStack
      position="fixed"
      bottom="32px"
      left="50%"
      transform="translateX(-50%)"
      h="64px"
      pl="8px"
      pr="8px"
      boxShadow="-2px 4px 8px rgba(13, 13, 13, 0.1)"
      borderRadius="16px"
      //
      border={colorMode === "light" ? "1px solid" : "none"}
      borderColor={colorMode === "light" ? "#CECCC9" : "none"}
      bgColor={colorMode === "light" ? "white" : "#1A1A1A"}
    >
      <>
        {isEdit ? (
          <SelectWallpaper
            currentWallpaper={currentWallpaper}
            balanceWallpapers={balanceWallpapers}
            disabled={!isApprovedWallpaper}
            onChange={actionHandler.onChangeWallpaper}
          />
        ) : (
          <SelectBox
            w="136px"
            menuW="160px"
            options={domains.map((domain) => ({ label: domain, value: domain }))}
            selected={{ label: currentENS, value: currentENS }}
            handleChange={actionHandler.onSwitchCurrentENS}
          />
        )}
        <Divider orientation="vertical" color={colorMode === "light" ? "CECCC9" : "#333333"} h="48px" />
      </>

      <>
        {!isEdit ? (
          <>
            <IconButton
              ariaLabel="inventory"
              icon={<Image src="/icons/inventory.svg" width="48px" height="48px" />}
              outline={isOpen.inventory}
              boxShadow={false}
              onClick={actionHandler.onOpenInventry}
            />
            <IconButton
              ariaLabel="collection"
              icon={<Image src="/icons/diamond.svg" width="48px" height="48px" />}
              outline={isOpen.collection}
              boxShadow={false}
              onClick={actionHandler.onOpenCollection}
            />
            <IconButton
              ariaLabel="quest"
              icon={<Image src="/icons/sword.svg" width="48px" height="48px" />}
              outline={isOpen.quest}
              boxShadow={false}
              onClick={actionHandler.onOpenQuest}
            />
            <IconButton
              ariaLabel="shop"
              icon={<Image src="/icons/bag.svg" width="48px" height="48px" />}
              outline={isOpen.shop}
              boxShadow={false}
              onClick={actionHandler.onOpenShop}
            />
          </>
        ) : (
          <>
            <IconButton
              ariaLabel="undo"
              icon={<Icon name="undo" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
              onClick={() => {}}
            />
            <IconButton
              ariaLabel="redo"
              icon={<Icon name="redo" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
              onClick={() => {}}
            />
            <IconButton
              ariaLabel="inventory"
              icon={<Image src="/icons/inventory.svg" width="48px" height="48px" />}
              outline={isOpen.inventory}
              boxShadow={false}
              onClick={actionHandler.onOpenInventry}
            />
          </>
        )}
        <Divider orientation="vertical" color={colorMode === "light" ? "CECCC9" : "#333333"} h="48px" />
      </>

      <>
        {isEdit && (
          <>
            <Button w="104px" color="yellow" leftIcon={<Icon name="undo" />} onClick={actionHandler.onView}>
              <Text textStyle="button-2" color="#1A1A1A">
                CANCEL
              </Text>
            </Button>
            <Button
              w="88px"
              color="green"
              leftIcon={<Icon name="save" />}
              isLoading={isLoading}
              onClick={() => {
                startLoading();
                actionHandler
                  .onSave()
                  .then(async (res) => {
                    await res?.wait();
                    stopLoading();
                  })
                  .catch(stopLoading);
              }}
            >
              <Text textStyle="button-2" color="#1A1A1A">
                Save
              </Text>
            </Button>
          </>
        )}
        {!isEdit && (
          <Button w="88px" color="purple" leftIcon={<Icon name="edit" />} onClick={actionHandler.onEdit} disabled={!initialized}>
            <Text textStyle="button-2" color="#1A1A1A">
              EDIT
            </Text>
          </Button>
        )}
      </>
    </HStack>
  );
};

export default MenuBar;
