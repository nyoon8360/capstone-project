import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SafariZoneEntrance from "./pages/SafariZoneEntrance";
import NotFound from "./pages/NotFound";
import PCBox from "./pages/PCBox";
import Shuttle from "./pages/Shuttle";
import Account from "./pages/Account";
import Area from "./pages/Area";
import Encounter from "./pages/Encounter";
import AdminPanelHome from "./pages/AdminPanelHome";
import AdminPanelPlayers from "./pages/AdminPanelPlayers";
import AdminPanelAreas from "./pages/AdminPanelAreas";
import AdminPanelPlayerForm from "./pages/AdminPanelPlayerForm";
import AdminPanelAreaForm from "./pages/AdminPanelAreaForm";

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/entrance" element={<SafariZoneEntrance/>}/>
      <Route path="/pcbox" element={<PCBox/>}/>
      <Route path="/shuttle" element={<Shuttle/>}/>
      <Route path="/myaccount" element={<Account/>}/>
      <Route path="/area/:areaId" element={<Area/>}/>
      <Route path="/encounter" element={<Encounter/>}/>
      <Route path="/admin" element={<AdminPanelHome/>}/>
      <Route path="/admin/players" element={<AdminPanelPlayers/>}/>
      <Route path="/admin/players/form/:areaId" element={<AdminPanelPlayerForm/>}/>
      <Route path="/admin/areas" element={<AdminPanelAreas/>}/>
      <Route path="/admin/areas/form/" element={<AdminPanelAreaForm/>}/>
      <Route path="/admin/areas/form/:areaId" element={<AdminPanelAreaForm/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </Router>)
}

export default App;
