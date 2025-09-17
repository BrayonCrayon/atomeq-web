import axios from 'axios'

export const fetchElements = () => {
  return axios.get(`${import.meta.env.VITE_BASE_PATH}/api/elements`)
}

export default {
  fetchElements
}
