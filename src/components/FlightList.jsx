import { useEffect, useState } from "react";
import { getFlights, updateFlightStatus, deleteFlight, createFlight } from "../api/api";
import { getAirports, getAircraft } from "../api/api";

function FlightList() {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);



  const [flightNumber, setFlightNumber] = useState("");
  const [originAirportId, setOriginAirportId] = useState("");
  const [destinationAirportId, setDestinationAirportId] = useState("");
  const [aircraftId, setAircraftId] = useState("");

  const [scheduledDeparture, setScheduledDeparture] = useState("");
  const [scheduledArrival, setScheduledArrival] = useState("");

  const [plannedPayloadKg, setPlannedPayloadKg] = useState("");
  const [actualPayloadKg, setActualPayloadKg] = useState("");
  const [fuelKg, setFuelKg] = useState("");

  const [status, setStatus] = useState("SCHEDULED");
  const [gate, setGate] = useState("");



  const [airports, setAirports] = useState([]);
  const [aircraft, setAircraft] = useState([]);





  function loadFlights() {
    getFlights()
      .then((data) => setFlights(data))
      .catch((error) => console.error("Error loading flights:", error));
  }


  useEffect(() => {
    loadFlights();

    getAirports().then(setAirports);
    getAircraft().then(setAircraft);
  }, []);



  function handeUpdateFlightStatus(id, status) {
    updateFlightStatus(id, status)
      .then(() => {
        loadFlights();
        setSelectedFlight(null);
      })
      .catch((error) => console.error("Error updating status:", error));
  }




  function handleDeleteFlight(id) {
    deleteFlight(id)
      .then(() => {
        loadFlights();
        setSelectedFlight(null);
      })
      .catch((error) => console.error("Error deleting flight:", error));
  }




  function handleCreateFlight(event) {
    event.preventDefault();

    const newFlight = {
      flightNumber,
      originAirportId: Number(originAirportId),
      destinationAirportId: Number(destinationAirportId),
      scheduledDeparture,
      scheduledArrival,
      aircraftId: Number(aircraftId),
      plannedPayloadKg: Number(plannedPayloadKg),
      actualPayloadKg: Number(actualPayloadKg),
      fuelKg: Number(fuelKg),
      status,
      gate,
    };

    createFlight(newFlight)
      .then(() => {
        loadFlights();

        setFlightNumber("");
        setOriginAirportId("");
        setDestinationAirportId("");
        setScheduledDeparture("");
        setScheduledArrival("");
        setAircraftId("");
        setPlannedPayloadKg("");
        setActualPayloadKg("");
        setFuelKg("");
        setStatus("SCHEDULED");
        setGate("");
      })
      .catch((error) => console.error("Error creating flight:", error));
  }





  return (
    <>


      <h2>Create Flight</h2>

      <form onSubmit={handleCreateFlight}>
        <div>
          <input
            type="text"
            placeholder="Flight Number"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
          />
        </div>

        <div>
          <select
            value={originAirportId}
            onChange={(e) => setOriginAirportId(e.target.value)}
          >
            <option value="">Select origin airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.code} - {airport.city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={destinationAirportId}
            onChange={(e) => setDestinationAirportId(e.target.value)}
          >
            <option value="">Select destination airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.code} - {airport.city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="datetime-local"
            value={scheduledDeparture}
            onChange={(e) => setScheduledDeparture(e.target.value)}
          />
        </div>

        <div>
          <input
            type="datetime-local"
            value={scheduledArrival}
            onChange={(e) => setScheduledArrival(e.target.value)}
          />
        </div>

        <div>
          <select
            value={aircraftId}
            onChange={(e) => setAircraftId(e.target.value)}
          >
            <option value="">Select aircraft</option>
            {aircraft.map((plane) => (
              <option key={plane.id} value={plane.id}>
                {plane.registration} - {plane.manufacturer} {plane.type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="number"
            placeholder="Planned Payload (kg)"
            value={plannedPayloadKg}
            onChange={(e) => setPlannedPayloadKg(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Actual Payload (kg)"
            value={actualPayloadKg}
            onChange={(e) => setActualPayloadKg(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Fuel (kg)"
            value={fuelKg}
            onChange={(e) => setFuelKg(e.target.value)}
          />
        </div>

        <div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="SCHEDULED">SCHEDULED</option>
            <option value="BOARDING">BOARDING</option>
            <option value="DELAYED">DELAYED</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Gate"
            value={gate}
            onChange={(e) => setGate(e.target.value)}
          />
        </div>

        <button type="submit">Create Flight</button>
      </form>



      <h2>Flight List</h2>

      {flights.map((flight) => (
        <p key={flight.id} onClick={() => setSelectedFlight(flight)}>
          {flight.flightNumber} - {flight.originAirport.code} to {flight.destinationAirport.code} - {flight.status}
        </p>
      ))}




      <h3>Selected Flight:</h3>

      {selectedFlight && (
        <>

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

          <p>Delete flight:</p>
          <button onClick={() => handleDeleteFlight(selectedFlight.id)}>
            Delete
          </button>

        </>
      )}
    </>
  );
}

export default FlightList;