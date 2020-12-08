const API_URL = 'http://localhost:3000/api';
const END_POINTS = {
  ports: '/ports'
};

const getHarbors = (payload) => {
  let url = `${API_URL}${END_POINTS['ports']}`;
  let queryParams = `?type=${payload.portType}&maxlat=${payload.maxlat}&minlat=${payload.minlat}&minlon=${payload.minlon}&maxlon=${payload.maxlon}`;

  return fetch(`${url}${queryParams}`);
}

const ApiService = {
  getHarbors: getHarbors
}

export default ApiService;
