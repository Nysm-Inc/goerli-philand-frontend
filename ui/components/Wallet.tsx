import Image from "next/image";
import { FC } from "react";
import { useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Avatar, Box, Menu, MenuButton, Text } from "@chakra-ui/react";
import Button from "./Button";
import MenuList from "./MenuList";
import Icon from "./Icon";

const showAddress = (address: string) => `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;

const Wallet: FC = () => {
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
                    onClick={openConnectModal}
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
                        leftIcon={<Avatar w="32px" h="32px" src={account.ensAvatar || "/icons/sample_avatar.svg"} />}
                        rightIcon={<Icon name="menu" />}
                      >
                        <Text textAlign="left" textStyle="button-2" pl="4px">
                          {account.displayName}
                        </Text>
                      </MenuButton>
                      <MenuList
                        w="218px"
                        isOpen={isOpen}
                        options={[
                          { label: showAddress(account.address), value: account.address },
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
