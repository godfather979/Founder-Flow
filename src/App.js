import "./App.css";
import "@fontsource/poppins"; // Headings
import "@fontsource/inter"; // Body text
import "@fontsource/montserrat"; // Buttons
import NavInv from "./pages/NavInv";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesWeb />
      </BrowserRouter>
    </>
  );
}

const RoutesWeb = () => {
  const location = useLocation(); // Get the current route

  return (
    <>
      {/* {loading && <Loader />} */}
      <Routes>
        <Route path="/nav" element={<NavInv />} />
      </Routes>
      {/* {!isAdminRoute && <Footer />}       Conditionally render Footer */}
    </>
  );
};

export default App;
