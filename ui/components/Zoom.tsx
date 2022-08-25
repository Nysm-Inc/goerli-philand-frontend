import { FC, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "~/contexts";
import SelectBox from "./common/SelectBox";

const scaledList = [0.1, 0.25, 0.5, 1, 2, 4, 8, 16];

const zoom = (scaled: number, action: "in" | "out") => {
  const next = action === "in" ? scaled * 2 : scaled / 2;
  const dists = scaledList.map((s) => Math.abs(s - next));
  const min = Math.min(...dists);
  return scaledList[dists.findIndex((v) => v === min)];
};

export const useZoom = () => {
  const { game } = useContext(AppContext);
  const [scaled, setScaled] = useState(1);

  useEffect(() => {
    setScaled(game.engine.viewport.scaled);
  }, []);

  return { scaled, changeScaled: (_scaled: number) => setScaled(_scaled) };
};

const Zoom: FC<{ scaled: number; changeScaled: (_scaled: number) => void }> = ({ scaled, changeScaled }) => {
  const options = useMemo(() => {
    return [
      { label: "Zoom IN", value: (scaled * 2).toString(), onClick: () => changeScaled(zoom(scaled, "in")) },
      { label: "Zoom Out", value: (scaled / 2).toString(), onClick: () => changeScaled(zoom(scaled, "out")) },
      { label: "Zoom to 100%", value: "", onClick: () => changeScaled(1) },
    ];
  }, [scaled]);

  return (
    <SelectBox
      w="96px"
      menuW="200px"
      options={options}
      selected={{ label: Math.round(scaled * 100).toString() + "%", value: scaled.toString() }}
    />
  );
};

export default Zoom;
