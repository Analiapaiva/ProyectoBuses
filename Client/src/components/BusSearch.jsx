import React, { useState } from "react";
import styled from "styled-components";
import { locations } from "../utils";
import { Form, Button } from "react-bootstrap";
import BusList from "./BusList";
import { Buses } from '../utils'
import { useNavigate } from "react-router-dom";




const Container = styled.div`
    background-color: white;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
`;

export default function BusSearch({ searchState, setSearchState }) {
    const hoy = new Date().toISOString().split('T')[0];
    const navigate = useNavigate()

    const [filteresBus, setFilteredBus] = useState(null)

    const handleSearch = () => {
        setFilteredBus(
            Buses.filter(
            (data) =>
            data.source === searchState.from &&
            data.destination === searchState.to &&
            data.availableDates.includes(searchState.date)))
    }


    return (
        <Container>
            <h2 className="mb-3">Buscar Autobuses</h2>
            <div className="d-flex flex-column align-items-center">
                <Form.Select
                    className="mb-3 width-300"
                    value={searchState.from}
                    onChange={(e) =>
                        setSearchState((prevState) => ({
                            ...prevState,
                            from: e.target.value
                        }))
                    }
                >
                    {locations.map((data) => (
                        <option key={`${data}-source`} value={data}>
                            {data}
                        </option>
                    ))}
                </Form.Select>
                <Form.Select
                    className="mb-3 width-300"
                    value={searchState.to}
                    onChange={(e) =>
                        setSearchState((prevState) => ({
                            ...prevState,
                            to: e.target.value
                        }))
                    }
                >
                    {locations.map((data) => (
                        <option key={`${data}-destination`} value={data}>
                            {data}
                        </option>
                    ))}
                </Form.Select>
                <input className="form-control mb-3 width-300"
                    type="date" 
                    min={hoy}
                    value={searchState.date}
                    onChange={(e) =>
                        setSearchState((prevState) => ({
                            ...prevState,
                            date: e.target.value,
                        }))
                    }
                />
            </div>
            <div className="m">
            <Button variant="primary" className="me-3" onClick={handleSearch}>
             Buscar
            </Button>
            <Button variant="primary" className="ms-3 px-3" onClick={() => navigate("/RegisBus")}>
             Crear     
            </Button>

            </div>
        {filteresBus && filteresBus?.length > 0 &&  
        (<BusList buses={filteresBus}/>
        )}
        {filteresBus && filteresBus.length <1 && <h3>No se encontraron Buses</h3>}
        </Container>
    );
}
