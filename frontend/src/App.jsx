import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import ModeSelection from "./pages/ModeSelection";

import Dashboard from "./pages/Dashboard";
import EconomistDashboard from "./pages/EconomistDashboard";

import AboutUs from "./pages/AboutUs";
import LaborAdjustment from "./pages/LaborAdjustment";
import Team from "./pages/Team";
import About from "./pages/About";
import Squad from "./pages/Squad";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Mode Selection */}
        <Route path="/mode-selection" element={<ModeSelection />} />

        {/* Dashboards */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/economist" element={<EconomistDashboard />} />

        {/* Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/about-project" element={<About />} />
        <Route path="/labor-adjustment" element={<LaborAdjustment />} />
        <Route path="/team" element={<Team />} />
        <Route path="/squad" element={<Squad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;