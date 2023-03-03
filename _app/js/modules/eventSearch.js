import { clientID } from "../env.js";

const genreId = 'KnvZfZ7vAvF';

export default function eventSearch() {
  const searchForm = document.querySelector('#search-form');
  searchForm.addEventListener('submit', handleSearchSubmit);

  async function handleSearchSubmit(event) {
    event.preventDefault();

    const cityInput = document.querySelector('#city-input');
    const resultsContainer = document.querySelector('#results-container');

    const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?';
    const apiKey = clientID;
    const city = cityInput.value;

    const url = `${baseUrl}city=${city}&genreId=${genreId}&apikey=${apiKey}`;

    console.log(url);

    const response = await fetch(url);
    const result = await response.json();

    const eventsArray = result._embedded ? result._embedded.events : [];

    console.log(eventsArray);

    resultsContainer.innerHTML = '';

    eventsArray.filter((event) => event.classifications[0].classificationId === genreId)
      .sort((a, b) => a.classifications[0].segment.name.localeCompare(b.classifications[0].segment.name))
      .forEach((event) => {
        const name = event.name;
        const dateStr = event.dates.start.localDate;
        const dateArr = dateStr.split('-');
        const date = `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
        const venue = event._embedded.venues[0].name;
        const imageUrl = event.images.find((image) => image.width > 500)?.url;
        const ticketUrl = event.url;
        const availableTickets = event.dates.status.code === 'onsale' ? 'Available tickets!' : 'Tickets not yet on sale';

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
          <a class="result-details__id" href="event.html?id=${event.id}">
            <div class="result-image">
              <img src="${imageUrl}" alt="${name}">
            </div>
            <div class="result-details">
              <h2 class="result-details__name">${name}</h2>
              <p class="result-details__date">When: ${date}</p>
              <p class="result-details__venue">Venue: ${venue}</p>
              <p class="result-details__tickets">${availableTickets}</p>
              <a class="result-details__button" href="${ticketUrl}" target="_blank">Buy Tickets</a>
            </div>
          </a>
        `;

        resultsContainer.appendChild(resultItem);
      });
  };
}