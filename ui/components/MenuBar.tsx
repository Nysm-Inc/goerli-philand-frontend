import Image from "next/image";
import { FC, useContext } from "react";
import { Divider, HStack } from "@chakra-ui/react";
import { FRONTEND_URL } from "~/constants";
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
  currentWallpaper?: Wallpaper;
  wallpapers: BalanceObject[];
  actionHandler: {
    onOpenQuest: () => void;
    onOpenShop: () => void;
    onOpenCollection: () => void;
    onOpenInventry: () => void;
    onSwitchCurrentENS: (ens: string) => void;
    onChangeWallpaper: (tokenId: number) => void;
    onView: () => void;
    onEdit: () => void;
    onSave: () => void;
    onWithdrawWallpaper: () => Promise<any>;
  };
}> = ({ initialized, isEdit, isOpen, currentENS, domains, currentWallpaper, wallpapers, actionHandler }) => {
  const { colorMode } = useContext(AppContext);

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
            wallpapers={wallpapers}
            onChange={actionHandler.onChangeWallpaper}
            onWithdraw={actionHandler.onWithdrawWallpaper}
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
        {!isEdit && (
          <IconButton
            ariaLabel="share"
            icon={<Icon name="share" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
            onClick={() => {
              window.open(`https://twitter.com/intent/tweet?text=Come visit my philand @phi_xyz%0a${FRONTEND_URL}/${currentENS}`, "_blank");
            }}
          />
        )}
        {isEdit && (
          <>
            <Button w="104px" color="yellow" leftIcon={<Icon name="undo" />} onClick={actionHandler.onView}>
              CANCEL
            </Button>
            <Button w="88px" color="green" leftIcon={<Icon name="save" />} onClick={actionHandler.onSave}>
              Save
            </Button>
          </>
        )}
        {!isEdit && (
          <Button w="88px" color="purple" leftIcon={<Icon name="edit" />} onClick={actionHandler.onEdit} disabled={!initialized}>
            EDIT
          </Button>
        )}
      </>
    </HStack>
  );
};

export default MenuBar;
