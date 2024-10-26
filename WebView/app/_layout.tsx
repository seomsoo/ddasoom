import React from "react";
import { Slot } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import theme from "@/styles/Theme";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Slot />
    </ThemeProvider>
  );
};

export default Root;
