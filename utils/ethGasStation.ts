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

export const ethGasStationCall = async (): Promise<GasStation | null> => {
  return fetch("https://gasstation-mumbai.matic.today/v2").then((res) => res.json());
};

export const getFastestGas = async (): Promise<Fee | null> => {
  const r = await ethGasStationCall();
  return r ? r.fast : null;
};
