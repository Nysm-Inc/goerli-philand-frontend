import { FC, useEffect } from "react";
import { Box, Flex, Text, useTheme } from "@chakra-ui/react";
import metaMask, { useAccount, useChainId } from "~/connectors/metamask";

const Wallet: FC = () => {
  const theme = useTheme();
  const account = useAccount();
  const chainID = useChainId();

  useEffect(() => {
    metaMask.activate(5);
  }, [chainID]);

  return (
    <>
      {!account ? (
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
              metaMask.activate(5);
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
        >
          <Text>{`${account.substring(0, 4)}...${account.substring(account.length - 4)}`}</Text>
          <Box w="24px" h="24px" bgColor="#c4c4c4" borderRadius="full" />
        </Flex>
      )}
    </>
  );
};

export default Wallet;
