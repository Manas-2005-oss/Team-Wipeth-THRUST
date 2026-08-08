import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import PublicRoute from "./components/auth/PublicRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import History from "./pages/History";
import SimulationDetails from "./pages/SimulationDetails";

import LLMHistory from "./pages/LLMHistory";
import LLMDetails from "./pages/LLMDetails";

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
        <Route path="/mode-selection" element={
          <ProtectedRoute>
            <ModeSelection />
          </ProtectedRoute>
        } />

        {/* Dashboards */}
        <Route path="/dashboard" element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
        <Route path="/economist" element={<ProtectedRoute>
          <EconomistDashboard />
        </ProtectedRoute>} />

        {/* Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/about-project" element={<About />} />
        <Route path="/labor-adjustment" element={<LaborAdjustment />} />
        <Route path="/team" element={<Team />} />
        <Route path="/squad" element={<Squad />} />
        <Route path="/auth" element={<PublicRoute>  <Auth /> </PublicRoute>} />
        <Route path="/history"element={  <ProtectedRoute> <History />    </ProtectedRoute>  } />
        <Route path="/history/:id" element={<ProtectedRoute> <SimulationDetails /> </ProtectedRoute>} />
        <Route path="/llm-history" element={<ProtectedRoute> <LLMHistory /> </ProtectedRoute>} />
        <Route path="/llm-history/:id" element={<ProtectedRoute> <LLMDetails /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;