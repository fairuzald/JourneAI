export const queryAi = (
  totalDays?: number,
  traveler?: string,
  destination?: string,
  startDate?: string,
  endDate?: string,
  budget?: string
) => {
  return `
  Please generate a ${totalDays}-day travel itinerary with a budget of ${budget} for ${traveler} visiting ${destination}. The itinerary should be in JSON format, covering the period from ${startDate} to ${endDate}. Structure the itinerary with the following details:
  
1. **Flights**: An array of flight options, each containing:
   - **airline**: The airline name.
   - **flightNumber**: The flight number.
   - **departureAirport**: Departure airport code.
   - **arrivalAirport**: Arrival airport code.
   - **departureTime**: Date and time of departure.
   - **arrivalTime**: Date and time of arrival.
   - **price**: Ticket price (including the currency symbol, e.g., $100).
   - **bookingUrl**: URL for booking the flight.

2. **Hotels**: An array of hotel options, each containing:
   - **name**: The hotel name.
   - **address**: The hotel address.
   - **price**: Price per night (including the currency symbol, e.g., $150).
   - **imageUrl**: URL to an image of the hotel.
   - **geoCoordinates**: Geographical coordinates (latitude and longitude).
   - **googleMapUrl**: URL to the hotel's location on Google Maps.
   - **rating**: Hotel rating.
   - **description**: Brief description of the hotel.
   - **nearbyAttractions**: An array of nearby attractions, each containing:
     - **name**: Attraction name.
     - **description**: Brief description.
     - **imageUrl**: URL to an image of the attraction.
     - **geoCoordinates**: Geographical coordinates (latitude and longitude).
     - **googleMapUrl**: URL to the attraction's location on Google Maps.
     - **price**: Entrance fee or ticket price (including the currency symbol, e.g., $20).
     - **travelTime**: Estimated travel time from the hotel to the attraction.

3. **Daily Itinerary**: An array representing the daily plans, each containing:
   - **title**: Day number (e.g., "Day 1").
   - **schedule**: An array of activities, each containing:
     - **time**: Time of the activity.
     - **activity**: Description of the activity.
     - **location**: Location of the activity.
     - **googleMapUrl**: URL to the activity's location on Google Maps.
     - **details**: Additional details about the activity.
     - **price**: Associated cost (including the currency symbol, e.g., $50).
     - **imageUrl**: URL to an image of the location (if available) or null.

Ensure the JSON is well-structured with appropriate keys and values for all necessary booking and planning information. If any image URL is invalid, omit it. I recommend using valid image URLs from reputable sources, such as Wikipedia. For example, use: wikipedia.org/wiki/Dago_Tea_House#/media/Berkas:Theehuis_Dago_1.JPG.
  `;
};
