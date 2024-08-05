// src/components/CreateEvent.js
import React, { useState } from "react";
import { createEvent } from "../api";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    nombre: "",
    fecha_inicio: "",
    fecha_termino: "",
    hora: "",
    ubicacion: "",
    max_per: 0,
    tipo_evento_id: 0,
    categoria_id: 0,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(eventData, token);
      alert("Evento creado con éxito");
    } catch (error) {
      console.error("Error al crear el evento", error);
      alert("Error al crear el evento");
    }
  };

  return (
    <div>
      <h1>Crear Evento</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          value={eventData.nombre}
          onChange={handleChange}
          placeholder="Nombre del evento"
          required
        />
        <input
          name="fecha_inicio"
          type="date"
          value={eventData.fecha_inicio}
          onChange={handleChange}
          required
        />
        <input
          name="fecha_termino"
          type="date"
          value={eventData.fecha_termino}
          onChange={handleChange}
          required
        />
        <input
          name="hora"
          value={eventData.hora}
          onChange={handleChange}
          placeholder="Hora"
          required
        />
        <input
          name="ubicacion"
          value={eventData.ubicacion}
          onChange={handleChange}
          placeholder="Ubicación"
          required
        />
        <input
          name="max_per"
          type="number"
          value={eventData.max_per}
          onChange={handleChange}
          placeholder="Máximo de personas"
          required
        />
        <input
          name="tipo_evento_id"
          type="number"
          value={eventData.tipo_evento_id}
          onChange={handleChange}
          placeholder="ID del tipo de evento"
          required
        />
        <input
          name="categoria_id"
          type="number"
          value={eventData.categoria_id}
          onChange={handleChange}
          placeholder="ID de la categoría"
          required
        />
        <button type="submit">Crear Evento</button>
      </form>
    </div>
  );
};

export default CreateEvent;
