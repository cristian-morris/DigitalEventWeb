import React, { useState } from "react";
import Swal from "sweetalert";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal({
        title: "Campo incompleto",
        text: "Por favor, ingrese su correo electrónico.",
        icon: "warning",
        button: "Entendido",
      });
      return;
    }
    try {
      const response = await fetch("https://api-digitalevent.onrender.com/api/password/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal({
          title: "Correo enviado",
          text: "Se ha enviado un correo para restablecer su contraseña.",
          icon: "success",
          button: "Aceptar",
        });
      } else {
        Swal({
          title: "Error",
          text: data.message || "Error al enviar el correo. Por favor, intente nuevamente.",
          icon: "error",
          button: "Aceptar",
        });
      }
    } catch (error) {
      Swal({
        title: "Error",
        text: "Error al enviar el correo. Por favor, intente nuevamente.",
        icon: "error",
        button: "Aceptar",
      });
      console.error("Error al enviar el correo", error);
    }
  };

  return (
    <div className="reset-password-container">
      <h1 className="app-title">Digital Event Hub</h1>
      <div className="reset-password-form">
        <h2>Recuperar contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo Electrónico"
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">Enviar</button>
        </form>
        <p>
          ¿Recordaste tu contraseña? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
