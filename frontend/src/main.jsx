import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorPage from "./Routes/ErrorPage.jsx";

import ReportsViewer from "./Routes/ReportsViewer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/reports" element={<ReportsViewer />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>
);

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
