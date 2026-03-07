import { useState, useEffect } from "react";

function AirportList() {
    const [airports, setAirports] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/airports", {
            headers: {
                Authorization: "Basic " + btoa("admin:admin123"),
            },
        })
            .then((response) => response.json())
            .then((data) => setAirports(data))
            .catch((error) => console.error("Error loading airports:", error));
    }, [])

    return (
        <>
            <h2>Airport list</h2>
            {airports.map((airport) => (
                <p key={airport.id} onClick={() => setSelectedAirport(airport)}>
                    {airport.code} - {airport.name}
                </p>
            ))}


            {
                selectedAirport && (<>
                    <h3>Selected airport</h3>
                    <p>Code: {selectedAirport.code}</p>
                    <p>Name: {selectedAirport.name}</p>
                    <p>City: {selectedAirport.city}</p>
                    <p>Country: {selectedAirport.country}</p>
                </>
                )
            }

        </>

    );
}

export default AirportList;