import React, { Component, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { setupAccounts, w3, contractws } from '../helpers/Web3Helper'


function zip(arr1, arr2, out = {}) {
  arr1.map((val, idx) => {
    out[val] = arr2[idx]
  })
  return out
}

  import ViewSkeet from '../components/Skeet/View.js'
  import ViewFollows from '../components/Follows/View.js'

export default (props) => {
  const router = useRouter()

  const [address, setAddress] = useState('')



    const [messages_Skeet_count, set_messages_Skeet_count] = useState(0)
    const [messages_Skeet, set_messages_Skeet] = useState(null)


    const [messages_Follows_count, set_messages_Follows_count] = useState(0)
    const [messages_Follows, set_messages_Follows] = useState(null)



  useEffect(() => {
      if(router.query.address){
        setAddress(router.query.address)
      }
   }, [])


  async function setUpListeners() {
      contractws.events.allEvents(
        'allEvents',
        {
          fromBlock: 'latest',
        },
        async function (err, data) {
          await fetchMessages()
        },
      )
    }

    async function fetchMessages() {
      if(address == ''){return}
      var messages_Skeet_count = await contractws.methods.get_Skeet_user_length(address).call()
      set_messages_Skeet_count ( messages_Skeet_count )

      if(messages_Skeet_count > 0 ){
        const offset_Skeet = messages_Skeet_count - 1
        var messages = await contractws.methods.get_last_Skeet_user_N(address,1, offset_Skeet).call()
        set_messages_Skeet( messages[0])
      }
      var messages_Follows_count = await contractws.methods.get_Follows_user_length(address).call()
      set_messages_Follows_count ( messages_Follows_count )

      if(messages_Follows_count > 0 ){
        const offset_Follows = messages_Follows_count - 1
        var messages = await contractws.methods.get_last_Follows_user_N(address,1, offset_Follows).call()
        set_messages_Follows( messages[0])
      }
  }

  useEffect(() => {
     setUpListeners()
  })

  useEffect(() => {
  
     fetchMessages()

  },[address])

  return( <div className="container">
    
        <nav className="panel is-primary">
          <p className="panel-heading">
              <span className="bd-snippet-tag bd-is-example"><a className="has-text-white" href="/Skeet">Skeet</a> </span>
              <span className="tag">{messages_Skeet_count}</span>
          </p>
          <div className="panel-block">
          {
            messages_Skeet && (
              <ViewSkeet data={ messages_Skeet } />
            )
          }
          </div>
        </nav>
        <nav className="panel is-primary">
          <p className="panel-heading">
              <span className="bd-snippet-tag bd-is-example"><a className="has-text-white" href="/Follows">Follows</a> </span>
              <span className="tag">{messages_Follows_count}</span>
          </p>
          <div className="panel-block">
          {
            messages_Follows && (
              <ViewFollows data={ messages_Follows } />
            )
          }
          </div>
        </nav>
    
   </div>)
}
