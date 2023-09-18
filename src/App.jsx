import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./pages/main";
import useCustomContext from "./hooks/useCustomContext";
import CustomContextProvider from "./context/customContext";

export default function App() {
  const { value } = useCustomContext();

  return (
    <>
      <CustomContextProvider value={value}>
        <Header />
        <Main />
        <Footer />
      </CustomContextProvider>
    </>
  );
}
