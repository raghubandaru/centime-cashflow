import { createStore } from 'redux'

import cashflowReducer from './reducers/cashflow'
import middleware from './middleware'

const store = createStore(cashflowReducer, middleware)

export default store
