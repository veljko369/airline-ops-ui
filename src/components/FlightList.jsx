import { useEffect, useState } from "react";

function FlightList() {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/flights", {
      headers: {
        Authorization: "Basic " + btoa("admin:admin123"),
      },
    })
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch((error) => console.error("Error loading flights:", error));
  }, []);

  return (
    <>
      <h2>Flight List</h2>

      {flights.map((flight) => (
        <p key={flight.id} onClick={() => setSelectedFlight(flight)}>
          {flight.flightNumber} - {flight.originAirport.code} to {flight.destinationAirport.code} - {flight.status}
        </p>
      ))}

      {selectedFlight && (
        <>
          <h3>Selected Flight</h3>

          <p>Flight Number: {selectedFlight.flightNumber}</p>
          <p>Departure: {selectedFlight.originAirport.city}</p>
          <p>Arrival: {selectedFlight.destinationAirport.city}</p>
          <p>Status: {selectedFlight.status}</p>
        </>
      )}
    </>
  );
}

export default FlightList;