import FlightList from "./components/FlightList"
import AircraftList from "./components/AircraftList"
import { useState } from "react"

function App() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <>
      <h1>Airline Ops UI</h1>
      <button onClick={() => setActiveSection("flights")}>Flights</button>
      <button onClick={() => setActiveSection("aircraft")}>Aircraft</button>

      {activeSection === "flights" && <FlightList />}
      {activeSection === "aircraft" && <AircraftList />}
    </>
  )
}

export default App
