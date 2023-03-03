import { clientID } from '../env.js';

export default function eventSearch() {
  const searchForm = document.querySelector('#search-form');
  const cityInput = document.querySelector('#city-input');
  const resultsContainer = document.querySelector('#results-container');

  // Function to render events as cards
  function renderEvents(events) {
    resultsContainer.innerHTML = '';
    if (events.length === 0) {
      resultsContainer.innerHTML = '<p>No events found</p>';
      return;
    }

    events.forEach((event) => {
      const imageUrl = event.images.find((image) => image.width > 500)?.url;
      const name = event.name;
      const date = new Date(event.dates.start.localDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      const venue = event._embedded.venues[0].name;
      const availableTickets = `Tickets: ${event.dates.status.code === 'offsale' ? 'Sold Out' : 'Available'}`;
      const ticketUrl = event.url;

      const eventCard = `
        <div class="event-card">
          <div class="event-card__image" style="background-image: url(${imageUrl})"></div>
          <div class="event-card__details">
            <h2 class="event-card__name">${name}</h2>
            <p class="event-card__date">When: ${date}</p>
            <p class="event-card__venue">Venue: ${venue}</p>
            <p class="event-card__tickets">${availableTickets}</p>
            <a class="event-card__button" href="${ticketUrl}" target="_blank">Buy Tickets</a>
          </div>
        </div>
      `;

      resultsContainer.insertAdjacentHTML('beforeend', eventCard);
    });
  }

  // Function to fetch events from Ticketmaster API and filter by genre
  async function filterEvents(city, genreId) {
    const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?';
    const apiKey = clientID;
    const url = `${baseUrl}city=${city}&genreId=${genreId}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      const eventsArray = result._embedded.events;

      const filteredEvents = eventsArray.filter((event) => {
        return event.classifications.some((classification) => classification.segment.name === 'Music');
      });

      return filteredEvents;
    } catch (error) {
      console.log(error);
    }
  }

  // Event listener for search form submit
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();
    const genreId = 'KnvZfZ7vAvF'; // Dance/Electronic genre ID

    const filteredEvents = await filterEvents(city, genreId);
    renderEvents(filteredEvents);
  });
}
