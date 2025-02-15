import "./App.css";
import "@fontsource/poppins"; // Headings
import "@fontsource/inter"; // Body text
import "@fontsource/montserrat"; // Buttons
import NavHome from "./pages/nav/NavHome";
import NavIdea from "./pages/nav/NavIdea";
import NavIdeaGen from "./pages/nav/NavIdeaGen";
import IdeaGenerator from "./pages/IdeaGenerator";


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
        <Route path="/" element={<NavHome />} />
        <Route path="/Home" element={<NavHome />} />
        <Route path="/ideation" element={<NavIdea />} />
        <Route path="/ideation/generator" element={<NavIdeaGen />} />

      </Routes>
      {/* {!isAdminRoute && <Footer />}       Conditionally render Footer */}
    </>
  );
};

export default App;
