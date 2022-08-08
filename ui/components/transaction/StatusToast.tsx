import { FC, useContext, useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { Box, Center, HStack, Link, Text, useToast, UseToastOptions, VStack } from "@chakra-ui/react";
import { Status as TxStatus, Tx } from "~/types/tx";
import { AppContext } from "~/contexts";
import { ColorMode } from "~/ui/styles";
import { information } from "~/ui/styles/color";
import Icon, { IconName } from "~/ui/components/Icon";
import IconButton from "~/ui/components/common/IconButton";

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

const toastPositon = "top-right";
const toastManagerId = `chakra-toast-manager-${toastPositon}`;

const StatusComponent: FC<{ colorMode: ColorMode; tx: Tx; onClose: () => void }> = ({ colorMode, tx, onClose }) => {
  const { chain } = useNetwork();
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
      boxShadow="xl"
      borderRadius="16px"
      bgColor={colorMode === "light" ? "grey.900" : "white"}
    >
      <HStack spacing="0" p="16px" align="flex-start">
        <Center w="40px" h="40px" borderRadius="40px" bgColor={getColor(status)}>
          <Icon name={getIconName(status)} color="white" />
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
          <Link textStyle="button-2" color="primary.500" href={`${chain?.blockExplorers?.default.url}/tx/${tx.hash}`} isExternal>
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
    position: toastPositon,
    duration: null,
    isClosable: true,
    containerStyle: { margin: "8px 0 0 0" },
    render: (props) => <StatusComponent colorMode={colorMode} tx={tx} onClose={() => props.onClose()} />,
  };
};

const StatusTx: FC = () => {
  const { txs, colorMode } = useContext(AppContext);
  const toast = useToast();
  const [unique, setUnique] = useState<string[]>([]);

  useEffect(() => {
    Object.values(txs).forEach((tx) => {
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

  useEffect(() => {
    const toastManagerDomNode = document.getElementById(toastManagerId);
    if (!toastManagerDomNode) return;
    toastManagerDomNode.style.padding = "88px 24px 0 0";
  }, []);

  return <></>;
};

export default StatusTx;
