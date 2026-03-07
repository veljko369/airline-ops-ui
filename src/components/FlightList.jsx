import { useState } from "react";

function FlightList() {
  
    const flights = [
    {
      id: 1,
      flightNumber: 'JU123',
      departure: 'Belgrade',
      arrival: 'Paris',
      status: 'SCHEDULED',
    },
    {
      id: 2,
      flightNumber: 'JU456',
      departure: 'Belgrade',
      arrival: 'Rome',
      status: 'BOARDING',
    },
    {
      id: 3,
      flightNumber: 'JU789',
      departure: 'Belgrade',
      arrival: 'Berlin',
      status: 'DELAYED',
    },

  ];

  const [selectedFlight, setSelectedFlight] = useState(null);

  return (

    <>
      <h2>Flight List</h2>

      {flights.map((flight) => (
        <p key={flight.id} onClick={() => setSelectedFlight(flight)}>
            {flight.flightNumber} - {flight.departure} to {flight.arrival} - {flight.status}
        </p>
      ))}

       {selectedFlight && (
        <>
          <h3>Selected Flight</h3>

          <p>Flight Number: {selectedFlight.flightNumber}</p>
          <p>Departure: {selectedFlight.departure}</p>
          <p>Arrival: {selectedFlight.arrival}</p>
          <p>Status: {selectedFlight.status}</p>
        </>
      )}
      
    </>

  );
}

export default FlightList;