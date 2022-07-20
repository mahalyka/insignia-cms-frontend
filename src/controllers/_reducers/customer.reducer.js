import { customerConstants } from '../_constants';

export function customers(state = {}, action) {
    switch (action.type) {
        case customerConstants.FETCHING_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case customerConstants.FETCHING_SUCCESS:
            return {
                ...state,
                isLoading: false
            };
        case customerConstants.LIST_SUCCESS:
            return {
                items: action.data
            };
        case customerConstants.FETCHING_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state
    }
}

export function selectedCustomer(state = {}, action) {
    switch (action.type) {
        case customerConstants.SELECTED_SUCCESS:
            return {
                items: action.data,
            };
        case customerConstants.SELECTED_FAILURE:
            return {};
        default:
            return state
    }
}
