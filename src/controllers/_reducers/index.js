import { combineReducers } from 'redux'
import {
  customers,
  selectedCustomer
} from './customer.reducer'
import {
  packages,
  selectedPackage
} from './package.reducer'
import {
  users,
  selectedUser
} from './user.reducer'
import {
  orders,
  selectedOrder
} from './order.reducer'

const allReducers = combineReducers({
  customers,
  selectedCustomer,
  packages,
  selectedPackage,
  orders,
  selectedOrder,
  users,
  selectedUser,
})

const rootReducer = (state, action) => {
  if (action.type === 'USERS_LOGOUT') {
    state = {}
  }
  if (action.type === 'CLEAN_REST_DATA') {
    const { users } = state
    state = {
      users
    }
  }

  return allReducers(state, action)
}

export default rootReducer
