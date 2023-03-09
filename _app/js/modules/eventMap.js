import { mb_token } from "../env.js";

export default function eventMap() {
	const center = [13.404954, 52.520008];
	mapboxgl.accessToken = mb_token;
	
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/0yvz/clezq948o000401p6gjdtqxoc',
		center: center,
		zoom: 12 // starting zoom
	});
}