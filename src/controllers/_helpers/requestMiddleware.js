export default function requestMiddleware({ dispatch, getState }) {
  return next => action => {
    const returnValue = next(action)
    // const token = getState().authentication?.user?.token
    return returnValue
  }
}
