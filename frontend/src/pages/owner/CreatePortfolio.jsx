import React, { Fragment, useState, useEffect } from 'react'
import PortfolioForm from '../../components/PortfolioForm'

export default function CreatePortfolio({submit_redirect}) {
  return (
    <Fragment>
        <PortfolioForm submit_redirect={{submit_redirect}}/>
    </Fragment>
  )
}
