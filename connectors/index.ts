import { createClient, configureChains, chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { connectorsForWallets, wallet } from "@rainbow-me/rainbowkit";

const alchemy = alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID, priority: 0 });
const { chains, provider } = configureChains([chain.polygonMumbai], [alchemy, publicProvider({ priority: 1 })]);
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [wallet.metaMask({ chains }), wallet.coinbase({ appName: "phi", chains }), wallet.walletConnect({ chains })],
  },
]);
const client = createClient({ autoConnect: true, connectors, provider });

const goerliProvider = alchemy(chain.goerli)?.provider();

export { client, goerliProvider, chains };
