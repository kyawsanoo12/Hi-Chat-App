import { Routes,Route, useNavigate,Navigate,useLocation } from "react-router-dom";
import Login from "./components/login/Login";
import { Register } from "./components/register/Register";
import Chat from "./components/chat/chat";
import { useEffect, useState } from "react";

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("chat_app_profile")));
  const location = useLocation();

  useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("chat_app_profile")));
  },[location])

  return (
    
     <Routes>
      <Route path="/" element={user ? <Chat/> : <Navigate to="/login" />} />
      <Route path="/conversation/:conversationId" element={user ? <Chat/>:<Navigate to="/login"/> }/>
      <Route path="/login" element={user ?<Navigate to="/"/> :<Login/>} />
      <Route path="/register" element={user ? <Navigate to="/" /> :
        <Register />} />
      
      </Routes>
     
  )
 
}

export default App;
