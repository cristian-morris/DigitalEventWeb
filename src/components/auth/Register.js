import React, { useState } from "react";
import swal from "sweetalert";
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
    curp: "",
    empresa: "",
    rfc: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email, contrasena, telefono, last_name, rol_id, curp, empresa, rfc } = formData;
    if (!nombre || !email || !contrasena || !telefono || !last_name || (rol_id === "3" && (!curp || !empresa || !rfc))) {
      swal("Error", "Por favor, rellena todos los campos.", "error");
      return;
    }

    try {
      await registerUser({ nombre, email, contrasena, telefono, last_name, rol_id });
      
      // Guardar los datos adicionales en localStorage si es organizador
      if (rol_id === "3") {
        localStorage.setItem("curp", curp);
        localStorage.setItem("empresa", empresa);
        localStorage.setItem("rfc", rfc);
      }

      swal("Registro exitoso", "Tu cuenta ha sido creada con éxito", "success")
        .then(() => {
          window.location.href = "/login"; // Redirigir a login después del registro
        });
    } catch (error) {
      console.error("Error al registrarse", error);
      swal("Error al registrarse", "Hubo un problema al crear tu cuenta", "error");
    }
  };

  return (
    <div className="modal">
      <div className="header">
        <h1>Digital Event Hub</h1>
      </div>
      <div className="container">
        <h2>Crea una cuenta</h2>
        <div className="subtext">Es rápido y fácil</div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row horizontal">
            <div className="form-group">
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Apellido"
              />
            </div>
          </div>
          <div className="form-group wide-input">
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
            />
          </div>
          <div className="form-group wide-input">
            <input
              name="contrasena"
              type="password"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="Contraseña"
            />
          </div>
          <div className="form-row horizontal">
            <div className="form-group">
              <input
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
              />
            </div>
            <div className="form-group">
              <select
                name="rol_id"
                value={formData.rol_id}
                onChange={handleChange}
              >
                <option value="2">Usuario</option>
                <option value="3">Organizador</option>
              </select>
            </div>
          </div>
          {formData.rol_id === "3" && (
            <>
              <div className="form-group wide-input">
                <input
                  name="curp"
                  value={formData.curp}
                  onChange={handleChange}
                  placeholder="CURP"
                />
              </div>
              <div className="form-group wide-input">
                <input
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  placeholder="Empresa"
                />
              </div>
              <div className="form-group wide-input">
                <input
                  name="rfc"
                  value={formData.rfc}
                  onChange={handleChange}
                  placeholder="RFC"
                />
              </div>
            </>
          )}
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
