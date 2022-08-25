import Image from "next/image";
import { FC, useContext } from "react";
import { useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Avatar, Box, Menu, MenuButton, Text, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import useEXP from "~/hooks/leader/exp";
import { event } from "~/utils/ga/ga";
import Button from "./common/Button";
import MenuList from "./common/MenuList";
import Icon from "./Icon";
import "@rainbow-me/rainbowkit/styles.css";

const showAddress = (address: string) => `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;

const ConnectedButton: FC<{ address: string; ensAvatar?: string }> = ({ address, ensAvatar }) => {
  const { colorMode } = useContext(AppContext);
  const { disconnect } = useDisconnect();
  const exp = useEXP(address);

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
            src={ensAvatar}
            icon={
              <Box position="absolute" top="4px">
                <Image width="28px" height="28px" src="/icons/dotty.svg" alt="" />
              </Box>
            }
          />
        }
        rightIcon={<Icon name="menu" color={colorMode === "light" ? "grey.900" : "white"} />}
      >
        <VStack spacing="0" align="flex-start">
          <Text pl="4px" textStyle="button-2" textAlign="left" color={colorMode === "light" ? "grey.900" : "white"}>
            {showAddress(address)}
          </Text>
          <Text pl="4px" textStyle="label-2" color="grey.500" textAlign="left">
            EXP {exp.toLocaleString()}
          </Text>
        </VStack>
      </MenuButton>
      <MenuList
        w="218px"
        options={[
          { label: showAddress(address), value: address },
          { label: "disconnect", value: "disconnect", onClick: disconnect, textColor: "danger.default" },
        ]}
      />
    </Menu>
  );
};

const Wallet: FC = () => (
  <ConnectButton.Custom>
    {({ account, chain, openConnectModal, mounted }) => {
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
                    event({ action: "conversion_connect_wallet" });
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
                <Button w="154px" color="red" shadow leftIcon={<Icon name="info" color="grey.900" />}>
                  <Text ml="8px" color="grey.900" textStyle="button-2">
                    Wrong Network
                  </Text>
                </Button>
              );
            }

            return <ConnectedButton address={account.address} ensAvatar={account.ensAvatar} />;
          })()}
        </Box>
      );
    }}
  </ConnectButton.Custom>
);

export default Wallet;
