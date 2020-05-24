import {
  RECEIVE_DATA,
  ADD_DATA,
  UPDATE_DATA,
  REMOVE_DATA
} from '../actions/cashflow'

const initialState = []

function cashflowReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.initialData

    case ADD_DATA:
      return state.concat(action.data)

    case UPDATE_DATA:
      return state.map(data => {
        if (data.id === action.updatedData.id) {
          return action.updatedData
        } else {
          return data
        }
      })

    case REMOVE_DATA:
      return state.filter(data => data.id !== action.id)

    default:
      return state
  }
}

export default cashflowReducer
