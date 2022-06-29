import Image from "next/image";
import { FC, useContext } from "react";
import { Box, Divider, HStack } from "@chakra-ui/react";
import { FRONTEND_URL } from "~/constants";
import { AppContext } from "~/contexts";
import { Button, SelectBox } from "~/ui/components";
import IconButton from "./IconButton";

const MenuBar: FC<{
  isEdit: boolean;
  isOpen: {
    quest: boolean;
    shop: boolean;
    collection: boolean;
    inventory: boolean;
  };
  account?: string;
  currentENS: string;
  domains: string[];
  actionHandler: {
    onOpenQuest: () => void;
    onOpenShop: () => void;
    onOpenCollection: () => void;
    onOpenInventry: () => void;
    switchCurrentENS: (ens: string) => void;
    onView: () => void;
    onEdit: () => void;
    onSave: () => void;
  };
}> = ({ isEdit, isOpen, account, currentENS, domains, actionHandler }) => {
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
        {!isEdit && (
          <>
            <SelectBox
              w="136px"
              options={domains.map((domain) => {
                return { label: domain, value: domain };
              })}
              value={currentENS}
              handleChange={actionHandler.switchCurrentENS}
            />
            <Divider orientation="vertical" color={colorMode === "light" ? "CECCC9" : "#333333"} h="48px" />
          </>
        )}
      </>

      <>
        {!isEdit ? (
          <>
            <IconButton
              ariaLabel="quest"
              icon={<Image src="/icons/sword.svg" width="48px" height="48px" />}
              outline={isOpen.quest}
              boxShadow={false}
              onClick={actionHandler.onOpenQuest}
            />
            <IconButton
              ariaLabel="shop"
              icon={<Image src="/icons/diamond.svg" width="48px" height="48px" />}
              outline={isOpen.shop}
              boxShadow={false}
              onClick={actionHandler.onOpenShop}
            />
            <IconButton
              ariaLabel="collection"
              icon={<Image src="/icons/collection.svg" width="48px" height="48px" />}
              outline={isOpen.collection}
              boxShadow={false}
              onClick={actionHandler.onOpenCollection}
            />
            <IconButton
              ariaLabel="inventory"
              icon={<Image src="/icons/bag.svg" width="48px" height="48px" />}
              outline={isOpen.inventory}
              boxShadow={false}
              onClick={actionHandler.onOpenInventry}
            />
          </>
        ) : (
          <>
            <IconButton ariaLabel="undo" icon={<Image src="/icons/undo.svg" width="16px" height="16px" />} onClick={() => {}} />
            <IconButton ariaLabel="redo" icon={<Image src="/icons/redo.svg" width="16px" height="16px" />} onClick={() => {}} />
            <IconButton
              ariaLabel="inventory"
              icon={<Image src="/icons/bag.svg" width="48px" height="48px" />}
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
            icon={<Image src="/icons/share.svg" width="16px" height="16px" />}
            onClick={() => {
              window.open(`https://twitter.com/intent/tweet?text=Come visit my philand @phi_xyz%0a${FRONTEND_URL}/${currentENS}`, "_blank");
            }}
          />
        )}
        {isEdit && (
          <>
            <Button
              w="104px"
              color="yellow"
              leftIcon={<Image src="/icons/undo.svg" width="16px" height="16px" />}
              onClick={actionHandler.onView}
            >
              CANCEL
            </Button>
            <Button
              w="88px"
              color="green"
              leftIcon={<Image src="/icons/save.svg" width="16px" height="16px" />}
              onClick={actionHandler.onSave}
            >
              Save
            </Button>
          </>
        )}
        {!isEdit && (
          <Button
            w="88px"
            color="purple"
            leftIcon={<Image src="/icons/edit.svg" width="16px" height="16px" />}
            onClick={actionHandler.onEdit}
          >
            EDIT
          </Button>
        )}
      </>
    </HStack>
  );
};

export default MenuBar;
