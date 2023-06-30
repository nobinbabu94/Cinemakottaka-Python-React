import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserVndrRoutes";
import VendorsRoutes from "./routes/VendorsRoutes";
import {vendorTheme} from "./styles/theme";
import theme from "./styles/theme";

const App = () => {
  return (
    <>
      <AdminRoutes />
      <ThemeProvider theme={theme}>
        <UserRoutes />
      </ThemeProvider>
      <ThemeProvider theme={vendorTheme}>
        <VendorsRoutes />
      </ThemeProvider>
    </>
  );
};

export default App;
