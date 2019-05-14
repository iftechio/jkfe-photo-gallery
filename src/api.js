import axios from 'axios'
const prefix = 'https://app.jike.ruguoapp.com/1.0'

export const message = {
  history: ({ limit, loadMoreKey, topic }) => {
    return axios.post(`${prefix}/messages/history`, { limit, loadMoreKey, topic }).then(res => res.data)
  },
}

export const topic = {
  detail (topic) {
    return axios.get(`${prefix}/topics/getDetail?id=${topic}`).then(res => res.data)
  },
}
