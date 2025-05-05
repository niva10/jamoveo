
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WaitingRoom from "./pages/WaitingRoom";
import SongSearch from "./pages/SongSearch";
import LiveView from "./pages/LiveView";
import NotFound from "./pages/NotFound";


const Router = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signup/admin" element={<Signup isAdmin={true} />} />
    <Route path="/waiting" element={<WaitingRoom />} />
    <Route path="/search" element={<SongSearch />} />
    <Route path="/live" element={<LiveView />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Router;