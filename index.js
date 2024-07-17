const image='./logo.jpg'
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
        renderFlightResults(response.data.data,origin,destination);
    } catch (error) {
        console.error('Error fetching flight data:', error);
    }
}

function renderFlightResults(data,origin,destination) {
    const flightResultsDiv = document.getElementById('flight-results');

    // Clear previous results
    flightResultsDiv.innerHTML = '';
    const currentDate = new Date();
    const departureDate = new Date(currentDate);
    departureDate.setDate(currentDate.getDate() + 3);

    const arrivalDate = new Date(departureDate);
    arrivalDate.setDate(departureDate.getDate() + 5); // Example: arrival 5 days after departure

    // Format dates to YYYY-MM-DD format
    const formattedDepartureDate = departureDate.toISOString().split('T')[0];
    const formattedArrivalDate = arrivalDate.toISOString().split('T')[0];

    data.slice(0, 2).forEach(flight => { // Displaying only first 2 results as cards
        const partnerProgram = flight.partner_program;
        const minEconomyMiles = flight.min_economy_miles;
        const minEconomyTax = flight.min_economy_tax;
        const minBusinessMiles = flight.min_business_miles;
        const minBusinessTax = flight.min_business_tax;
        const minFirstMiles = flight.min_first_miles;
        const minFirstTax = flight.min_first_tax;

        const route = `${origin} -> ${destination}`;
        const dateRange = `${formattedDepartureDate} -  ${formattedArrivalDate}`;


        const flightCardDiv = document.createElement('div');
        flightCardDiv.classList.add('flight-card');
        const businessMiles = minBusinessMiles ? `<div class="outputDiv"><h1>${minBusinessMiles}</h1><span class="outputspan"> + $${minBusinessTax}</span></div>` : '<h1>N/A</h1>';

// Define economy miles and tax display logic
const economyMiles = minEconomyMiles ? `<div class="outputDiv"><h1>${minEconomyMiles}</h1><span class="outputspan"> + $${minEconomyTax}</span></div>` : `<h1>${minEconomyMiles}</h1>`;

// Define first miles and tax display logic
const firstMiles = minFirstMiles ? `<div class="outputDiv"><h1>${minFirstMiles}</h1><span class="outputspan"> + $${minFirstTax}</span></div>` : '<h1>N/A</h1>';

        flightCardDiv.innerHTML = `
    <img src=${image} alt="this is logo">
    <h2>${partnerProgram}</h2>
    <p>${route}</p>
    <p>${dateRange}</p>
    ${businessMiles}
    <span>Min Business Miles</span>
    ${economyMiles}
    <span>Min Economy Miles</span>
    ${firstMiles}
    <span>Min First Miles</span>
           
   
        `;

        flightResultsDiv.appendChild(flightCardDiv);
    });
 
}