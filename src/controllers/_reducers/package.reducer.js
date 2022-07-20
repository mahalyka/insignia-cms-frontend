import { packageConstants } from '../_constants';

export function packages(state = {}, action) {
    switch (action.type) {
        case packageConstants.FETCHING_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case packageConstants.FETCHING_SUCCESS:
            return {
                ...state,
                isLoading: false
            };
        case packageConstants.LIST_SUCCESS:
            return {
                items: action.data
            };
        case packageConstants.FETCHING_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state
    }
}

export function selectedPackage(state = {}, action) {
    switch (action.type) {
        case packageConstants.SELECTED_SUCCESS:
            return {
                items: action.data,
            };
        case packageConstants.SELECTED_FAILURE:
            return {};
        default:
            return state
    }
}
