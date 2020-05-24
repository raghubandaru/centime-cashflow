import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ErrorMessage } from './ErrorMessage'
import { Button, FormGroup, Input, Label, Select } from '../elements'
import { below } from '../utilities/breakpoints'
import { isError, validateForm } from '../utilities/validation'

function Form({ className, edit, handleClear, handleSubmit }) {
  const [details, setDetails] = useState({
    name: '',
    amount: '',
    type: 'income'
  })
  const [touched, setTouched] = useState({
    name: false,
    amount: false,
    type: false
  })
  const [error, setError] = useState(null)
  const inputRef = useRef()

  const { t } = useTranslation()

  const focusFirstInput = () => inputRef.current.focus()

  const resetFormContent = useCallback(() => {
    setDetails({ name: '', amount: '', type: 'income' })
  }, [])

  const resetFormTouched = useCallback(() => {
    setTouched({
      name: false,
      amount: false,
      type: false
    })
  }, [])

  const resetFormError = useCallback(() => {
    setError(null)
  }, [])

  useEffect(() => {
    if (edit) {
      const { id, ...editDetails } = edit
      resetFormError()
      resetFormTouched()
      setDetails(editDetails)
      focusFirstInput()
    } else {
      resetFormError()
      resetFormTouched()
      resetFormContent()
    }
  }, [edit, resetFormContent, resetFormError, resetFormTouched])

  const handleChange = e => {
    const fieldName = e.target.name
    const value = e.target.value

    if (fieldName === 'amount') {
      const regex = /^[0-9]+$/

      if (value !== '' && !value.match(regex)) {
        return
      }
    }

    setDetails({ ...details, [fieldName]: value })
  }

  const handleBlur = e => {
    const fieldName = e.target.name

    setTouched({ ...touched, [fieldName]: true })
  }

  const onSubmit = e => {
    e.preventDefault()

    if (isError(errors)) {
      return
    }

    setError(null)

    const { name, amount, type } = details

    try {
      handleSubmit(name, type, parseInt(amount, 10))
      resetFormError()
      resetFormTouched()
      resetFormContent()
    } catch (error) {
      setError(error.response.data.error)
    }

    if (edit) {
      handleClear()
    }
  }

  const errors = useMemo(() => validateForm(details), [details])

  return (
    <form className={className} onSubmit={onSubmit}>
      {error && (
        <FormGroup>
          <ErrorMessage error={error} />
        </FormGroup>
      )}
      <FormGroup>
        <Label htmlFor="name">{t('Name')}</Label>
        <Input
          type="text"
          id="name"
          name="name"
          ref={inputRef}
          value={details.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && <ErrorMessage error={errors.name} />}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="amount">{t('Amount')}</Label>
        <Input
          type="text"
          id="amount"
          name="amount"
          value={details.amount}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.amount && touched.amount && (
          <ErrorMessage error={errors.amount} />
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="type">{t('Type')}</Label>
        <Select
          name="type"
          id="type"
          value={details.type}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="income">Income</option>
          <option value="expenditure">Expenditure</option>
        </Select>
        {errors.type && touched.type && <ErrorMessage error={errors.type} />}
      </FormGroup>
      {edit && (
        <Button
          type="button"
          variant="secondary"
          width={100}
          onClick={handleClear}
        >
          {t('Cancel')}
        </Button>
      )}
      <Button
        type="submit"
        variant="primary"
        disabled={isError(errors)}
        width={100}
      >
        {edit ? t('Update') : t('Add')}
      </Button>
    </form>
  )
}

const StyledForm = styled(Form)`
  background: #ffffff;
  min-height: 400px;
  max-height: 400px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 30%;
  font-size: 1.4rem;
  box-shadow: 0 8px 6px -6px grey;

  ${Button} {
    align-self: flex-end;
  }

  ${below.med`
    > * {
      margin-bottom: 1.5rem;
    }
  `}
`

Form.propTypes = {
  className: PropTypes.string.isRequired,
  edit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  }),
  handleClear: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export { StyledForm as Form }
