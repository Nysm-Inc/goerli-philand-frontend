import { createContext } from "vm";

// todo: control current ENS
// @ts-ignore
export const AppContext = createContext<AppContext>(undefined);
