import { NextPage } from "next";
import { useRouter } from "next/router";
import { Divider, Link, Text, VStack } from "@chakra-ui/react";
import {
  PHI_CLAIM_CONTRACT_ADDRESS,
  PHI_MAP_CONTRACT_ADDRESS,
  PHI_OBJECT_CONTRACT_ADDRESS,
  PHI_REGISTRY_CONTRACT_ADDRESS,
} from "~/constants";

const baseURL = "https://goerli.etherscan.io/address/";

const Explorer: NextPage = () => {
  const router = useRouter();
  return (
    <VStack p="16">
      <Text fontSize="xl">Goerli Etherscan</Text>
      {/* <Link href={baseURL + PAID_OBJECT_CONTRACT_ADDRESS} isExternal textDecoration="underline">
        Paid Object
      </Link>
      <Link href={baseURL + FREE_OBJECT_CONTRACT_ADDRESS} isExternal textDecoration="underline">
        Free Object
      </Link> */}
      <Link href={baseURL + PHI_OBJECT_CONTRACT_ADDRESS} isExternal textDecoration="underline">
        Phi Object
      </Link>
      <Link href={baseURL + PHI_MAP_CONTRACT_ADDRESS} isExternal textDecoration="underline">
        Phi Map
      </Link>
      <Link href={baseURL + PHI_REGISTRY_CONTRACT_ADDRESS} isExternal textDecoration="underline">
        Phi Registry
      </Link>
      <Link href={baseURL + PHI_CLAIM_CONTRACT_ADDRESS} isExternal textDecoration="underline">
        Phi Claim
      </Link>
      <Divider />
      <Text fontSize="md" textDecoration="underline" cursor="pointer" onClick={() => router.push("developer")}>
        developer mode
      </Text>
    </VStack>
  );
};

export default Explorer;
