import { orderConstants } from '../_constants';

export function orders(state = {}, action) {
    switch (action.type) {
        case orderConstants.FETCHING_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case orderConstants.FETCHING_SUCCESS:
            return {
                ...state,
                isLoading: false
            };
        case orderConstants.LIST_SUCCESS:
            return {
                items: action.data
            };
        case orderConstants.FETCHING_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state
    }
}

export function selectedOrder(state = {}, action) {
    switch (action.type) {
        case orderConstants.SELECTED_SUCCESS:
            return {
                items: action.data,
            };
        case orderConstants.SELECTED_FAILURE:
            return {};
        default:
            return state
    }
}
