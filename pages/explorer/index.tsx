import { NextPage } from "next";
import { Link, Text, VStack } from "@chakra-ui/react";
import {
  CLAIM_CONTRACT_ADDRESS,
  FREE_OBJECT_CONTRACT_ADDRESS,
  MAP_CONTRACT_ADDRESS,
  PHI_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  REGISTRY_CONTRACT_ADDRESS,
} from "~/constants";

const baseURL = "https://goerli.etherscan.io/address/";

const Explorer: NextPage = () => {
  return (
    <VStack p="16">
      <Text fontSize="xl">Goerli Etherscan</Text>
      <Link href={baseURL + PREMIUM_OBJECT_CONTRACT_ADDRESS} isExternal textDecoration="underline">
        Premium Object
      </Link>
      <Link href={baseURL + FREE_OBJECT_CONTRACT_ADDRESS} isExternal textDecoration="underline">
        Free Object
      </Link>
      <Link href={baseURL + PHI_OBJECT_CONTRACT_ADDRESS} isExternal textDecoration="underline">
        Phi Object
      </Link>
      <Link href={baseURL + MAP_CONTRACT_ADDRESS} isExternal textDecoration="underline">
        Map
      </Link>
      <Link href={baseURL + REGISTRY_CONTRACT_ADDRESS} isExternal textDecoration="underline">
        Registry
      </Link>
      <Link href={baseURL + CLAIM_CONTRACT_ADDRESS} isExternal textDecoration="underline">
        Claim
      </Link>
    </VStack>
  );
};

export default Explorer;
