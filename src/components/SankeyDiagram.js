import React from 'react'
import { Chart } from 'react-google-charts'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

function SankeyDiagram({ className, data }) {
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

  const headers = [['From', 'To', 'Weight']]
  const tranform = data.map(({ name, type, amount }) => {
    if (type === 'income') {
      return [name, type, amount]
    } else {
      return ['income', name, amount]
    }
  })

  const computedData = headers.concat(tranform)

  return (
    <div className={className}>
      <Chart
        width="100%"
        height="150px"
        chartType="Sankey"
        loader={<div className={className}>Loading Chart</div>}
        data={computedData}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  )
}

const StyledSankeyDiagram = styled(SankeyDiagram)`
  background: #ffffff;
  padding: 3rem;
  min-height: 150px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 6px -6px grey;

  ${props =>
    (!props.data || !props.data.length) &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`

SankeyDiagram.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.array
}

export { StyledSankeyDiagram as SankeyDiagram }
