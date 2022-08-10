import Image from "next/image";
import { FC, useContext } from "react";
import type { TransactionResponse } from "@ethersproject/providers";
import { Divider, HStack, Text, useBoolean } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { event } from "~/utils/ga/ga";
import Icon from "~/ui/components/Icon";
import IconButton from "./common/IconButton";
import SelectBox from "./common/SelectBox";
import Button from "./common/Button";

const MenuBar: FC<{
  initialized: boolean;
  noObjectsInLand: boolean;
  isEdit: boolean;
  isOpen: {
    wallet: boolean;
    land: boolean;
  };
  currentENS: string;
  domains: string[];
  actionHandler: {
    onOpenWallet: () => void;
    onOpenLand: () => void;
    onSwitchCurrentENS: (ens: string) => void;
    onView: () => void;
    onEdit: () => void;
    onCheckDiff: () => boolean;
    onSave: () => Promise<TransactionResponse | undefined>;
  };
}> = ({ initialized, noObjectsInLand, isEdit, isOpen, currentENS, domains, actionHandler }) => {
  const { colorMode } = useContext(AppContext);
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();

  return (
    <HStack
      zIndex="default"
      position="fixed"
      bottom="32px"
      left="50%"
      transform="translateX(-50%)"
      h="64px"
      pl="8px"
      pr="8px"
      boxShadow="md"
      borderRadius="20px"
      spacing="16px"
      //
      border={colorMode === "light" ? "1px solid" : "none"}
      borderColor={colorMode === "light" ? "light.g_orange" : "none"}
      bgColor={colorMode === "light" ? "white" : "grey.900"}
    >
      <>
        {!isEdit && (
          <>
            <SelectBox
              w="136px"
              menuW="160px"
              options={domains.map((domain) => ({ label: domain, value: domain }))}
              selected={{ label: currentENS, value: currentENS }}
              handleChange={actionHandler.onSwitchCurrentENS}
            />
            <Divider orientation="vertical" color={colorMode === "light" ? "light.g_orange" : "dark.grey700"} h="48px" />
          </>
        )}
      </>

      <>
        {!isEdit ? (
          <HStack spacing="0">
            <IconButton
              ariaLabel="wallet"
              icon={<Image src="/icons/wallet.svg" width="32px" height="32px" />}
              outline={isOpen.wallet}
              isActive={isOpen.wallet}
              boxShadow={false}
              onClick={() => {
                actionHandler.onOpenWallet();
                event({ action: "click", category: "menubar", label: "wallet" });
              }}
            />
            {noObjectsInLand ? (
              <Icon name="arrow" color={colorMode === "light" ? "grey.900" : "white"} />
            ) : (
              <Icon name="arrowTwoWay" color={colorMode === "light" ? "grey.900" : "white"} />
            )}
            <IconButton
              ariaLabel="land"
              icon={<Image src="/icons/land.svg" width="32px" height="32px" />}
              outline={isOpen.land}
              isActive={isOpen.land}
              boxShadow={false}
              onClick={() => {
                actionHandler.onOpenLand();
                event({ action: "click", category: "menubar", label: "land" });
              }}
            />
          </HStack>
        ) : (
          <>
            <Button
              w="88px"
              color="yellow"
              leftIcon={<Icon name="undo" />}
              onClick={() => {
                if (actionHandler.onCheckDiff() && !confirm("Do you really want to leave?")) return;

                actionHandler.onView();
                event({ action: "click", category: "menubar", label: "cancel" });
              }}
            >
              <Text textStyle="button-2" color="grey.900">
                BACK
              </Text>
            </Button>
            <Divider orientation="vertical" color={colorMode === "light" ? "light.g_orange" : "dark.grey700"} h="48px" />
            <IconButton
              ariaLabel="land"
              icon={<Image src="/icons/land.svg" width="32px" height="32px" />}
              outline={isOpen.land}
              isActive={isOpen.land}
              boxShadow={false}
              onClick={() => {
                actionHandler.onOpenLand();
                event({ action: "click", category: "menubar", label: "land" });
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
            disabled={!initialized || noObjectsInLand}
            onClick={() => {
              actionHandler.onEdit();
              actionHandler.onOpenLand();
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
