import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  handleReceiveData,
  handleAddData,
  handleUpdateData,
  handleRemoveData
} from './actions/cashflow'
import {
  CashflowList,
  Container,
  DataContainer,
  Form,
  Layout,
  Main,
  Nav,
  Navbar,
  SankeyDiagram
} from './components'
import { Button } from './elements'
import i18next from './i18next'
import centimeLogo from './images/centime-logo.png'

function App() {
  const [isLoading, setLoading] = useState(true)
  const [edit, setEdit] = useState(null)

  const data = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      dispatch(handleReceiveData())
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [dispatch])

  const handleClear = () => setEdit(null)

  const handleDelete = id => dispatch(handleRemoveData(id))

  const handleSubmit = (name, type, amount) => {
    if (edit) {
      dispatch(handleUpdateData(edit.id, { name, type, amount }))
    } else {
      dispatch(handleAddData({ name, type, amount }))
    }
  }

  const handleOperations = event => {
    if (event.target.nodeName === 'BUTTON') {
      const id = parseInt(event.target.attributes['data-id'].value, 10)

      if (event.target.name === 'edit') {
        const amount = parseInt(
          event.target.attributes['data-amount'].value,
          10
        )
        const name = event.target.attributes['data-name'].value
        const type = event.target.attributes['data-type'].value

        setEdit({ id, name, type, amount })
      } else if (event.target.name === 'delete') {
        if (edit?.id === id) {
          setEdit(null)
        }
        handleDelete(id)
      }
    } else {
      return null
    }
  }

  const handleLanguageChange = lang => i18next.changeLanguage(lang)

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <Layout>
      <Nav>
        <Container>
          <Navbar>
            <img src={centimeLogo} alt="Centime Logo" height="30px" />
            <div>
              <Button
                type="button"
                color="#ffffff"
                onClick={() => handleLanguageChange('en')}
              >
                En
              </Button>
              <Button
                type="button"
                color="#ffffff"
                onClick={() => handleLanguageChange('es')}
              >
                Es
              </Button>
            </div>
          </Navbar>
        </Container>
      </Nav>
      <Main>
        <Container>
          <SankeyDiagram data={data} />
          <DataContainer>
            <CashflowList data={data} handleOperations={handleOperations} />
            <Form
              edit={edit}
              handleClear={handleClear}
              handleSubmit={handleSubmit}
            />
          </DataContainer>
        </Container>
      </Main>
    </Layout>
  )
}

export default App
