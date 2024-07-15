async function searchFlights() {
    console.log("search button clicked")
    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/json',

    };

    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const cabin = document.getElementById('cabin').value;

    const json_data = {
        'origin': origin,
        'destination': destination,
        'partnerPrograms': [
            'Air Canada',
            'United Airlines',
            'KLM',
            'Qantas',
            'American Airlines',
            'Etihad Airways',
            'Alaska Airlines',
            'Qatar Airways',
            'LifeMiles',
        ],
        'stops': 2,
        'departureTimeFrom': '2024-07-09T00:00:00Z',
        'departureTimeTo': '2024-10-07T00:00:00Z',
        'isOldData': false,
        'limit': 302,
        'offset': 0,
        'cabinSelection': [
            cabin,
        ],
        'date': '2024-07-09T12:00:17.796Z',
    };

    try {
        const response = await axios.post('https://cardgpt.in/apitest', json_data, { headers });
        console.log("API RESPONSE:",response)
        console.log("API DATA",response.data)
        renderFlightResults(response.data.data);
    } catch (error) {
        console.error('Error fetching flight data:', error);
    }
}

function renderFlightResults(data) {
    const flightResultsDiv = document.getElementById('flight-results');

    // Clear previous results
    flightResultsDiv.innerHTML = '';

    data.slice(0, 2).forEach(flight => { // Displaying only first 2 results as cards
        const partnerProgram = flight.partner_program;
        const minEconomyMiles = flight.min_economy_miles;
        const minEconomyTax = flight.min_economy_tax;
        const minBusinessMiles = flight.min_business_miles;
        const minBusinessTax = flight.min_business_tax;
        const minFirstMiles = flight.min_first_miles;
        const minFirstTax = flight.min_first_tax;

        const flightCardDiv = document.createElement('div');
        flightCardDiv.classList.add('flight-card');

        flightCardDiv.innerHTML = `
            <h3>${partnerProgram}</h3>
            <p>Economy: Miles - ${minEconomyMiles}, Tax - ${minEconomyTax}</p>
            <p>Business: Miles - ${minBusinessMiles || 'N/A'}, Tax - ${minBusinessTax || 'N/A'}</p>
            <p>First: Miles - ${minFirstMiles || 'N/A'}, Tax - ${minFirstTax || 'N/A'}</p>
        `;

        flightResultsDiv.appendChild(flightCardDiv);
    });
 
}