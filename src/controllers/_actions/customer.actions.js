import { customerConstants } from '../_constants'
import { customerService } from '../_services'

export const customerActions = {
  list,
  create,
  update,
  remove,
  select
}

function list(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await customerService.list(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res)).then(() => list())
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: customerConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: customerConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: customerConstants.FETCHING_FAILURE, error }
  }
}



function create(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await customerService.create(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res))
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: customerConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: customerConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: customerConstants.FETCHING_FAILURE, error }
  }
}



function update(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await customerService.update(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res))
      list()
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: customerConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: customerConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: customerConstants.FETCHING_FAILURE, error }
  }
}

function remove(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await customerService.remove(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res))
      list()
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: customerConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: customerConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: customerConstants.FETCHING_FAILURE, error }
  }
}

function select(param) {
  return dispatch => {
    if (param) dispatch(select(param))
    else dispatch(failure())

  }

  function select(data) {
    return { type: customerConstants.SELECTED_SUCCESS, data }
  }

  function failure(data) {
    return { type: customerConstants.SELECTED_FAILURE, data }
  }
}