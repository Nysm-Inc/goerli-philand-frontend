import { chain } from "wagmi";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const walletConnect = new WalletConnectConnector({
  chains: [chain.goerli],
  options: {
    qrcode: true,
  },
});

export default walletConnect;
