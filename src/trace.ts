import axios from 'axios'

export async function trace(body) {
  return axios
    .post('http://localhost:3000/api/trace', body)
    .then(res => {
      console.log('trace done')
    })
    .catch(err => {
      console.log(err)
    })
}
