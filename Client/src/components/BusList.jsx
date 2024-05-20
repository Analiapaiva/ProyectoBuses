import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const BusListContainer = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.2)
`
const BusItem = styled.div`
background-colot: white;
ádding: 1 rem;
margin: 0.5rem 0;
border-radius: 5px;
box-shadow: 0px 2px 4px rgba(0,0,0,0.1)
`
export default function BusList({buses}) {
      const navigate = useNavigate();
  return (
    <BusListContainer>
      <h2>Buses Disponibles</h2>
      {buses.map((bus) => (
      <BusItem className='d-flex align-items-center justify-content-between ' key={bus.id}>
        <div>
          <h3>{bus.name}</h3>
          <p>
            <strong>Partida: </strong>{bus.source}
          </p>
          <p>
            <strong>Destino: </strong>{bus.destination}
          </p>
          <p>
            <strong>Hora de partida: </strong>{bus.departureTime}
          </p>
          <p>
            <strong>Hora de llegada: </strong>{bus.arrivalTime}
          </p>
          <p>
            <strong>Precio: </strong>{bus.price}
          </p>
          <p>
            <strong>Type: </strong>{bus.busType}
          </p>
        </div>
        <div>
          <Button className="mb-3" variant="success" onClick={() => navigate(`/bus/${bus.id}`)}>
          Reservar ahora
          </Button>
          <h5>Asientos disponibles: {bus.availableSeats.length} </h5>
        </div>
      </BusItem>))}    </BusListContainer>
  )
}
