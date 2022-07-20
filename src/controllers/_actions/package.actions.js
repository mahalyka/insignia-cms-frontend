import { packageConstants } from '../_constants'
import { packageService } from '../_services'

export const packageActions = {
  list,
  create,
  update,
  remove,
  select
}

function list(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await packageService.list(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res)).then(() => list())
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: packageConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: packageConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: packageConstants.FETCHING_FAILURE, error }
  }
}



function create(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await packageService.create(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res))
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: packageConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: packageConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: packageConstants.FETCHING_FAILURE, error }
  }
}



function update(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await packageService.update(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res))
      list()
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: packageConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: packageConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: packageConstants.FETCHING_FAILURE, error }
  }
}

function remove(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await packageService.remove(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res))
      list()
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: packageConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: packageConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: packageConstants.FETCHING_FAILURE, error }
  }
}

function select(param) {
  return dispatch => {
    if (param) dispatch(select(param))
    else dispatch(failure())

  }

  function select(data) {
    return { type: packageConstants.SELECTED_SUCCESS, data }
  }

  function failure(data) {
    return { type: packageConstants.SELECTED_FAILURE, data }
  }
}