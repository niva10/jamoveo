
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WaitingRoom from "./pages/WaitingRoom";
import SongSearch from "./pages/SongSearch";
import LiveView from "./pages/LiveView";
import NotFound from "./pages/NotFound";


const Router = ({currentUser,setCurrentUser}) => (
  <Routes>
    <Route path="/" element={<Login setCurrentUser = {setCurrentUser} />} />
    <Route path="/signup" element={<Signup role="user" setCurrentUser = {setCurrentUser} />} />
    <Route path="/signup/admin" element={<Signup role="admin" setCurrentUser = {setCurrentUser} />} />
    <Route path="/waiting" element={<WaitingRoom currentUser = {currentUser} />} />
    <Route path="/search" element={<SongSearch currentUser={currentUser} />} />
    <Route path="/live" element={<LiveView  currentUser={currentUser} />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Router;