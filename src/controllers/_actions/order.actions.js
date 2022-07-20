import { orderConstants } from '../_constants'
import { orderService } from '../_services'

export const orderActions = {
  list,
  create,
  update,
  remove,
  select
}

function list(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await orderService.list(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res)).then(() => list())
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: orderConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: orderConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: orderConstants.FETCHING_FAILURE, error }
  }
}



function create(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await orderService.create(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res))
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: orderConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: orderConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: orderConstants.FETCHING_FAILURE, error }
  }
}



function update(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await orderService.update(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res))
      list()
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: orderConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: orderConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: orderConstants.FETCHING_FAILURE, error }
  }
}

function remove(param) {
  return async dispatch => {
    dispatch(request())
    const res = (await orderService.remove(param)) ?? {}
    if (res.status_code === 200) {
      dispatch(success(res))
      list()
    } else {
      dispatch(failure(res), param)
    }
  }

  function request() {
    return { type: orderConstants.FETCHING_REQUEST }
  }
  function success(data) {
    return { type: orderConstants.LIST_SUCCESS, data }
  }
  function failure(error, param) {
    return { type: orderConstants.FETCHING_FAILURE, error }
  }
}

function select(param) {
  return dispatch => {
    if (param) dispatch(select(param))
    else dispatch(failure())

  }

  function select(data) {
    return { type: orderConstants.SELECTED_SUCCESS, data }
  }

  function failure(data) {
    return { type: orderConstants.SELECTED_FAILURE, data }
  }
}