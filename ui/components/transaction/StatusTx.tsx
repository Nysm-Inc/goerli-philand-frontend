import { FC, useEffect, useState } from "react";
import { AlertStatus, Flex, Link, Spinner, useToast, UseToastOptions } from "@chakra-ui/react";
import { ETHERSCAN_BLOCK_EXPLORER } from "~/constants";
import { Status, Tx } from "~/types/wagmi";

const alertStatus: { [status in Status]: AlertStatus } = {
  idle: "info",
  loading: "info",
  success: "success",
  error: "error",
};

const options = (tx: Tx): UseToastOptions => {
  return {
    id: tx.hash,
    title: tx.status,
    description: (
      <Flex alignItems="center" justifyContent="space-between">
        <Link href={`${ETHERSCAN_BLOCK_EXPLORER}/tx/${tx.hash}`} isExternal textDecoration="underline">
          view on explorer
        </Link>
        <Spinner color="white" speed="0.7s" size="sm" />
      </Flex>
    ),
    status: alertStatus[tx.status],
    position: "top-right",
    duration: null,
    isClosable: true,
    containerStyle: {
      fontFamily: "monospace",
      fontWeight: "bold",
    },
  };
};

const StatusTx: FC<{ txs: Tx[] }> = ({ txs }) => {
  const toast = useToast();
  const [unique, setUnique] = useState<string[]>([]);

  useEffect(() => {
    txs.forEach((tx) => {
      if (!tx.hash) return;

      if (!toast.isActive(tx.hash)) {
        if (!unique.includes(tx.hash) && tx.status === "loading") {
          toast(options(tx));
          setUnique((prev) => [...prev, tx.hash || ""]);
        }
      } else {
        toast.update(tx.hash, options(tx));

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
