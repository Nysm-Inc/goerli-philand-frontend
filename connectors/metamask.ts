import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));

export const { useAccount, useChainId, useENSName, useProvider } = hooks;
export default metaMask;
