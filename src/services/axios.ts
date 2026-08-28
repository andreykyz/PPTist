import axios from 'axios'
import message from '@/utils/message'
import { i18n } from '@/i18n'

const t = i18n.global.t

const instance = axios.create({ timeout: 1000 * 300 })

instance.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 400) {
      return Promise.resolve(response.data)
    }

    message.error(t('message.unknownError'))
    return Promise.reject(response)
  },
  error => {
    if (error && error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        return Promise.reject(error.message)
      }
      else if (error.response.status >= 500) {
        return Promise.reject(error.message)
      }
      
      message.error(t('message.serverError'))
      return Promise.reject(error.message)
    }

    message.error(t('message.connectionFailed'))
    return Promise.reject(error)
  }
)

export default instance