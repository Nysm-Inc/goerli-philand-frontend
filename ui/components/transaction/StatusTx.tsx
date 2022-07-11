import { FC, useContext, useEffect, useState } from "react";
import { Box, Center, Flex, HStack, Link, Text, useToast, UseToastOptions } from "@chakra-ui/react";
import { MUMBAI_BLOCK_EXPLORER } from "~/constants";
import { Tx } from "~/types/wagmi";
import { AppContext } from "~/contexts";
import { Icon, IconButton } from "~/ui/components";
import { ColorMode } from "~/ui/styles";

const StatusComponent: FC<{ colorMode: ColorMode; tx: Tx; onClose: () => void }> = ({ colorMode, tx, onClose }) => (
  <Box
    w="348px"
    minH="112px"
    h="auto"
    p="8px 8px 8px 0px"
    border="1px solid #1A1A1A"
    boxShadow="-2px 4px 8px rgba(13, 13, 13, 0.1)"
    borderRadius="16px"
    position="relative"
    bgColor={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}
  >
    <HStack spacing="0" p="16px" align="flex-start">
      <Center w="40px" h="40px" borderRadius="40px" bgColor="#70DBB8">
        <Icon name={status === "error" ? "alert" : "check"} />
      </Center>
      <Box w="16px" />

      <Flex direction="column" w="220px" h="100%">
        <Text color="#808080" textStyle="label-1">
          ACTION LABEL
        </Text>
        <Text color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"} textStyle="paragraph-1">
          {tx.msg
            ? tx.msg
            : {
                idle: "TRANSACTION SUBMITTED",
                loading: "TRANSACTION SUBMITTED",
                success: "TRANSACTION SUCCESS",
                error: "TRANSACTION FAILED",
              }[tx.status]}
        </Text>
        <Link textStyle="button-2" color="#8080FF" href={`${MUMBAI_BLOCK_EXPLORER}/tx/${tx.hash}`} isExternal>
          View on explorer
        </Link>
      </Flex>
    </HStack>
    <Box position="absolute" top="8px" right="8px">
      <IconButton
        ariaLabel="close"
        icon={<Icon name="close" color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"} />}
        size={32}
        flipColor
        onClick={onClose}
      />
    </Box>
  </Box>
);

const options = (colorMode: ColorMode, tx: Tx): UseToastOptions => {
  return {
    id: tx.hash,
    position: "top-right",
    duration: null,
    isClosable: true,
    render: (props) => <StatusComponent colorMode={colorMode} tx={tx} onClose={() => props.onClose()} />,
  };
};

const StatusTx: FC<{ txs: Tx[] }> = ({ txs }) => {
  const { colorMode } = useContext(AppContext);
  const toast = useToast();
  const [unique, setUnique] = useState<string[]>([]);

  useEffect(() => {
    txs.forEach((tx) => {
      if (!tx.hash) return;

      if (!toast.isActive(tx.hash)) {
        if (!unique.includes(tx.hash) && tx.status === "loading") {
          toast(options(colorMode, tx));
          setUnique((prev) => [...prev, tx.hash || ""]);
        }
      } else {
        toast.update(tx.hash, options(colorMode, tx));

        if (tx.status === "success") {
          setTimeout(() => {
            // @ts-ignore
            toast.close(tx.hash);
          }, 3000);
        }
      }
    });
  }, [txs]);

  return <></>;
};

export default StatusTx;
