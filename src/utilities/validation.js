const isRequired = value => {
  if (typeof value === 'string') {
    return value && value.length > 0
  } else if (typeof value === 'number') {
    return value && value > 0
  } else {
    return null
  }
}

const isError = errors => Object.keys(errors).some(error => errors[error])

const validateForm = ({ name, amount, type }) => {
  return {
    name: !isRequired(name) ? 'Name is required' : null,
    amount: !isRequired(amount) ? 'Amount is required' : null,
    type: !isRequired(type) ? 'Type is required' : null
  }
}

export { isError, validateForm }
