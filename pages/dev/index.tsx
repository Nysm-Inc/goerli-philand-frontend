import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useAccount, useENSName, useProvider } from "~/connectors/metamask";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { useDeposit, useRemoveAndWrite, useRemoveLink, useViewLink, useViewPhiland, useWriteLink } from "~/hooks/map";
import { useApproveAll } from "~/hooks/object";
import Wallet from "~/ui/components/Wallet";

const Index: NextPage = () => {
  const router = useRouter();
  const provider = useProvider();
  const account = useAccount();
  const ens = useENSName(provider);

  // ok
  const approveAllPhiPbject = useApproveAll(provider);
  const deposit = useDeposit(ens, provider);
  const removeAndWrite = useRemoveAndWrite(ens, provider);

  // no-check
  // const writeLink = useWriteLink(ens, provider);
  // const removeLink = useRemoveLink(ens, provider);
  // const phiLink = useViewLink(ens, provider);

  return (
    <VStack p="16">
      <HStack>
        <Wallet />
        <Text>/{ens}</Text>
      </HStack>
      <Button onClick={approveAllPhiPbject}>Approve All</Button>
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
      <HStack>
        <Button
          onClick={() =>
            removeAndWrite(
              { removeIdxs: [], isRemove: false },
              [{ contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 1, xStart: 0, yStart: 0 }],
              [{ title: "", url: "" }]
            )
          }
        >
          Write Object 1
        </Button>
        <Button
          onClick={() =>
            removeAndWrite(
              { removeIdxs: [0], isRemove: true },
              [{ contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 2, xStart: 4, yStart: 3 }],
              [{ title: "", url: "" }]
            )
          }
        >
          Remove Object 1 And Write Object 2
        </Button>
      </HStack>
      {/* <HStack>
        <Button onClick={() => writeLink(1, "title", "link")}>Write Link to object 2</Button>
        <Button onClick={() => removeLink(1)}>Remove Link from object 2</Button>
      </HStack> */}
      {/* <Text textAlign="center">{JSON.stringify(phiLink)}</Text> */}
    </VStack>
  );
};

export default Index;
