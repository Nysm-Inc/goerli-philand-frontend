import { FC, useEffect } from "react";
import { chain, useAccount, useConnect, useDisconnect } from "wagmi";
import { Box, Flex, Text, useTheme } from "@chakra-ui/react";
import metamaskConnector from "~/connectors/metamask";

const Wallet: FC = () => {
  const theme = useTheme();
  const { data: account } = useAccount();
  const { connect } = useConnect({ connector: metamaskConnector });
  // const { disconnect } = useDisconnect();

  useEffect(() => {
    connect({ chainId: chain.goerli.id });
  }, []);

  return (
    <>
      {!account?.address ? (
        <Flex
          w="144px"
          h="40px"
          justify="space-around"
          align="center"
          border={`1px solid ${theme.colors.surface.high}`}
          boxShadow={`2px 2px 0 ${theme.colors.surface.medium}`} // todo
          cursor="pointer"
          onClick={() => {
            try {
              connect({ chainId: chain.goerli.id });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Box w="16px" h="16px" border="1px solid" borderRadius="full" />
          <Text>Connect Wallet</Text>
        </Flex>
      ) : (
        <Flex
          w="144px"
          h="40px"
          justify="space-around"
          align="center"
          border={`1px solid ${theme.colors.surface.high}`}
          onClick={() => {
            try {
              // disconnect();
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Text>{`${account.address.substring(0, 4)}...${account.address.substring(account.address.length - 4)}`}</Text>
          <Box w="24px" h="24px" bgColor="#c4c4c4" borderRadius="full" />
        </Flex>
      )}
    </>
  );
};

export default Wallet;
