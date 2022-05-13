import { Button, HStack, Link, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAccount, useENSName, useProvider } from "~/connectors/metamask";
import { COUPON_API_GATEWAY, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { useClaim } from "~/hooks/claim";
import {
  useCreatedPhiland,
  useDeposit,
  useRemoveAndWrite,
  useRemoveLink,
  useViewLink,
  useViewPhiland,
  useWriteLink,
} from "~/hooks/map";
import { useApproveAll } from "~/hooks/object";
import { useCreatePhiland } from "~/hooks/registry";
import Wallet from "~/ui/components/Wallet";

const Index: NextPage = () => {
  const router = useRouter();
  const provider = useProvider();
  const account = useAccount();
  const ens = useENSName(provider);
  const createdPhiland = useCreatedPhiland(ens, provider);
  const createPhiland = useCreatePhiland(ens, provider);
  const approveAllPhiPbject = useApproveAll(provider);
  const deposit = useDeposit(provider);
  const claimObject = useClaim(account, provider);
  const removeAndWrite = useRemoveAndWrite(ens, provider);
  const phiObjects = useViewPhiland(ens, provider);
  const writeLink = useWriteLink(ens, provider);
  const removeLink = useRemoveLink(ens, provider);

  // todo: batch?
  const phiLink = useViewLink(ens, provider);

  return (
    <VStack p="16">
      <Text fontSize="xl" onClick={() => router.push("/explorer")} textDecoration="underline" cursor="pointer">
        Explorer
      </Text>
      <HStack>
        <Wallet />
        <Text>/{ens}</Text>
      </HStack>
      <HStack>
        <Button disabled={createdPhiland.isCreated} onClick={createPhiland}>
          Create Philand
        </Button>
        <Text>/ {String(createdPhiland.isCreated)}</Text>
      </HStack>
      <HStack>
        <Link href={COUPON_API_GATEWAY} isExternal textDecoration="underline">
          Coupon API
        </Link>
        <Button
          onClick={async () => {
            const tx = await claimObject(1);
            console.log(tx);
            const receipt = await tx.wait();
            console.log(receipt);
          }}
        >
          Claim Object 1
        </Button>
        <Button onClick={async () => claimObject(2)}>Claim Object 2</Button>
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
            removeAndWrite([], [{ contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 1, xStart: 0, yStart: 0 }])
          }
        >
          Write Object 1
        </Button>
        <Button
          onClick={() =>
            removeAndWrite([0], [{ contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 2, xStart: 4, yStart: 3 }])
          }
        >
          Remove Object 1 And Write Object 2
        </Button>
      </HStack>
      <Text textAlign="center">{JSON.stringify(phiObjects)}</Text>
      <HStack>
        <Button onClick={() => writeLink(1, "title", "link")}>Write Link to object 2</Button>
        <Button onClick={() => removeLink(1)}>Remove Link from object 2</Button>
      </HStack>
      <Text textAlign="center">{JSON.stringify(phiLink)}</Text>
    </VStack>
  );
};

export default Index;
