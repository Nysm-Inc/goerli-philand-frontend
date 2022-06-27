import { useEffect, useState } from "react";
import { COLOR_MODE_KEY } from "~/constants";
import { ColorMode } from "~/ui/styles";

const useColorMode = (): [ColorMode, () => void] => {
  const [colorMode, setColorMode] = useState<ColorMode>("light");

  const toggleColorMode = () => {
    const _colorMode = colorMode === "light" ? "dark" : "light";
    setColorMode(_colorMode);
    localStorage.setItem(COLOR_MODE_KEY, _colorMode);
  };

  useEffect(() => {
    const _colorMode = localStorage.getItem(COLOR_MODE_KEY);
    if (_colorMode === "light" || _colorMode === "dark") {
      setColorMode(_colorMode);
    }
  }, []);

  return [colorMode, toggleColorMode];
};

export default useColorMode;
