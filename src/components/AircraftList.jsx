import { useEffect, useState } from "react";

function AircraftList() {
    const [aircraft, setAircraft] = useState([]);
    const [selectedAircraft, setSelectedAircraft] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/aircraft", {
            headers: {
                Authorization: "Basic " + btoa("admin:admin123"),
            },
        })
            .then((response) => response.json())
            .then((data) => setAircraft(data))
            .catch((error) => console.error("Error loading aircraft:", error));
    }, []);

    return (
        <>
            <h2>Aircraft List</h2>

            {aircraft.map((plane) => (
                <p key={plane.id} onClick={() => setSelectedAircraft(plane)}>
                    {plane.registration} - {plane.manufacturer} {plane.type}
                </p>
            ))}

            {selectedAircraft && (
                <>
                    <h3>Selected Aircraft</h3>

                    <p>Registration: {selectedAircraft.registration}</p>
                    <p>Manufacturer: {selectedAircraft.manufacturer}</p>
                    <p>Type: {selectedAircraft.type}</p>
                    <p>Seating Capacity: {selectedAircraft.seatingCapacity}</p>
                    <p>Max Takeoff Weight: {selectedAircraft.maxTakeoffWeightKg} kg</p>
                </>
            )}
        </>
    );
}

export default AircraftList;