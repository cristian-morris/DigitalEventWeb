import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default AdminDashboard;
