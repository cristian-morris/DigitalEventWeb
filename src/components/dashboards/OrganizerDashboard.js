import React from "react";
import { useNavigate } from "react-router-dom";
import CreateEvent from "../CreateEvent";

const OrganizerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h1>Panel de Organizador</h1>
      <CreateEvent />
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default OrganizerDashboard;
