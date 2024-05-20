import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validar que se haya ingresado un email
        if (!email) {
            setError('Ingrese su Correo');
            return;
        }
        // Validar que se haya ingresado una contraseña
        if (!password) {
            setError('Ingrese su Contraseña');
            return;
        }
        // Validar que la contraseña tenga al menos 6 caracteres
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        // Aquí puedes agregar la lógica para enviar los datos del formulario a tu backend para autenticar al usuario
        console.log('Email:', email);
        console.log('Password:', password);
        // Luego de enviar los datos, puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <div className='d-flex align-items-center justify-content-between '> 
                <Button variant="primary" type="submit"  onClick={() => navigate("/BusSearch")}>
                Submit
                </Button>
              <a href=''     onClick={() => navigate("/Registro")}> No estas registrado</a>

                </div>

            </Form>
        </div>
    );
};

export default Login;
