import { FC, useContext, useEffect, useState } from "react";
import { Box, Center, HStack, Link, Text, useToast, UseToastOptions, VStack } from "@chakra-ui/react";
import { MUMBAI_BLOCK_EXPLORER } from "~/constants";
import { Status as TxStatus, Tx } from "~/types/tx";
import { AppContext } from "~/contexts";
import { Icon, IconName, IconButton } from "~/ui/components";
import { ColorMode } from "~/ui/styles";
import { information } from "~/ui/styles/color";

type Status = "submitted" | "pending" | "success" | "failed";

const getStatus = (status: TxStatus): Status => {
  switch (status) {
    case "idle": {
      return "pending";
    }
    case "loading": {
      return "submitted";
    }
    case "success": {
      return "success";
    }
    case "error": {
      return "failed";
    }
  }
};

const getIconName = (label: Status): IconName => {
  switch (label) {
    case "submitted": {
      return "info";
    }
    case "pending": {
      return "timer";
    }
    case "success": {
      return "check";
    }
    case "failed": {
      return "alert";
    }
  }
};

const getColor = (label: Status): string => {
  switch (label) {
    case "submitted": {
      return information.info.default;
    }
    case "pending": {
      return information.warning.default;
    }
    case "success": {
      return information.success.default;
    }
    case "failed": {
      return information.danger.default;
    }
  }
};

const StatusComponent: FC<{ colorMode: ColorMode; tx: Tx; onClose: () => void }> = ({ colorMode, tx, onClose }) => {
  const [status, setStatus] = useState<Status>(getStatus(tx.status));

  useEffect(() => {
    setTimeout(() => setStatus("pending"), 3000);
  }, []);

  useEffect(() => {
    setStatus(getStatus(tx.status));
  }, [tx.status]);

  return (
    <Box
      position="relative"
      w="348px"
      minH="100px"
      h="auto"
      border="1px solid grey.900"
      boxShadow="0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);"
      borderRadius="16px"
      bgColor={colorMode === "light" ? "grey.900" : "white"}
    >
      <HStack spacing="0" p="16px" align="flex-start">
        <Center w="40px" h="40px" borderRadius="40px" bgColor={getColor(status)}>
          <Icon name={getIconName(status)} />
        </Center>
        <Box w="16px" />

        <VStack spacing="8px" w="220px" h="100%" align="flex-start">
          <VStack spacing="4px" w="220px" h="100%" align="flex-start">
            {tx.action && (
              <Text color="grey.500" textStyle="label-1">
                {tx.action}
              </Text>
            )}
            <Text color={colorMode === "light" ? "white" : "grey.900"} textStyle="paragraph-1">
              {tx.msg
                ? tx.msg
                : {
                    submitted: "Transaction Submitted",
                    pending: "Transaction Pending",
                    success: "Transaction Success",
                    failed: "Transaction Failed",
                  }[status]}
            </Text>
          </VStack>
          <Link textStyle="button-2" color="primary.500" href={`${MUMBAI_BLOCK_EXPLORER}/tx/${tx.hash}`} isExternal>
            View on explorer
          </Link>
        </VStack>
      </HStack>
      <Box position="absolute" top="16px" right="16px">
        <IconButton
          ariaLabel="close"
          icon={<Icon name="close" color={colorMode === "light" ? "white" : "grey.900"} />}
          size="32px"
          boxShadow={false}
          flipColor
          onClick={onClose}
        />
      </Box>
    </Box>
  );
};

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

        if (tx.status === "success" || tx.status === "error") {
          toast.update(tx.hash, options(colorMode, tx));
          setTimeout(() => {
            // @ts-ignore
            toast.close(tx.hash);
          }, 5000);
        }
      }
    });
  }, [txs]);

  return <></>;
};

export default StatusTx;
