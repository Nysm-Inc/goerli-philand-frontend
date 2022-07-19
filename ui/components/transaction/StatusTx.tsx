import { FC, useContext, useEffect, useState } from "react";
import { Box, Center, Flex, HStack, Link, Text, useToast, UseToastOptions } from "@chakra-ui/react";
import { MUMBAI_BLOCK_EXPLORER } from "~/constants";
import { Status as TxStatus, Tx } from "~/types/tx";
import { AppContext } from "~/contexts";
import { Icon, IconName, IconButton } from "~/ui/components";
import { ColorMode } from "~/ui/styles";

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

// todo: Theme Typings
const getColor = (label: Status): string => {
  switch (label) {
    case "submitted": {
      return "#0086F0";
    }
    case "pending": {
      return "#FFC328";
    }
    case "success": {
      return "#70DBB8";
    }
    case "failed": {
      return "#EF4444";
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
        <Center w="40px" h="40px" borderRadius="40px" bgColor={getColor(status)}>
          <Icon name={getIconName(status)} />
        </Center>
        <Box w="16px" />

        <Flex direction="column" w="220px" h="100%">
          <Text color="#808080" textStyle="label-1">
            Action Label
          </Text>
          <Text color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"} textStyle="paragraph-1">
            {tx.msg
              ? tx.msg
              : {
                  submitted: "Transaction Submitted",
                  pending: "Transaction Pending",
                  success: "Transaction Success",
                  failed: "Transaction Failed",
                }[status]}
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
          }, 3000);
        }
      }
    });
  }, [txs]);

  return <></>;
};

export default StatusTx;
