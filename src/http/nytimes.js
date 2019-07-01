import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc/topstories/v2';

// TODO: if this repo were public, this would be an environment variable
const API_KEY = 'EUCW2iEEtjAgTmh6xGvd9R3sQwa47eik';

const getTopStoriesFromSection = async section => axios.get(`${BASE_URL}/${section}.json?api-key=${API_KEY}`);

export default { getTopStoriesFromSection };
