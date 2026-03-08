const BASE_URL = "http://localhost:8080";
const AUTH_HEADER = "Basic " + btoa("admin:admin123");


export function getFlights() {
    return fetch(`${BASE_URL}/api/flights`, {
        headers: {
            Authorization: AUTH_HEADER,
        },
    }).then((response) => response.json());
}


export function updateFlightStatus(id, status) {
    return fetch(`${BASE_URL}/api/flights/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: AUTH_HEADER,
        },
        body: JSON.stringify({ status: status }),
    }).then((response) => response.json());
}



export function getAircraft() {
    return fetch(`${BASE_URL}/api/aircraft`, {
        headers: {
            Authorization: AUTH_HEADER,
        },
    }).then((response) => response.json());
}



export function getAirports() {
    return fetch(`${BASE_URL}/api/airports`, {
        headers: {
            Authorization: AUTH_HEADER,
        },
    }).then((response) => response.json());
}



export function createAirport(airportData) {
    return fetch(`${BASE_URL}/api/airports`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: AUTH_HEADER,
        },
        body: JSON.stringify(airportData),
    }).then((response) => response.json);
}


export function createAircraft(aircraftData) {
    return fetch(`${BASE_URL}/api/aircraft`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: AUTH_HEADER,
        },
        body: JSON.stringify(aircraftData),
    }).then((response) => response.json());
}



export function deleteAircraft(id) {
    return fetch(`${BASE_URL}/api/aircraft/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: AUTH_HEADER,
        },
    })
}


export function deleteFlight(id) {
    return fetch(`${BASE_URL}/api/flights/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: AUTH_HEADER,
        },
    });
}