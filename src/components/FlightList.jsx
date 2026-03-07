
function FlightList() {
  
    const flights = [
    {
      id: 1,
      flightNumber: 'JU123',
      departure: 'Belgrade',
      arrival: 'Paris',
      status: 'SCHEDULED',
    },
    {
      id: 2,
      flightNumber: 'JU456',
      departure: 'Belgrade',
      arrival: 'Rome',
      status: 'BOARDING',
    },
    {
      id: 3,
      flightNumber: 'JU789',
      departure: 'Belgrade',
      arrival: 'Berlin',
      status: 'DELAYED',
    },

  ];

  return (

    <>
      <h2>Flight List</h2>

      {flights.map((flight) => (
        
        <p key={flight.id}>
            {flight.flightNumber} - {flight.departure} to {flight.arrival} - {flight.status}
        </p>
        
      ))}
    </>

  );
}

export default FlightList;