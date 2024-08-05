import React, { useState } from "react";
import { registerUser } from "../../api";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    telefono: "",
    last_name: "",
    rol_id: "2", // Default to 'User'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registro exitoso");
      window.location.href = "/login"; // Redirect to login after registration
    } catch (error) {
      console.error("Error al registrarse", error);
      alert("Error al registrarse");
    }
  };

  return (
    <div className="modal">
      <div className="header">
        <h1>Digital Event Hub</h1>
      </div>
      <div className="container">
        <h2>Crea una cuenta</h2>
        <div className="subtext">Es rápido y facil</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row horizontal">
            <div className="form-group">
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
              />
            </div>
            <div className="form-group">
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Apellido"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="contrasena"
              type="password"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="form-row horizontal">
            <div className="form-group">
              <input
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                required
              />
            </div>
            <div className="form-group">
              <select
                name="rol_id"
                value={formData.rol_id}
                onChange={handleChange}
                required
              >
                <option value="2">Usuario</option>
                <option value="3">Organizador</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <button type="submit">Registrar</button>
          </div>
        </form>
        <div className="link">
          ¿Ya te has registrado? <a href="/login">Inicia sesión</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
