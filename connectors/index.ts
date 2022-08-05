import { createClient, configureChains, chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { connectorsForWallets, wallet } from "@rainbow-me/rainbowkit";

const alchemyId = process.env.ALCHEMY_ID;
const { chains, provider } = configureChains([chain.polygonMumbai], [alchemyProvider({ alchemyId }), publicProvider()]);
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [wallet.metaMask({ chains }), wallet.coinbase({ appName: "phi", chains }), wallet.walletConnect({ chains })],
  },
]);
const client = createClient({ autoConnect: true, connectors: connectors, provider });

export { client, chains };
