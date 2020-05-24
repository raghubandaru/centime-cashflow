import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import Amount from './Amount'
import { Button, ButtonGroup } from '../elements'

function CashflowItem({ amount, className, id, name, type }) {
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
            data-id={id}
            data-name={name}
            data-amount={amount}
            data-type={type}
            data-testid={`${id}-edit`}
          >
            {t('Edit')}
          </Button>
          <Button
            type="button"
            variant="rounded"
            name="delete"
            data-id={id}
            data-testid={`${id}-delete`}
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
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default StyledCashflowItem
