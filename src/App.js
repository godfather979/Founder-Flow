import "./App.css";
import "@fontsource/poppins"; // Headings
import "@fontsource/inter"; // Body text
import "@fontsource/montserrat"; // Buttons
import NavHome from "./pages/nav/NavHome";
import NavLegal from "./pages/nav/NavLegal";
import NavMarketing from "./pages/nav/NavMarketing";
import NavBranding from "./pages/nav/NavBranding";
import NavMotivation from "./pages/nav/NavMotivation";

import NavIdea from "./pages/nav/NavIdea";
import NavIdeaGen from "./pages/nav/NavIdeaGen";
import NavIdeaVal from "./pages/nav/NavIdeaVal";
import NavRoadMap from "./pages/nav/NavRoadMap";
import Landing from "./pages/Landing";

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
        <Route path="/" element={<Landing />} />
        <Route path="/Founder-Flow" element={<Landing />} />
        <Route path="/Home" element={<NavHome />} />
        <Route path="/ideation" element={<NavIdea />} />
        <Route path="/ideation/generator" element={<NavIdeaGen />} />
        <Route path="/ideation/validator" element={<NavIdeaVal />} />
        <Route path="/ideation/RoadMap" element={<NavRoadMap />} />

        <Route path="/legal" element={<NavLegal />} />
        <Route path="/marketing" element={<NavMarketing />} />
        <Route path="/branding" element={<NavBranding />} />
        <Route path="/motivation" element={<NavMotivation />} />
      </Routes>
      {/* {!isAdminRoute && <Footer />}       Conditionally render Footer */}
    </>
  );
};

export default App;
