import {
  requestInitialData,
  requestAddData,
  requestUpdateData,
  requestRemoveData
} from '../api'

export const RECEIVE_DATA = 'RECEIVE_DATA'
export const ADD_DATA = 'ADD_DATA'
export const REMOVE_DATA = 'REMOVE_DATA'
export const UPDATE_DATA = 'UPDATE_DATA'

export function receiveData(initialData) {
  return {
    type: RECEIVE_DATA,
    initialData
  }
}

export function addData(data) {
  return {
    type: ADD_DATA,
    data
  }
}

export function removeData(id) {
  return {
    type: REMOVE_DATA,
    id
  }
}

export function updateData(updatedData) {
  return {
    type: UPDATE_DATA,
    updatedData
  }
}

export function handleReceiveData() {
  return async dispatch => {
    const initialData = await requestInitialData()
    return dispatch(receiveData(initialData))
  }
}

export function handleAddData(dataInput) {
  return async dispatch => {
    const data = await requestAddData(dataInput)
    dispatch(addData(data))
  }
}

export function handleUpdateData(id, updatedDataInput) {
  return async dispatch => {
    const updatedData = await requestUpdateData(id, updatedDataInput)
    return dispatch(updateData(updatedData))
  }
}

export function handleRemoveData(id) {
  return async dispatch => {
    await requestRemoveData(id)
    return dispatch(removeData(id))
  }
}
