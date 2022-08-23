import { FC, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "~/contexts";
import SelectBox from "./common/SelectBox";

export const useZoom = () => {
  const { game } = useContext(AppContext);
  const [scaled, setScaled] = useState(1);

  useEffect(() => {
    setScaled(game.engine.getScale());
  }, []);

  return { scaled, changeScaled: (_scaled: number) => setScaled(_scaled) };
};

const Zoom: FC<{ scaled: number; changeScaled: (_scaled: number) => void }> = ({ scaled, changeScaled }) => {
  const options = useMemo(() => {
    return [
      { label: "Zoom IN", value: scaled.toString(), onClick: () => changeScaled(scaled * 2) },
      { label: "Zoom Out", value: scaled.toString(), onClick: () => changeScaled(scaled / 2) },
    ];
  }, [scaled]);

  return (
    <SelectBox
      //
      w="96px"
      menuW="200px"
      options={options}
      selected={{ label: Math.round(scaled * 100).toString() + "%", value: scaled.toString() }}
    />
  );
};

export default Zoom;
