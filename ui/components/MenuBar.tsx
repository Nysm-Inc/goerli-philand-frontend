import Image from "next/image";
import { FC, useContext } from "react";
import type { TransactionResponse } from "@ethersproject/providers";
import { Divider, HStack, Text, Tooltip as ChakraTooltip, useBoolean, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { event } from "~/utils/ga/ga";
import Icon from "~/ui/components/Icon";
import IconButton from "./common/IconButton";
import SelectBox from "./common/SelectBox";
import Button from "./common/Button";
import Tooltip from "./common/Tooltip";
import { useProvider } from "wagmi";

const MenuBar: FC<{
  initialized: boolean;
  isDiff: boolean;
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
    onCloseLand: () => void;
    onSwitchCurrentENS: (ens: string) => void;
    onView: () => void;
    onEdit: () => void;
    onSave: () => Promise<TransactionResponse | undefined>;
  };
}> = ({ initialized, isDiff, noObjectsInLand, isEdit, isOpen, currentENS, domains, actionHandler }) => {
  const { colorMode } = useContext(AppContext);
  const provider = useProvider();
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
      border="1px solid"
      borderColor={colorMode === "light" ? "light.g_orange" : "dark.grey800"}
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
              icon={<Image src="/icons/wallet.svg" width="32px" height="32px" alt="" />}
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
              icon={<Image src="/icons/land.svg" width="32px" height="32px" alt="" />}
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
                if (isDiff && !confirm("Do you really want to leave?")) return;

                actionHandler.onView();
                actionHandler.onCloseLand();
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
              icon={<Image src="/icons/land.svg" width="32px" height="32px" alt="" />}
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
              disabled={!isDiff}
              onClick={() => {
                event({ action: "click", category: "menubar", label: "save" });
                startLoading();
                actionHandler
                  .onSave()
                  .then(async (res) => {
                    if (!res?.hash) throw new Error("invalid hash");
                    await provider.waitForTransaction(res?.hash);
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
          <ChakraTooltip
            variant="unstyled"
            shouldWrapChildren
            isDisabled={!(!initialized || noObjectsInLand)}
            label={
              <Tooltip borderRadius="8px">
                <VStack w="256px" p="12px" spacing="8px">
                  <Text textStyle="paragraph-3" color={colorMode === "light" ? "white" : "grey.900"}>
                    Deposit objects to Land in order to edit your land.
                  </Text>
                </VStack>
              </Tooltip>
            }
          >
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
          </ChakraTooltip>
        )}
      </>
    </HStack>
  );
};

export default MenuBar;
