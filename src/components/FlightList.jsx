import { useEffect, useState } from "react";
import { getFlights, updateFlightStatus } from "../api/api";

function FlightList() {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);


  function loadFlights() {
    getFlights()
      .then((data) => setFlights(data))
      .catch((error) => console.error("Error loading flights:", error));
  }


  useEffect(() => {
    loadFlights();
  }, []);



  function handeUpdateFlightStatus(id, status) {
    updateFlightStatus(id, status)
      .then(() => {
        loadFlights();
        setSelectedFlight(null);
      })
      .catch((error) => console.error("Error updating status:", error));
  }






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

          <p>Change status:</p>

          <button onClick={() => handleUpdateFlightStatus(selectedFlight.id, "SCHEDULED")}>
            Set SCHEDULED
          </button>

          <button onClick={() => handleUpdateFlightStatus(selectedFlight.id, "BOARDING")}>
            Set BOARDING
          </button>

          <button onClick={() => handleUpdateFlightStatus(selectedFlight.id, "DELAYED")}>
            Set DELAYED
          </button>

        </>
      )}
    </>
  );
}

export default FlightList;