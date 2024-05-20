import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import { Buses } from '../utils'; 
import { Button } from "react-bootstrap";

const Container = styled.div`
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const TicketContainer = styled.div`
    padding: 0.5rem 0;
`;

const TicketItem = styled.div`
    background-color: white;
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`;

export default function BusLayout({ selectedSeats, setSelectedSeats }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedBus = Buses.find(data => data.id === parseInt(id));
    const isSleeper = selectedBus && selectedBus.busType === 'Sleeper';
    const seatWidth = isSleeper ? '80px' : '25px';

    const iseSeatAvailable = (seat) => selectedBus.availableSeats.includes(seat);
    
    const selectedSeat = (seat) => {
        if (selectedSeats?.includes(seat)) {
            const seats = setSelectedSeats.filter(selectedSeat => selectedSeat !== seat);
            setSelectedSeats(seats);
            return;
        }
        setSelectedSeats(prevState => [...prevState, seat]);
    };

    const iseSeatSelected = (seat) => selectedSeats.includes(seat);

    const generateSeats = (array, key = "") =>
        array.map((seats) => (
            Array.isArray(seats) ? (
                <div className="d-flex" key={key}>
                    {seats.map((seat) => (
                        <TicketItem key={`${key}${seat}`} style={{ width: seatWidth, background: iseSeatSelected(`${key}${seat}`) ? "#318beb" : iseSeatAvailable(`${key}${seat}`) ? '#ffff' : "#b6b4b4", cursor: iseSeatAvailable(`${key}${seat}`) ? "pointer" : "" }} onClick={() => selectedSeat(`${key}${seat}`)}>
                            {key}
                            {seat}
                        </TicketItem>
                    ))}
                </div>
            ) : (
                <TicketItem key={`${key}${seats}`} style={{ width: seatWidth, background: iseSeatSelected(`${key}${seats}`) ? "#318beb" : iseSeatAvailable(`${key}${seats}`) ? '#ffff' : "#b6b4b4", cursor: iseSeatAvailable(`${key}${seats}`) ? "pointer" : "" }} onClick={() => selectedSeat(`${key}${seats}`)}>
                    {key}
                    {seats}
                </TicketItem>
            )
        ));

    return (
        <Container>
            {selectedBus && (
                <>
                    <h2>{selectedBus.name}</h2>
                    <h4>Tickets</h4>
                    <h5>{selectedBus.busType}</h5>
                    <div className="d-flex">
                        <div className="d-flex mb-2 align-items-center">
                            <h6>Disponible-</h6>
                            <TicketItem style={{ width: seatWidth }}>
                                <span>{1}</span>
                            </TicketItem>
                        </div>
                        <div className="d-flex mb-2 align-items-center">
                            <h6>Reservado-</h6>
                            <TicketItem style={{ width: seatWidth, background: '#b6b4b4' }}>
                                <span>{1}</span>
                            </TicketItem>
                        </div>
                        <div className="d-flex mb-2 align-items-center">
                            <h6>Seleccionado -</h6>
                            <TicketItem style={{ width: seatWidth, background: '#318beb' }}>
                                <span>{1}</span>
                            </TicketItem>
                        </div>
                    </div>
                    <ul className="d-flex flex-wrap">
                        {isSleeper ? (
                            <>
                                <TicketContainer className="d-flex align-items-center">
                                    <h6 className="p-3"> Lugares Superior</h6>
                                    <div className="d-flex flex-wrap">
                                        {generateSeats(selectedBus.seatLayout.upper.first, "U")}
                                    </div>
                                    <div className="d-flex mt-3">
                                        {generateSeats(selectedBus.seatLayout.upper.second, "U")}
                                    </div>
                                </TicketContainer>
                                <TicketContainer className="d-flex align-items-center">
                                    <h6 className="p-3">Lugares Inferior</h6>
                                    <div className="d-flex flex-wrap">
                                        {generateSeats(selectedBus.seatLayout.lower.first, "L")}
                                    </div>
                                    <div className="d-flex mt-3">
                                        {generateSeats(selectedBus.seatLayout.lower.second, "L")}
                                    </div>
                                </TicketContainer>
                            </>
                        ) : (
                            <TicketContainer className="d-flex align-items-center">
                                <div> Plazas</div>
                                <div>
                                    {generateSeats(selectedBus.seatLayout.first)}
                                    <div className="mt-4">
                                        {generateSeats(selectedBus.seatLayout.second)}
                                    </div>
                                </div>
                            </TicketContainer>
                        )}
                    </ul>
                    <div className="d-flex justify-content-center">
                        {selectedSeats?.length > 0 && (
                            <h4>Asientos seleccionados - {selectedSeats.join(",")} </h4>
                        )}
                    </div>
                    <Button className="ms-3"
                        variant="success"
                        onClick={() => navigate("/bus/book")}
                        disabled={!selectedSeats && selectedSeats.length === 0} 
                    >
                        Reservar ahora
                    </Button>
                </>
            )}
        </Container>
    );
}
