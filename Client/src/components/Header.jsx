import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { UserContext } from "../context/UserContext"; // Asegúrate de importar correctamente el contexto de usuario

const HeaderContainer = styled.header`
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 1rem;
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const LogoutButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  border-radius: 5px;
`;

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [showMenu, setShowMenu] = React.useState(false);

  const logOutUser = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
      setShowMenu(false);
      console.log("User logged out");
    } catch (err) {
      console.log("Error: ", err.response?.data?.msg || "Error desconocido");
      alert("Error al cerrar sesión");
    }
  };

  return (
    <HeaderContainer>
      <HeaderTitle>Bus Ticket Book</HeaderTitle>

      {user && (
        <>
          <Link to="/BusSearch" className="btn btn-sm btn-outline-light me-4">
            Buscar Viajes
          </Link>
          <Link to="/mis-reservas" className="btn btn-sm btn-outline-light me-4">
            Mis reservas
          </Link>
        
        {user && user.role === "admin" && (
           <Link to="/AllReservas" className="btn btn-sm btn-outline-light me-4"> 
           Todas las Reservas
            </Link>
        )}
          <Link  className="btn btn-sm btn-outline-danger me-4" onClick={logOutUser}>Cerrar Sesión</Link>
        </>
      )}
    </HeaderContainer>
  );
};

export default Header;
