import axios from 'axios'

export const requestInitialData = async () => {
  const config = {
    url: 'http://localhost:5000/data'
  }

  try {
    const { data } = await axios(config)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const requestAddData = async data => {
  const config = {
    url: 'http://localhost:5000/data',
    method: 'POST',
    data
  }

  try {
    const { data } = await axios(config)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const requestUpdateData = async (id, data) => {
  const config = {
    url: `http://localhost:5000/data/${id}`,
    method: 'PUT',
    data
  }

  try {
    const { data } = await axios(config)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const requestRemoveData = async id => {
  const config = {
    url: `http://localhost:5000/data/${id}`,
    method: 'DELETE'
  }

  try {
    await axios(config)
  } catch (error) {
    console.log(error)
  }
}
