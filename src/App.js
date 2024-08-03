import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Profile'; // Asegúrate de que esto coincide con el nombre del archivo
import EditProfile from './EditProfile';
import './App.css'; // O cualquier archivo de estilos que estés usando

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/" element={<Profile />} /> {/* Redirige a perfil como predeterminado */}
      </Routes>
    </Router>
  );
}

export default App;
