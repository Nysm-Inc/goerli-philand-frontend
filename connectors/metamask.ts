import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));
const { useAccount, useChainId, useENSName, useProvider } = hooks;

export { metaMask, useAccount, useChainId, useENSName, useProvider };
