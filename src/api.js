import axios from 'axios'
const prefix = 'https://app.jike.ruguoapp.com/1.0/messages'

export const message = {
  history: ({ limit, loadMoreKey, topic }) => {
    return axios.post(`${prefix}/history`, { limit, loadMoreKey, topic }).then(res => res.data)
  },
}
