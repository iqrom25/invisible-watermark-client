import React from "react";

export const CustomContext = React.createContext({
  size: {},
  setSize: () => {},
  dimension: {},
  setDimension: () => {}
});

export default function CustomContextProvider({ value, children }) {
  return (
    <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
  );
}
