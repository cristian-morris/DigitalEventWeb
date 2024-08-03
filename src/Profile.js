import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './profile.css'; // Si el archivo se llama 'profile.css'


const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);
  const [errorEvents, setErrorEvents] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://api-digitalevent.onrender.com/api/users/2');
        setProfileData(response.data);
        setLoadingProfile(false);
      } catch (error) {
        setErrorProfile(error);
        setLoadingProfile(false);
      }
    };

    const fetchEventsData = async () => {
      try {
        const response = await axios.get('https://api-digitalevent.onrender.com/api/eventos/events/');
        setEventsData(response.data);
        setLoadingEvents(false);
      } catch (error) {
        setErrorEvents(error);
        setLoadingEvents(false);
      }
    };

    Swal.fire({
      title: 'Cargando...',
      text: 'Estamos cargando la información',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    fetchProfileData();
    fetchEventsData();
  }, []);

  useEffect(() => {
    if (!loadingProfile && !loadingEvents) {
      Swal.close();
    }
  }, [loadingProfile, loadingEvents]);

  if (errorProfile) {
    return <div>Error al cargar el perfil: {errorProfile.message}</div>;
  }

  if (errorEvents) {
    return <div>Error al cargar los eventos: {errorEvents.message}</div>;
  }

  const currentDate = new Date();
  const proximosEventos = eventsData.filter(evento => new Date(evento.fecha_inicio) >= currentDate);

  // Verifica que profileData no sea null antes de intentar acceder a sus propiedades
  if (loadingProfile || loadingEvents) {
    return null; // No muestra nada mientras se está cargando
  }

  if (!profileData) {
    return null; // O puedes mostrar un mensaje más amigable aquí si prefieres
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profileData.fotoPerfil} alt="Foto de perfil" className="profile-photo" />
        <br />
        <h1>{profileData.nombre} {profileData.last_name}</h1>
      </div>
      <div className="profile-info">
        <p>Organizador de Eventos</p>
        <h2>Información Personal y Profesional</h2>
        <p>Email: {profileData.email}</p>
        <p>Teléfono: {profileData.telefono}</p>
        <Link to="/edit-profile">
          <button className="edit-button">Editar Perfil</button>
        </Link>
      </div>
      <div className="events-section">
        <h2>Mis Eventos</h2>
        {proximosEventos.length > 0 ? (
          proximosEventos.map(evento => (
            <div key={evento.evento_id} className="event-item">
              <h3>{evento.nombre_evento}</h3>
              <p>Fecha de inicio: {new Date(evento.fecha_inicio).toLocaleDateString()}</p>
              <p>Hora: {evento.hora}</p>
              <p>Ubicación: {evento.ubicacion}</p>
              <p>Categoría: {evento.categoria_nombre}</p>
              <img src={evento.imagen_url} alt={evento.nombre_evento} className="event-image" />
            </div>
          ))
        ) : (
          <p>No hay eventos.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
