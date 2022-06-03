import { chain } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const metamask = new MetaMaskConnector({
  chains: [chain.goerli],
  // options: {},
});

export default metamask;
