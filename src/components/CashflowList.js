import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import CashflowItem from './CashflowItem'
import { below } from '../utilities/breakpoints'

function CashflowList({ className, data, handleDelete, setEdit }) {
  const { t } = useTranslation()

  if (!data || !data.length) {
    return (
      <div className={className}>
        <p>
          {t('No')} {t('Cashflow')} {t('Items')} {t('Found')}. {t('Start')}{' '}
          {t('Adding')}!
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <ul>
        {data.map(({ id, name, type, amount }) => (
          <CashflowItem
            key={id}
            id={id}
            name={name}
            type={type}
            amount={amount}
            handleDelete={handleDelete}
            setEdit={setEdit}
          />
        ))}
      </ul>
    </div>
  )
}

const StyledCashflowList = styled(CashflowList)`
  background: #ffffff;
  padding: 2rem;
  flex-basis: 60%;
  overflow-y: auto;
  min-height: 400px;
  max-height: 400px;
  box-shadow: 0 8px 6px -6px grey;

  ${props =>
    (!props.data || !props.data.length) &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-y: initial;
    `}

  ${below.med`
      margin-bottom: 2rem;
    `}
`

CashflowList.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.array,
  handleDelete: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired
}

export { StyledCashflowList as CashflowList }
