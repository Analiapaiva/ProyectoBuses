import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

import axios from "axios";

const Reservas = () => {

    const {user } = useContext(UserContext);
    const [reservas, setReservas] = useState([]);

    const fetchReservas = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/reservas`);
            console.log(response.data);
            setReservas(response.data);
        } catch (error) {
            console.error("Error al obtener la reserva:", error);
        }
    }, [user]);


  

useEffect(() => {
    fetchReservas();
}, [fetchReservas]);



return (
    <div className="container py-4">
        <h2>Todas las Reservas</h2>
        {reservas.length === 0 && <p>No Hay reservas</p>}
        {reservas?.map((reserva) => (
            <div key={reserva._id} className="card card-default my-2 mx-2 p-2 relative">
                <h2>{reserva.bus.empresa}</h2>
                <p><b>Usuario:</b> {reserva.user.firstName}  {reserva.user.lastName}</p>
                <p><b>Correo:</b> {reserva.user.email}</p>
                <p><b>Fecha de reserva:</b> {new Date(reserva.createdAt).toLocaleDateString()}</p>
                <p><b>Salida:</b> {reserva.bus.salida}</p>
                <p><b>Destino:</b> {reserva.bus.destino}</p>
                <p><b>Fecha:</b> {new Date(reserva.bus.fechaSalida).toLocaleDateString()}</p>
                <p><b>Hora:</b> {reserva.bus.horaSalida}</p>
                <p><b>Asiento:</b> {reserva.numAsiento}</p>
                

            </div>
        ))}
    </div>
)

}
export default Reservas;