import { createContext } from "react";

export const contactContext = createContext({
    loading: false,
    setLoading: () => {},
});
