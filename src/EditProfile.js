import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './EditProfile.css';

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      Swal.fire({
        title: 'Error',
        text: 'No se encontró el usuario. Por favor, inicie sesión nuevamente.',
        icon: 'error',
        button: 'Aceptar',
      });
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`https://api-digitalevent.onrender.com/api/users/${user.usuario_id}`);
        setProfileData(response.data);
        setNewProfilePic(response.data.fotoPerfil); // Inicializa el campo con la URL actual de la foto de perfil
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

  const handleProfilePicChange = (e) => {
    setNewProfilePic(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear una copia de profileData sin la contraseña
    const { contrasena, ...profileDataWithoutPassword } = profileData;
    const updatedData = { ...profileDataWithoutPassword, fotoPerfil: newProfilePic };

    Swal.fire({
      title: 'Guardando cambios...',
      text: 'Por favor, espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await axios.put(`https://api-digitalevent.onrender.com/api/users/${profileData.usuario_id}`, updatedData);
      Swal.close();
      Swal.fire({
        title: 'Cambios guardados',
        text: 'Los cambios en tu perfil han sido guardados exitosamente.',
        icon: 'success',
        button: 'Aceptar'
      });
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al guardar los cambios. Por favor, inténtalo de nuevo.',
        icon: 'error',
        button: 'Aceptar'
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar el perfil: {error.message}</div>;
  }

  return (
    <div className="edit-profile-container">
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={profileData.nombre}
          onChange={handleChange}
        />
        <label htmlFor="last_name">Apellido:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={profileData.last_name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
        />
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          value={profileData.telefono}
          onChange={handleChange}
        />
        <label htmlFor="fotoPerfil">Foto de perfil (URL):</label>
        <input
          type="text"
          id="fotoPerfil"
          name="fotoPerfil"
          value={newProfilePic}
          onChange={handleProfilePicChange}
        />
        <label htmlFor="contrasena">Contraseña:</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            id="contrasena"
            name="contrasena"
            value={profileData.contrasena}
            readOnly
          />
          <span onClick={toggleShowPassword} className="eye-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="buttons-container">
          <button type="button" className="back-button" onClick={() => window.history.back()}>Atrás</button>
          <button type="submit" className="save-button">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
