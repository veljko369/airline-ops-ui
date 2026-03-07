import { useState, useEffect } from "react";
import { getAirports, createAirport } from "../api/api";

function AirportList() {
    const [airports, setAirports] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState(null);

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    function loadAirports() {
        getAirports()
            .then((data) => setAirports(data))
            .catch((error) => console.error("Error loading airports:", error));
    }


    useEffect(() => {
        loadAirports();
    }, [])



    function handleCreateAirport(event) {
        event.preventDefault();

        const newAirport = {
            code,
            name,
            city,
            country,
        };

        createAirport(newAirport)
            .then(() => {
                loadAirports();
                setCode("");
                setName("");
                setCity("");
                setCountry("");
            })
            .catch((error) => console.error("Error creating airport:", error));
    }



    return (
        <>
            <h2>Create Airport</h2>

            <form onSubmit={handleCreateAirport}>


                <div>
                    <input
                        type="text"
                        placeholder="Code"
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                    />
                </div>

                <button type="submit">Create Airport</button>


            </form>




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