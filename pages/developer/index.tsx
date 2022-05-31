import type { NextPage } from "next";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useENSName, useProvider } from "~/connectors/metamask";
import { useDeposit } from "~/hooks/map";
import { useApproveAll } from "~/hooks/object";
import Wallet from "~/ui/components/Wallet";

const Index: NextPage = () => {
  const provider = useProvider();
  const ens = useENSName(provider);

  const approveAllPhiPbject = useApproveAll(provider);
  const [_, deposit, undeposit] = useDeposit(ens, provider);

  return (
    <VStack p="16">
      <HStack>
        <Wallet />
        <Text>/{ens}</Text>
      </HStack>
      <Button onClick={approveAllPhiPbject}>Approve All</Button>
      <HStack>
        <Button
          onClick={() =>
            deposit([
              { tokenId: 1, amount: 1 },
              { tokenId: 2, amount: 1 },
            ])
          }
        >
          Deposit Objects 1 and 2
        </Button>
        <Button
          onClick={() =>
            undeposit([
              { tokenId: 1, amount: 1 },
              { tokenId: 2, amount: 1 },
            ])
          }
        >
          UnDeposit Objects 1 and 2
        </Button>
      </HStack>
    </VStack>
  );
};

export default Index;
