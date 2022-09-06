import axios from "axios";
import { BigNumber, utils } from "ethers";
import { captureError } from "./sentry";

type Fee = {
  maxPriorityFee: number;
  maxFee: number;
};

type GasStation = {
  safeLow: Fee;
  standard: Fee;
  fast: Fee;
  blockTime: number;
  blockNumber: number;
};

const _ethGasStationCall = async (): Promise<GasStation | null> => {
  const gas = await axios.get<GasStation>("https://gasstation-mumbai.matic.today/v2");
  return gas.data;
};

const _getFastestGas = async (): Promise<Fee | null> => {
  const r = await _ethGasStationCall();
  return r ? r.fast : null;
};

export const getFastestGasWei = async () => {
  try {
    const gasFee = await _getFastestGas();
    if (!gasFee) throw new Error("invalid gas fee");

    const { maxPriorityFee, maxFee } = gasFee;
    const toFixedMaxPriorityFee = maxPriorityFee.toFixed(8);
    const toFixedMaxFee = maxFee.toFixed(8);
    return {
      maxPriorityFeePerGas: utils.parseUnits(toFixedMaxPriorityFee, "gwei"),
      maxFeePerGas: utils.parseUnits(toFixedMaxFee, "gwei"),
    };
  } catch (err) {
    captureError(err as Error);
    return undefined;
  }
};

export const payTip = ({ fee, tipRate = 0 }: { fee: BigNumber; tipRate?: number }): BigNumber => {
  if (tipRate > 100) throw new Error("tipRate should be less than 100");
  return fee.mul(100 + tipRate).div(100);
};
