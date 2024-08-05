import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setError("Error al iniciar sesión");
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
          {error && <p className="error-message">{error}</p>}
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
