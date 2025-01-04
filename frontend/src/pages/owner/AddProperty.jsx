import React, { Fragment } from 'react'
import PropertyForm from '../../components/PropertyForm'
import { useParams } from 'react-router-dom'

export default function AddProperty({submit_redirect}) {
    const {p_name} = useParams();

    
  return (
    
    <Fragment>
      <div className="flex">
        <SideNav/>
          
        <div className="w-screen m-auto flex flex-col items-center">
            <PropertyForm p_name={p_name} submit_redirect={submit_redirect}/>
        </div>
      </div>
    </Fragment>
  )
}
