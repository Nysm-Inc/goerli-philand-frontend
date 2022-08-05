import { createClient, configureChains, chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

const alchemyId = process.env.ALCHEMY_ID;
const { chains, provider } = configureChains([chain.polygonMumbai], [alchemyProvider({ alchemyId })]);
const { connectors } = getDefaultWallets({ appName: "Phi", chains });

export { chains };
export default createClient({ autoConnect: true, connectors: connectors, provider });
