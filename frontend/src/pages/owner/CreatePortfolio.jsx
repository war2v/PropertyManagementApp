import React, { Fragment, useState, useEffect } from 'react'
import PortfolioForm from '../../components/PortfolioForm'
import SideNav from '../../components/SideNav'
import { Link } from 'react-router-dom'

export default function CreatePortfolio({submit_redirect}) {
  return (
    <Fragment>
      <div className='flex'>
        <SideNav/>
          
        <PortfolioForm submit_redirect={{submit_redirect}}/>
      </div>
    </Fragment>
  )
}
