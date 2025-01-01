// Import necessary libraries and dependencies
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [searchCriteria, setSearchCriteria] = useState({ origin: '', destination: '', date: '' });
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const searchFlights = async () => {
    setLoading(true);
    setError(null);
    setFlightData(null);

    try {
      // Fetch data from Flight Offers Search API
      const searchResponse = await axios.get('https://test.api.amadeus.com/v1/shopping/flight-offers', {
        params: {
          originLocationCode: searchCriteria.origin,
          destinationLocationCode: searchCriteria.destination,
          departureDate: searchCriteria.date,
          adults: 1,
        },
        headers: {
          Authorization: 'ZPfLTruNDRBf2roLbzkvPeGR8GWAaj8d',
        },
      });

      const flightOffers = searchResponse.data.data;

      // Validate pricing and fetch CO2 emissions using Flight Offers Price API
      const priceResponse = await axios.post('https://test.api.amadeus.com/v1/shopping/flight-offers/pricing', 
        { data: flightOffers },
        {
          headers: {
            Authorization: 'ZPfLTruNDRBf2roLbzkvPeGR8GWAaj8d',
            'Content-Type': 'application/json',
          },
        }
      );

      setFlightData(priceResponse.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Flight Emission Calculator</h1>
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origin (IATA Code)</label>
          <input
            type="text"
            id="origin"
            name="origin"
            placeholder="Origin"
            value={searchCriteria.origin}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination (IATA Code)</label>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="Destination"
            value={searchCriteria.destination}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={searchCriteria.date}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={searchFlights}
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </div>

      {error && <div className="text-red-600 mt-4">Error: {error}</div>}

      {flightData && (
        <div className="mt-8 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Flight Options</h2>
          {flightData.data.map((flight, index) => (
            <div key={index} className="bg-white shadow-md rounded p-6 mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Itinerary {index + 1}</h3>
              {flight.itineraries.map((itinerary, idx) => (
                <div key={idx} className="mb-4">
                  <p className="text-sm text-gray-600">Departure: {itinerary.segments[0].departure.iataCode} at {itinerary.segments[0].departure.at}</p>
                  <p className="text-sm text-gray-600">Arrival: {itinerary.segments[0].arrival.iataCode} at {itinerary.segments[0].arrival.at}</p>
                  <p className="text-sm text-gray-600">CO2 Emissions: {itinerary.segments[0].co2Emissions[0].weight} {itinerary.segments[0].co2Emissions[0].weightUnit}</p>
                  <p className="text-sm text-gray-600">Cabin: {itinerary.segments[0].co2Emissions[0].cabin}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
