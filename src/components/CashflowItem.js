import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import Amount from './Amount'
import { Button, ButtonGroup } from '../elements'

function CashflowItem({
  amount,
  className,
  handleDelete,
  id,
  name,
  setEdit,
  type
}) {
  const { t } = useTranslation()

  return (
    <li className={className}>
      <div className="content">
        <div>
          <h3 data-testid="item-name">{name}</h3>
          <Amount amount={amount} type={type} />
        </div>
        <ButtonGroup>
          <Button
            type="button"
            variant="rounded"
            name="edit"
            data-testid={`${id}-edit`}
            onClick={() => setEdit({ id, name, type, amount })}
          >
            {t('Edit')}
          </Button>
          <Button
            type="button"
            variant="rounded"
            name="delete"
            data-testid={`${id}-delete`}
            onClick={() => handleDelete(id)}
          >
            {t('Delete')}
          </Button>
        </ButtonGroup>
      </div>
    </li>
  )
}

const StyledCashflowItem = styled(CashflowItem)`
  list-style-type: none;
  background: #f0f4f8;
  padding: 2rem;
  margin: 1rem;

  .content {
    display: flex;
    justify-content: space-between;

    h3 {
      margin-bottom: 0.8rem;
    }
  }
`

CashflowItem.propTypes = {
  amount: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  setEdit: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}

export default StyledCashflowItem
