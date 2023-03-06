import axios from 'axios'

export async function trace({data, token}: TraceParams) {
  return axios({
    method: 'post',
    url: 'https://www.calsott.com/api/trace',
    data,
    headers: {
      'x-access-token': token
    }
  }).catch(err => {
    console.log(err) // eslint-disable-line no-console
  })
}
