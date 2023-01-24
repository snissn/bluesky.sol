import React, { Component, useEffect, useState } from 'react'
import Index from '../components/Skeet/Indeximage'
import { useRouter } from 'next/router'
import Add from '../components/Skeet/AddIndex'

import { setupAccounts } from '../helpers/Web3Helper'

export default (props) => {
  const router = useRouter()
  const [address, setAddress] = useState('')
  useEffect(() => {
      if(router.query.address){
        setAddress(router.query.address)
      }
    console.log('address',router.query.address)
   })

  useEffect(() => {
    setupAccounts()
  }, [])

  if(address == ''){

    return '';
  }
  return (
    <div className="container">
    <Add image_address={address} />
      <Index address={address}/>
    </div>
  )
}


