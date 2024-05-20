import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar que se haya ingresado un nombre
    if (!formData.name.trim()) {
      setError('Ingrese su nombre');
      return;
    }

    // Validar que se haya ingresado un correo electrónico válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Ingrese un correo electrónico válido');
      return;
    }

    // Validar que se haya ingresado una contraseña
    if (!formData.password) {
      setError('Ingrese una contraseña');
      return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Si pasa todas las validaciones, puedes enviar los datos del usuario al backend
    console.log('Datos del usuario:', formData);

    // Luego puedes limpiar el formulario
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre:</label>
        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Ingrese Nombre" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo:</label>
        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="ejemplo@correo.com" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña:</label>
        <div className="input-group">
          <input type={showPassword ? 'text' : 'password'} className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mínimo 6 caracteres" />
          <button className="btn btn-outline-secondary" type="button" onClick={toggleShowPassword}>
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
        <div className="input-group">
          <input type={showConfirmPassword ? 'text' : 'password'} className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmar contraseña" />
          <button className="btn btn-outline-secondary" type="button" onClick={toggleShowConfirmPassword}>
            {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>
      <button type="submit" className="btn btn-primary"      onClick={() => navigate("/")}>Crear Usuario</button>
    </form>
  );
}

export default Registro;
