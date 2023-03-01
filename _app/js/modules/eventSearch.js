import { clientID } from "../env";

export default function eventsSearch() {

	const apiKey = clientID;
	const city = cityInput.value;
	const subGenreId = KZazBEonSMnZfZ7vA1E; // Id for dance/elektronika events
	const url = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&subGenreiD=${subGenreId}=&apikey=${apiKey}`;

}