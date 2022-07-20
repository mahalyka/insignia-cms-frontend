import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.FETCHING_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case userConstants.FETCHING_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case userConstants.LIST_SUCCESS:
      return {
        items: action.data
      };
    case userConstants.FETCHING_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state
  }
}

export function selectedUser(state = {}, action) {
  switch (action.type) {
    case userConstants.SELECTED_SUCCESS:
      return {
        items: action.data,
      };
    case userConstants.SELECTED_FAILURE:
      return {};
    default:
      return state
  }
}
