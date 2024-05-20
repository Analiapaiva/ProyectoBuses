import { useState } from 'react';
import Login from './components/Login';
//import Signup from './Signup';
import Header from './components/Header';
import BusSearch from './components/BusSearch';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { locations } from './utils';
import BusLayout from './components/BusLayout';
import BookingForm from './components/BookingForm';
import Registro from './components/Registro';
import RegisBus from './components/RegisBus';


function App() {
  const [searchState, setSearchState] = useState({
    from: locations[0],
    to: locations[2],
    date: '',
  });


  const [selectedSeats, setSelectedSeats] = useState([])
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Registro' element={<Registro/>}></Route>
          <Route path='/BusSearch' element={<BusSearch searchState={searchState} setSearchState={setSearchState} />} />
          <Route path='/RegisBus' element={<RegisBus/>}></Route>


          <Route path='/bus/:id' element={<BusLayout selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />} />

          <Route path='/bus/book'
            element={<BookingForm
              selectedSeats={selectedSeats}
              searchState={searchState}
              setSelectedSeats={setSelectedSeats}
              setSearchState={setSearchState}

            />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
