import {
  ADD_DATA,
  RECEIVE_DATA,
  REMOVE_DATA,
  UPDATE_DATA,
  receiveData,
  addData,
  updateData,
  removeData,
  handleAddData,
  handleReceiveData,
  handleRemoveData,
  handleUpdateData
} from '../../actions/cashflow'
import {
  requestInitialData as mockrequestInitialData,
  requestAddData as mockRequestAddData,
  requestRemoveData as mockRequestRemoveData,
  requestUpdateData as mockRequestUpdateData
} from '../../api'
import { seedData } from '../../seed'

jest.mock('../../api')

afterEach(() => {
  jest.clearAllMocks()
})

// Plain actions
test('should test receiveData', () => {
  const initialData = [{ id: 1 }]
  const result = receiveData(initialData)

  expect(result.type).toBe(RECEIVE_DATA)
  expect(result.initialData).toBe(initialData)
})

test('should test addData', () => {
  const data = { id: 1 }
  const result = addData(data)

  expect(result.type).toBe(ADD_DATA)
  expect(result.data).toBe(data)
})

test('should test updateData', () => {
  const updatedData = { id: 1, name: 'Salary' }
  const result = updateData(updatedData)

  expect(result.type).toBe(UPDATE_DATA)
  expect(result.updatedData).toBe(updatedData)
})

test('should test removeData', () => {
  const id = 1
  const result = removeData(id)

  expect(result.type).toBe(REMOVE_DATA)
  expect(result.id).toBe(id)
})

// Thunks
test('should test handleReceiveData', async () => {
  const mockDispatch = jest.fn()

  mockrequestInitialData.mockResolvedValueOnce(seedData)
  await handleReceiveData()(mockDispatch)

  expect(mockrequestInitialData).toHaveBeenCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalledWith(receiveData(seedData))
})

test('should test handleAddData', async () => {
  const mockDispatch = jest.fn()
  const id = 3
  const data = { name: 'Shopping', type: 'expenditure', amount: 3000 }

  mockRequestAddData.mockResolvedValueOnce({ id, data })
  await handleAddData(data)(mockDispatch)

  expect(mockRequestAddData).toHaveBeenCalledTimes(1)
  expect(mockRequestAddData).toHaveBeenCalledWith(data)
  expect(mockDispatch).toHaveBeenCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalledWith(addData({ id, data }))
})

test('should test handleRemoveData', async () => {
  const mockDispatch = jest.fn()
  const id = seedData[1].id

  await handleRemoveData(id)(mockDispatch)

  expect(mockRequestRemoveData).toHaveBeenCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalledWith(removeData(id))
})

test('should test handleUpdateData', async () => {
  const mockDispatch = jest.fn()
  const id = seedData[1].id
  const updatedData = {
    id: seedData[1].id,
    name: 'Groceries List',
    amount: 5000,
    type: 'expenditure'
  }

  mockRequestUpdateData.mockResolvedValueOnce({ id, updatedData })
  await handleUpdateData(id, updatedData)(mockDispatch)

  expect(mockRequestUpdateData).toHaveBeenCalledTimes(1)
  expect(mockRequestUpdateData).toHaveBeenCalledWith(id, updatedData)
  expect(mockDispatch).toHaveBeenCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalledWith(updateData({ id, updatedData }))
})
