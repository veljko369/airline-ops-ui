import { useEffect, useState } from "react";
import { getAircraft, createAircraft, deleteAircraft } from "../api/api";

function AircraftList() {
    const [aircraft, setAircraft] = useState([]);
    const [selectedAircraft, setSelectedAircraft] = useState(null);

    const [manufacturer, setManufacturer] = useState("");
    const [aircraftType, setAircraftType] = useState("");
    const [registration, setRegistration] = useState("");
    const [seatingCapacity, setSeatingCapacity] = useState("");
    const [maxTakeoffWeightKg, setMaxTakeoffWeightKg] = useState("");

    function loadAircraft() {
        getAircraft()
            .then((data) => setAircraft(data))
            .catch((error) => console.error("Error loading aircraft:", error));
    }

    useEffect(() => {
        loadAircraft();
    }, []);

    function handleCreateAircraft(event) {
        event.preventDefault();

        const newAircraft = {
            manufacturer,
            type: aircraftType,
            registration,
            seatingCapacity: Number(seatingCapacity),
            maxTakeoffWeightKg: Number(maxTakeoffWeightKg),
        };

        createAircraft(newAircraft)
            .then(() => {
                loadAircraft();
                setManufacturer("");
                setAircraftType("");
                setRegistration("");
                setSeatingCapacity("");
                setMaxTakeoffWeightKg("");
                setSelectedAircraft(null);
            })
            .catch((error) => console.error("Error creating aircraft:", error));
    }

    function handleDeleteAircraft(id) {
        deleteAircraft(id)
            .then(() => {
                loadAircraft();
                setSelectedAircraft(null);
            })
            .catch((error) => console.error("Error deleting aircraft:", error));
    }

    return (
        <>
            <h2>Create Aircraft</h2>

            <form onSubmit={handleCreateAircraft}>
                <div>
                    <input
                        type="text"
                        placeholder="Manufacturer"
                        value={manufacturer}
                        onChange={(event) => setManufacturer(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Type"
                        value={aircraftType}
                        onChange={(event) => setAircraftType(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Registration"
                        value={registration}
                        onChange={(event) => setRegistration(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="number"
                        placeholder="Seating Capacity"
                        value={seatingCapacity}
                        onChange={(event) => setSeatingCapacity(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="number"
                        placeholder="Max Takeoff Weight (kg)"
                        value={maxTakeoffWeightKg}
                        onChange={(event) => setMaxTakeoffWeightKg(event.target.value)}
                    />
                </div>

                <button type="submit">Create Aircraft</button>
            </form>

            <h2>Aircraft List</h2>

            {aircraft.map((plane) => (
                <p key={plane.id} onClick={() => setSelectedAircraft(plane)}>
                    {plane.registration} - {plane.manufacturer} {plane.type}
                </p>
            ))}

            <h3>Selected Aircraft:</h3>

            {selectedAircraft && (
                <>
                    <p>Registration: {selectedAircraft.registration}</p>
                    <p>Manufacturer: {selectedAircraft.manufacturer}</p>
                    <p>Type: {selectedAircraft.type}</p>
                    <p>Seating Capacity: {selectedAircraft.seatingCapacity}</p>
                    <p>Max Takeoff Weight: {selectedAircraft.maxTakeoffWeightKg} kg</p>

                    <button onClick={() => handleDeleteAircraft(selectedAircraft.id)}>
                        Delete Aircraft
                    </button>
                </>
            )}
        </>
    );
}

export default AircraftList;