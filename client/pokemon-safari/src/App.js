import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SafariZoneEntrance from "./pages/SafariZoneEntrance";
import NotFound from "./pages/NotFound";
import PCBox from "./pages/PCBox";
import Shuttle from "./pages/Shuttle";
import Account from "./pages/Account";
import Area from "./pages/Area";

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
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </Router>)
}

export default App;
