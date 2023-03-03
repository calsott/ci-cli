import axios from 'axios'

export async function trace(body) {
  return axios.post('https://www.calsott.com/api/trace', body).catch(err => {
    console.log(err) // eslint-disable-line no-console
  })
}
