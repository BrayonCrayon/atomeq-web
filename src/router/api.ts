import axios from 'axios'


export const fetchElements = () => {
  // todo: create env variables for host
  return axios.get('http://localhost/api/elements')
}

export default {
  fetchElements
}
