import axios from "axios"
const baseURL = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(res => res.data)
}

const create = (newPersonObject) => {
  const request = axios.post(baseURL, newPersonObject)
  return request.then(res => res.data)
}

const update = (id, newPersonObject) => {
  const request = axios.put(`${baseURL}/${id}`, newPersonObject)
  return request.then( res => res.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then( res => res.data)
}

export default {getAll, create, update, remove}