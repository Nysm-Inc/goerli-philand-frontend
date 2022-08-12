import Image from "next/image";
import { FC, useContext } from "react";
import { useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Avatar, Box, Menu, MenuButton, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { event } from "~/utils/ga/ga";
import Button from "./common/Button";
import MenuList from "./common/MenuList";
import Icon from "./Icon";
import "@rainbow-me/rainbowkit/styles.css";

const showAddress = (address: string) => `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;

const Wallet: FC = () => {
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
                    shadow
                    onClick={() => {
                      openConnectModal();
                      event({ action: "click", category: "wallet", label: "connect" });
                    }}
                    rightIcon={<Image src="/icons/wallet.svg" width="24px" height="24px" alt="" />}
                  >
                    <Text color="white" textStyle="button-1">
                      Connect
                    </Text>
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button w="154px" color="red" shadow leftIcon={<Icon name="info" color="grey.900" />} onClick={openChainModal}>
                    <Text ml="8px" color="grey.900" textStyle="button-2">
                      Wrong Network
                    </Text>
                  </Button>
                );
              }

              return (
                <Menu matchWidth variant="unstyled" autoSelect={false}>
                  <MenuButton
                    as={Button}
                    w="218px"
                    // @ts-ignore
                    shadow
                    leftIcon={
                      <Avatar
                        w="32px"
                        h="32px"
                        bgColor={colorMode === "light" ? "purple.150" : "red.150"}
                        src={account.ensAvatar}
                        icon={
                          <Box position="absolute" top="4px">
                            <Image width="28px" height="28px" src="/icons/dotty.svg" alt="" />
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
                    options={[
                      { label: showAddress(account.address), value: account.address },
                      { label: "disconnect", value: "disconnect", onClick: disconnect, textColor: "danger.default" },
                    ]}
                  />
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
