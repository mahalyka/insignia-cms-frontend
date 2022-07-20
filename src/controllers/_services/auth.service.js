import { fetching } from '../_helpers/fetching'

export const authService = {
  login,
  logout
}

const APIMap = {
  login: '/api/users?populate=*',
  logout: '/api/users',
}

async function login(param) {
  const requestOptions = {}
  const requestBody = param
  const response = await fetching
    .post(APIMap.login, requestOptions, requestBody)
    .then(async () => {
      const res = await list(param)
      return res
    })
    .catch(error => {
      return error
    })
  return response
}

async function logout(param) {
  const requestOptions = {}
  const requestBody = param
  const response = await fetching
    .post(APIMap.logout, requestOptions, requestBody)
    .then(async () => {
      const res = await list(param)
      return res
    })
    .catch(error => {
      return error
    })
  return response
}

