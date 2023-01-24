import React, { useState, useEffect } from 'react'
import { auth } from '../../lib/db'
import ImageUpload from '../ImageUpload.js'
import View from './View.js'
import Pagination from 'bulma-pagination-react';

import { contract, contractws, w3 } from '../../helpers/Web3Helper'

export default function Index() {

    const [data,  setData] = useState(false);
    const [total,  setTotal] = useState(0);
    const [currentPage,  setCurrentPage] = useState(1);

  const setUpListeners = async () => {
    contractws.events.allEvents(
      'allEvents',
      {
        fromBlock: 'latest',
      },
      async function (err, data) {
        await fetch()
      },
    )
  }

  const fetch = async () =>  {
    const response = await getPublicMessages()
    setData(response)
  }

  const getPublicMessages = async () => {
    var messages_count = await contractws.methods
      .get_Follows_list_length()
      .call();
      setTotal(messages_count)
      if(messages_count == 0 ){
        return []
      }
      const COUNT = 8
      const offset = COUNT * (currentPage - 1)
      const count = Math.min(COUNT, Math.abs(messages_count - offset))
      var messages = await contractws.methods.get_last_Follows_N(count, offset).call()
      return messages;
  }
  const changePage = async (pageNumber) => {
console.log("pageNumber", pageNumber)
    setCurrentPage(pageNumber)
    await fetch()
  }


  useEffect(async () => {    
    await fetch()
    await setUpListeners()
  },[])

    if(data === false){
      return (
        <div>
          <span className='sr-only'>
            Loading...
          </span>
        </div>
        )
    }
    if (data.length == 0) {
        return (
          <div>
            <span className='sr-only'>
              No Followss yet
            </span>
          </div>

          )
    }

    return (
      <div>
        {
          data.map((data, index) => (
            
              <View key={index} data={data} />
          ))
        }

        <Pagination
          pages={Math.ceil(total / 8)}
          currentPage={currentPage}
          onChange={page => changePage(page)}
        />
      </div>
    )
}
