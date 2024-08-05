import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import Swal from "sweetalert";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if email and password are filled
    if (!email || !contrasena) {
      Swal({
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos antes de continuar.",
        icon: "warning",
        button: "Entendido",
      });
      return;
    }
    try {
      const { token, user } = await loginUser(email, contrasena);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      switch (user.rol_id) {
        case 1:
          navigate("/admin");
          break;
        case 2:
          navigate("/user");
          break;
        case 3:
          navigate("/organizer");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      Swal({
        title: "Error",
        text: "Error al iniciar sesión. Por favor, verifique sus credenciales.",
        icon: "error",
        button: "Aceptar",
      });
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <div className="login-container">
      <h3>Digital Event Hub</h3>
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo Electrónico"
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Contraseña"
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
        <p>
          ¿Olvidaste tu contraseña?{" "}
          <a href="/reset-password">Recupérala aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
