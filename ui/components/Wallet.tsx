import Image from "next/image";
import { FC, useContext } from "react";
import { useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Avatar, Box, Menu, MenuButton, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Button from "./Button";
import MenuList from "./MenuList";
import Icon from "./Icon";
import { event } from "~/utils/ga/ga";

const showAddress = (address: string) => `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;

const Wallet: FC<{ onOpenPermissions?: () => void }> = ({ onOpenPermissions }) => {
  const { colorMode } = useContext(AppContext);
  const { disconnect } = useDisconnect();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        return (
          <Box
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button
                    w="153px"
                    color="purple"
                    onClick={() => {
                      openConnectModal();
                      event({ action: "click", category: "wallet", label: "connect" });
                    }}
                    rightIcon={<Image src="/icons/wallet.svg" width="24px" height="24px" />}
                  >
                    <Text color="white" textStyle="button-1">
                      Connect
                    </Text>
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button w="218px" color="red" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }

              return (
                <Menu matchWidth variant="unstyled" autoSelect={false}>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        as={Button}
                        w="218px"
                        leftIcon={
                          <Avatar
                            w="32px"
                            h="32px"
                            bgColor={colorMode === "light" ? "purple.150" : "red.150"}
                            src={account.ensAvatar}
                            icon={
                              <Box position="absolute" top="4px">
                                <Image width="28px" height="28px" src="/icons/dotty.svg" />
                              </Box>
                            }
                          />
                        }
                        rightIcon={<Icon name="menu" color={colorMode === "light" ? "grey.900" : "white"} />}
                      >
                        <Text textAlign="left" textStyle="button-2" pl="4px" color={colorMode === "light" ? "grey.900" : "white"}>
                          {showAddress(account.address)}
                        </Text>
                      </MenuButton>
                      <MenuList
                        w="218px"
                        isOpen={isOpen}
                        options={[
                          { label: showAddress(account.address), value: account.address },
                          { label: "Permission settings", value: "Permission settings", onClick: onOpenPermissions },
                          { label: "disconnect", value: "disconnect", onClick: disconnect },
                        ]}
                      />
                    </>
                  )}
                </Menu>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default Wallet;
