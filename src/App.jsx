import FlightList from "./components/FlightList"
import AircraftList from "./components/AircraftList"
import AirportList from "./components/AirportList";
import { useState } from "react"

function App() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <>
      <h1>Airline Ops UI</h1>
      <button onClick={() => setActiveSection("flights")}>Flights</button>
      <button onClick={() => setActiveSection("aircraft")}>Aircraft</button>
      <button onClick={() => setActiveSection("airports")}>Airports</button>

      {activeSection === "flights" && <FlightList />}
      {activeSection === "aircraft" && <AircraftList />}
      {activeSection === "airports" && <AirportList />}
    </>
  )
}

export default App
