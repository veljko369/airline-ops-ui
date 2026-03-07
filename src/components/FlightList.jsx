import { useEffect, useState } from "react";

function FlightList() {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);


  function loadFlights() {
    fetch("http://localhost:8080/api/flights", {
      headers: {
        Authorization: "Basic " + btoa("admin:admin123"),
      },
    })
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch((error) => console.error("Error loading flights:", error));
  }


  useEffect(() => {
    loadFlights();
  }, []);



  function updateFlightStatus(id, status) {
    fetch(`http://localhost:8080/api/flights/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("admin:admin123"),
      },
      body: JSON.stringify({ status: status }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update status");
        }
        return response.json();
      })
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

          <button onClick={() => updateFlightStatus(selectedFlight.id, "SCHEDULED")}>
            Set SCHEDULED
          </button>

          <button onClick={() => updateFlightStatus(selectedFlight.id, "BOARDING")}>
            Set BOARDING
          </button>

          <button onClick={() => updateFlightStatus(selectedFlight.id, "DELAYED")}>
            Set DELAYED
          </button>

        </>
      )}
    </>
  );
}

export default FlightList;