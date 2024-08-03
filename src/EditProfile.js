import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './EditProfile.css';

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://api-digitalevent.onrender.com/api/users/2');
        setProfileData(response.data);
        setLoading(false);
        Swal.close(); // Cierra el SweetAlert después de cargar los datos
      } catch (error) {
        setError(error);
        setLoading(false);
        Swal.close(); // Cierra el SweetAlert en caso de error
      }
    };

    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Guardando cambios...',
      text: 'Por favor, espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await axios.put('https://api-digitalevent.onrender.com/api/users/2', profileData);
      Swal.fire({
        icon: 'success',
        title: 'Perfil actualizado con éxito',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      setError(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el perfil',
        text: error.message
      });
    }
  };

  const handleBackToProfile = () => {
    // Lógica para regresar al perfil
    window.location.href = '/profile'; // Cambia esta ruta según sea necesario
  };

  if (loading) return null; // No se muestra nada mientras está cargando ya que SweetAlert se encarga de esto
  if (error) return <div>Error al cargar el perfil: {error.message}</div>;

  return (
    <div className="edit-profile-container">
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={profileData.nombre || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="last_name"
            value={profileData.last_name || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profileData.email || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={profileData.telefono || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Imagen de perfil (URL):
          <input
            type="text"
            name="fotoPerfil"
            value={profileData.fotoPerfil || ''}
            onChange={handleChange}
          />
        </label>
        <div className="buttons-container">
          <button type="button" className="back-button" onClick={handleBackToProfile}>
            Regresar al Perfil
          </button>
          <button type="submit" className="save-button">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
