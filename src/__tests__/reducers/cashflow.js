import {
  ADD_DATA,
  RECEIVE_DATA,
  REMOVE_DATA,
  UPDATE_DATA
} from '../../actions/cashflow'
import cashflowReducer from '../../reducers/cashflow'
import { seedData } from '../../seed'

test('should setup initial default empty state', () => {
  const action = { type: '@@INIT' }
  const state = cashflowReducer(undefined, action)

  expect(state).toEqual([])
})

test('should receive initial existing data', () => {
  const initialData = seedData
  const action = { type: RECEIVE_DATA, initialData }
  const state = cashflowReducer(initialData, action)

  expect(state).toEqual(initialData)
})

test('should add a cashflow item', () => {
  const data = { id: 3, name: 'Shopping', type: 'expenditure', amount: 3000 }
  const action = { type: ADD_DATA, data }
  const state = cashflowReducer(seedData, action)

  expect(state).toEqual([...seedData, data])
})

test('should remove a cashflow item', () => {
  const id = 2
  const action = { type: REMOVE_DATA, id }
  const state = cashflowReducer(seedData, action)

  expect(state).toEqual([seedData[0]])
})

test('should not remove a cashflow item for invalid id', () => {
  const id = 'invalid'
  const action = { type: REMOVE_DATA, id }
  const state = cashflowReducer(seedData, action)

  expect(state).toEqual(seedData)
})

test('should update an existing cashflow item', () => {
  const updatedData = {
    id: seedData[1].id,
    name: 'Groceries List',
    amount: 5000,
    type: 'expenditure'
  }
  const action = { type: UPDATE_DATA, updatedData }
  const state = cashflowReducer(seedData, action)

  expect(state).toEqual([seedData[0], updatedData])
})

test('should not update any cashflow item for invalid id', () => {
  const updatedData = {
    id: 'invalid',
    name: 'Groceries List',
    type: 'expenditure',
    amount: 5000
  }
  const action = { type: UPDATE_DATA, updatedData }
  const state = cashflowReducer(seedData, action)

  expect(state).toEqual(seedData)
})
