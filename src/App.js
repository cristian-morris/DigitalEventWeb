import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserDashboard from "./components/dashboards/UserDashboard";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import Profile from "./Profile"; // Asegúrate de que esto coincide con el nombre del archivo
import ResetPassword from "./components/auth/ResetPassword"; // Importar el componente
import "./App.css"; // O cualquier archivo de estilos que estés usando

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} /> {/* Añadir la nueva ruta */}
        <Route
          path="/user"
          element={<PrivateRoute element={<UserDashboard />} />}
        />
        <Route
          path="/organizer"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminDashboard />} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
