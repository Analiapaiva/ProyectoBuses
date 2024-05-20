import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function RegisBus() {
  const [formData, setFormData] = useState({
    empresa: '',
    bus: '',
    destino: '',
    fechaSalida: new Date(),
    horaSalida: '',
    capacidadBus: '',
    precioBoleto: ''
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validar el formulario antes de enviar
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Aquí podrías enviar los datos a la API o realizar cualquier otra acción
    console.log('Datos del formulario:', formData);
    // Luego puedes limpiar el formulario si lo deseas
    // setFormData({
    //   empresa: '',
    //   bus: '',
    //   destino: '',
    //   fechaSalida: new Date(),
    //   horaSalida: '',
    //   capacidadBus: '',
    //   precioBoleto: ''
    // });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState,
      fechaSalida: date
    }));
  };

  const validateForm = (data) => {
    const errors = {};
    // Validar empresa
    if (!data.empresa.trim()) {
      errors.empresa = 'Ingrese el nombre de la empresa';
    }
    // Validar bus
    if (!data.bus.trim()) {
      errors.bus = 'Ingrese el número de autobús';
    }
    // Validar destino
    if (!data.destino.trim()) {
      errors.destino = 'Ingrese el destino';
    }
    // Validar hora de salida
    if (!data.horaSalida.trim()) {
      errors.horaSalida = 'Ingrese la hora de salida';
    }
    // Validar capacidad del bus
    if (!data.capacidadBus) {
      errors.capacidadBus = 'Ingrese la capacidad del bus';
    } else if (isNaN(data.capacidadBus)) {
      errors.capacidadBus = 'Ingrese un número válido';
    }
    // Validar precio del boleto
    if (!data.precioBoleto.trim()) {
      errors.precioBoleto = 'Ingrese el precio del boleto';
    } else if (isNaN(data.precioBoleto)) {
      errors.precioBoleto = 'Ingrese un número válido';
    }
    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="empresa" className="form-label">Empresa:</label>
        <input type="text" className="form-control" id="empresa" name="empresa" value={formData.empresa} onChange={handleChange} />
        {errors.empresa && <div className="text-danger">{errors.empresa}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="bus" className="form-label">Autobús:</label>
        <input type="text" className="form-control" id="bus" name="bus" value={formData.bus} onChange={handleChange} />
        {errors.bus && <div className="text-danger">{errors.bus}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="destino" className="form-label">Destino:</label>
        <input type="text" className="form-control" id="destino" name="destino" value={formData.destino} onChange={handleChange} />
        {errors.destino && <div className="text-danger">{errors.destino}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="fechaSalida" className="form-label">Fecha de Salida:</label>
        <DatePicker
          className="form-control"
          selected={formData.fechaSalida}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="horaSalida" className="form-label">Hora de Salida:</label>
        <input type="time" className="form-control" id="horaSalida" name="horaSalida" value={formData.horaSalida} onChange={handleChange} />
        {errors.horaSalida && <div className="text-danger">{errors.horaSalida}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="capacidadBus" className="form-label">Capacidad del Bus:</label>
        <input type="number" className="form-control" id="capacidadBus" name="capacidadBus" value={formData.capacidadBus} onChange={handleChange} />
        {errors.capacidadBus && <div className="text-danger">{errors.capacidadBus}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="precioBoleto" className="form-label">Precio del Boleto:</label>
        <input type="text" className="form-control" id="precioBoleto" name="precioBoleto" value={formData.precioBoleto} onChange={handleChange} />
        {errors.precioBoleto && <div className="text-danger">{errors.precioBoleto}</div>}
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">Enviar</button>
      </div>
    </form>
  );
}

export default RegisBus;
