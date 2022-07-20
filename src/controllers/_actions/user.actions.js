import { userConstants } from '../_constants'
import { userService } from '../_services'

export const userActions = {
  list,
  create,
  update,
  remove,
  select
}

function list(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await userService.list(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res)).then(() => list())
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: userConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: userConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: userConstants.FETCHING_FAILURE, error }
  }
}



function create(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await userService.create(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res))
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: userConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: userConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: userConstants.FETCHING_FAILURE, error }
  }
}



function update(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await userService.update(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res))
      list()
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: userConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: userConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: userConstants.FETCHING_FAILURE, error }
  }
}

function remove(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await userService.remove(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res))
      list()
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: userConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: userConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: userConstants.FETCHING_FAILURE, error }
  }
}

function select(param) {
  return dispatch => {
    if (param) dispatch(select(param))
    else dispatch(failure())

  }

  function select(data) {
    return { type: userConstants.SELECTED_SUCCESS, data }
  }

  function failure(data) {
    return { type: userConstants.SELECTED_FAILURE, data }
  }
}