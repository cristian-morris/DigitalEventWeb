import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h1>Panel de Usuario</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default UserDashboard;
