import axios from 'axios'
import config from '../config/api_config'

const uuidv4 = require('uuid/v4')

class apiService {
  constructor (url, headers) {
    this.commonHeaders = headers

    this.axios = axios.create({
      baseURL: url
    })

    /*
         * Request Interceptor
         */
    this.axios.interceptors.request.use(
      function (config) {
        config.headers.request_id = uuidv4()

        //let originalRequest = config

        let token_expiry = localStorage.getItem('token_expiry')
        let now = new Date()

        // console.log('time_now____: '+now);
        // console.log('token_expiry: '+token_expiry);

        if (token_expiry < now) {
          // console.log('yes, token has expired');
        } else {
          // console.log('no, token has not expired');
        }

        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    /*
         * Response interceptor
         */
    this.axios.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        //console.log(error)


        if (error.response && error.response.status === 401) {
          console.log('Authentication error of 401')
          return Promise.reject(error.response);
          //window.localStorage.clear('id_token')
          //window.localStorage.clear('user')
          //window.localStorage.clear('token_expiry')
          //window.location = '/login'
        }

        if (error.response && error.response.status === 400) {
          console.log('validation error status of 400')

          return Promise.reject(error.response)
        }

        if (error.response && error.response.status === 404) {
          return Promise.reject(error.response)
        }

        /**
        if (error.response && error.response.data.status === 'validation-error') {
          console.log('validation error ...')
          let output = ''
          let message = error.response.data.result

          /**
          if (typeof message === 'object' && message !== null) {
            for (var property in message) {
              if (message.hasOwnProperty(property)) {
                message[property].forEach(error => {
                  output += error + ' '
                })
              }
            }
          }
          return Promise.reject(error.response)
        } else {
          return Promise.reject(error)
        }**/

        return Promise.reject(error)
      }
    )
  }

  checkTokenExpiry (token_expiry) {
    let now = new Date()

    if (token_expiry < now) {
      console.log('yes, token has expired')
    } else {
      console.log('no, token is not expired')
    }
  }

  call (method, path, payload, headers, callback = null) {
    let config = {
      url: path,
      method: method,
      headers: Object.assign({}, this.commonHeaders, headers)
    }

    switch (method) {
      case 'PUT':
      case 'POST':
        config.data = JSON.stringify(payload)
        break
      default:
        break
    }

    if (typeof callback === 'function') {
      return callback(
        this.axios.request(config)
      )
    } else {
      return this.axios.request(config)
    }
  }

  upload (path, field, file, headers = null) {
    let data = new FormData()
    data.append(field, file)

    let config = {
      headers: Object.assign({}, this.commonHeaders, headers)
    }

    return this.axios.post(path, data, config)
  }

  get (path, headers = null) {
    return this.call('GET', path, null, headers)
  }

  post (path, payload, headers = null) {
    return this.call('POST', path, payload, headers)
  }

  put (path, payload, headers = null) {
    return this.call('PUT', path, payload, headers)
  }

  delete (path, headers = null) {
    return this.call('DELETE', path, null, headers)
  }

  setAuthToken (token) {
    if (token) {
      this.commonHeaders.Authorization = 'Bearer ' + token
    }
  }
}

let commonHeaders = config.headers

if (config.demo) {
  commonHeaders.demo = 'demo'
}

let api = new apiService(config.baseUrl, commonHeaders)

export default api
