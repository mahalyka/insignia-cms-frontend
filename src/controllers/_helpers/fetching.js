//
import axios from 'axios'
import { SysObj } from '../../common/collections/system.js'

const staticPrefix = ''
const baseUrl = `${SysObj.SETTINGS.PREFIX_URL.default}${staticPrefix}`

export const fetching = {
  get,
  post,
  put,
  remove,
}

async function get(api, headers, callback) {
  try {
    const requestUrl = `${baseUrl}${api}`
    const requestOptions = {
      headers: !headers ? {} : headers
    }

    const response = await axios
      .get(`${requestUrl}`, requestOptions)
      .then(response => {
        if (callback) {
          callback()
          return response
        }

        return response
      })
      .catch(error => {
        if (error?.response?.status === 401) {
          return {
            // data: !response.data ? [] : response.data.data,
            status_code: error?.response?.status,
            message: error?.response?.data?.message ?? 'Unauthorized login!'
          }
        } else if (error.response) {
          return {
            // data: !response.data ? [] : response.data.data,
            status_code: error.response.data.response_code,
            message: error.response.data.message
          }
        } else if (!error.response) {
          return {
            // data: !response.data ? [] : response.data.data,
            status_code: error?.data?.response_code ?? error.status,
            message:
              error?.data?.message ??
              'There is a problem with your internal connection. Please try again later or call your provider'
          }
        } else {
          return {
            // data: !response.data ? [] : response.data.data,
            status_code: error.response.response_code,
            message: error.response.message
          }
        }
      })
    return response
  } catch (error) {
    console.log("🚀 ~ file: fetching.js ~ line 35 ~ get ~ error", error)
  }
}

async function post(api, headers, body, callback) {
  try {
    const requestUrl = `${baseUrl}${api}`
    const requestBody = !body ? {} : body
    const requestOptions = {
      headers: !headers ? {} : headers
    }

    const response = await axios
      .post(`${requestUrl}`, requestBody, requestOptions)
      .then(response => {
        if (callback) {
          callback()
          return response
        }

        return response
      })
      .catch(error => {
        console.log(error)
        if (error?.response?.status === 401) {
          return {
            // data: !response.data ? [] : response.data.data,
            status_code: error?.response?.status,
            message: error?.response?.data?.message ?? 'Unauthorized login!'
          }
        } else if (error.response) {
          return {
            // data: !response.data ? [] : response.data.data,
            status_code: error.response.data.response_code,
            message: error.response?.data?.message
          }
        } else if (!error.response) {
          return {
            // data: !response.data ? [] : response.data.data,
            status_code: error?.data?.response_code ?? error.status,
            message:
              error?.data?.message ??
              'There is a problem with your internal connection. Please try again later or call your provider'
          }
        } else {
          return {
            // data: !response.data ? [] : response.data.data,
            status_code: error.response?.response_code,
            message: error.response?.message
          }
        }
      })
    return response
  } catch (error) {
    console.log("🚀 ~ file: fetching.js ~ line 62 ~ post ~ error", error)
  }
}

async function put(api, headers, body, id, callback) {
  try {
    const requestUrl = `${baseUrl}${api}/${id}`
    const requestBody = !body ? {} : body
    const requestOptions = {
      headers: !headers ? {} : headers
    }

    const response = await axios
      .put(`${requestUrl}`, requestBody, requestOptions)
      .then(response => {
        if (callback) {
          callback()
          return response
        }

        return response
      })
      .catch(error => {
        console.log(error)
        if (error?.response?.status === 401) {
          return {
            status_code: error?.response?.status,
            message: error?.response?.data?.message ?? 'Unauthorized login!'
          }
        } else if (error.response) {
          return {
            status_code: error.response.data.status,
            message: error.response?.data?.message
          }
        } else if (!error.response) {
          return {
            status_code: error?.status,
            message:
              error?.data?.message ??
              'There is a problem with your internal connection. Please try again later or call your provider'
          }
        } else {
          return {
            status_code: error.response?.status,
            message: error.response?.message
          }
        }
      })
    return response
  } catch (error) {
    console.log("🚀 ~ file: fetching.js ~ line 62 ~ post ~ error", error)
  }
}

async function remove(api, headers, body, id, callback) {
  try {
    const requestUrl = `${baseUrl}${api}/${id}`
    const requestOptions = {
      headers: !headers ? {} : headers
    }

    const response = await axios
      .delete(`${requestUrl}`, {}, requestOptions)
      .then(response => {
        if (callback) {
          callback()
          return response
        }

        return response
      })
      .catch(error => {
        console.log(error)
        if (error?.response?.status === 401) {
          return {
            status_code: error?.response?.status,
            message: error?.response?.data?.message ?? 'Unauthorized login!'
          }
        } else if (error.response) {
          return {
            status_code: error.response?.status,
            message: error.response?.data?.message
          }
        } else if (!error.response) {
          return {
            status_code: error?.status,
            message:
              error?.data?.message ??
              'There is a problem with your internal connection. Please try again later or call your provider'
          }
        } else {
          return {
            status_code: error.response?.status,
            message: error.response?.message
          }
        }
      })
    return response
  } catch (error) {
    console.log("🚀 ~ file: fetching.js ~ line 62 ~ post ~ error", error)
  }
}