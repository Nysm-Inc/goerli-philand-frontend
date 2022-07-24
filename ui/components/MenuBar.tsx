import Image from "next/image";
import { FC, useContext } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Divider, HStack, Text, useBoolean } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { Button, SelectBox, Icon } from "~/ui/components";
import { BalanceObject, Wallpaper } from "~/types";
import { event } from "~/utils/ga/ga";
import IconButton from "./IconButton";
import SelectWallpaper from "./SelectWallpaper";

const MenuBar: FC<{
  initialized: boolean;
  isEdit: boolean;
  isOpen: {
    collection: boolean;
    inventory: boolean;
  };
  currentENS: string;
  domains: string[];
  isApprovedWallpaper: boolean;
  currentWallpaper?: Wallpaper;
  balanceWallpapers: BalanceObject[];
  actionHandler: {
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
      borderColor={colorMode === "light" ? "light.g_orange" : "none"}
      bgColor={colorMode === "light" ? "white" : "grey.900"}
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
        <Divider orientation="vertical" color={colorMode === "light" ? "light.g_orange" : "dark.grey700"} h="48px" />
      </>

      <>
        {!isEdit ? (
          <>
            <IconButton
              ariaLabel="inventory"
              icon={<Image src="/icons/inventory.svg" width="48px" height="48px" />}
              outline={isOpen.inventory}
              boxShadow={false}
              onClick={() => {
                actionHandler.onOpenInventry();
                event({ action: "click", category: "menubar", label: "inventory" });
              }}
            />
            <IconButton
              ariaLabel="collection"
              icon={<Image src="/icons/diamond.svg" width="48px" height="48px" />}
              outline={isOpen.collection}
              boxShadow={false}
              onClick={() => {
                actionHandler.onOpenCollection();
                event({ action: "click", category: "menubar", label: "collection" });
              }}
            />
          </>
        ) : (
          <>
            {/* <IconButton
              ariaLabel="undo"
              icon={<Icon name="undo" color={colorMode === "light" ? "grey.900" : "white"} />}
              onClick={() => {}}
            />
            <IconButton
              ariaLabel="redo"
              icon={<Icon name="redo" color={colorMode === "light" ? "grey.900" : "white"} />}
              onClick={() => {}}
            /> */}
            <IconButton
              ariaLabel="inventory"
              icon={<Image src="/icons/inventory.svg" width="48px" height="48px" />}
              outline={isOpen.inventory}
              boxShadow={false}
              onClick={() => {
                actionHandler.onOpenInventry();
                event({ action: "click", category: "menubar", label: "inventory" });
              }}
            />
          </>
        )}
        <Divider orientation="vertical" color={colorMode === "light" ? "light.g_orange" : "dark.grey700"} h="48px" />
      </>

      <>
        {isEdit && (
          <>
            <Button
              w="104px"
              color="yellow"
              leftIcon={<Icon name="undo" />}
              onClick={() => {
                actionHandler.onView();
                event({ action: "click", category: "menubar", label: "cancel" });
              }}
            >
              <Text textStyle="button-2" color="grey.900">
                CANCEL
              </Text>
            </Button>
            <Button
              w="88px"
              color="green"
              leftIcon={<Icon name="save" />}
              isLoading={isLoading}
              onClick={() => {
                event({ action: "click", category: "menubar", label: "save" });
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
              <Text textStyle="button-2" color="grey.900">
                Save
              </Text>
            </Button>
          </>
        )}
        {!isEdit && (
          <Button
            w="88px"
            color="purple"
            leftIcon={<Icon name="edit" />}
            disabled={!initialized}
            onClick={() => {
              actionHandler.onEdit();
              event({ action: "click", category: "menubar", label: "edit" });
            }}
          >
            <Text textStyle="button-2" color="grey.900">
              EDIT
            </Text>
          </Button>
        )}
      </>
    </HStack>
  );
};

export default MenuBar;
