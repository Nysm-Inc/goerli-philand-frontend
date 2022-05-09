import { Button, HStack, Link, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAccount, useENSName, useProvider } from "~/connectors/metamask";
import { COUPON_API_GATEWAY, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { useClaim } from "~/hooks/claim";
import { useDeposit, useViewPhiland, useWriteObjects } from "~/hooks/map";
import { useApproveAll } from "~/hooks/object";
import { useCreatePhiland } from "~/hooks/registry";
import Wallet from "~/ui/components/Wallet";

const Index: NextPage = () => {
  const router = useRouter();
  const provider = useProvider();
  const account = useAccount();
  const ens = useENSName(provider);
  const createPhiland = useCreatePhiland(ens, provider);
  const approveAllPhiPbject = useApproveAll(provider);
  const deposit = useDeposit(provider);
  const writeObjects = useWriteObjects(ens, provider);
  const phiObjects = useViewPhiland(ens, provider);
  const claimObject = useClaim(account, provider);
  // console.log(phiObjects);

  return (
    <VStack p="16">
      <HStack>
        <Wallet />
        <Text>/{ens}</Text>
      </HStack>
      <Button onClick={() => router.push("/explorer")}>Explorer</Button>
      <Button onClick={createPhiland}>Create Philand</Button>
      <Button onClick={approveAllPhiPbject}>Approve All</Button>
      <Button onClick={() => deposit([{ tokenId: 1, amount: 1 }])}>Deposit</Button>
      <Button
        onClick={() =>
          writeObjects([{ contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 1, xStart: 0, yStart: 0 }])
        }
      >
        Write Objects
      </Button>
      <Link href={COUPON_API_GATEWAY} isExternal textDecoration="underline">
        Coupon API
      </Link>
      <Button
        onClick={async () => {
          const tx = await claimObject(2);
          console.log(tx);
          const receipt = await tx.wait();
          console.log(receipt);
        }}
      >
        Claim Object
      </Button>
    </VStack>
  );
};

export default Index;
