import React, {Fragment} from 'react'

import TimeAgo from 'react-timeago'
import Link from 'next/link'
import User from '../User.js'

export default (props) => {
  const data = props.data

  function reference_contract_link(){
    if(props.reference_contract){
      return (
                    <Link href={"/Skeetimage?address="+data[props.reference_contract]}>
                      <a className="button is-warning has-text-white is-bold">
                        <span>View all Skeet with same image</span>
                      </a>
                    </Link>
      ) 
    }else{
      return (<></>);
    }
  }
  function reverse_reference_contract_link(){
console.log('data',data)
      return (
              <>

            </>
      ) 
  }


  return (
<section className='hero is-primary mb-6'>
  <div className='hero-body'>
    <div className='container'>
      <div className='columns'>
        <div className='column is-one-quarter'>
          <User sender={data.sender} key={props.key} />
        </div>
        <div className='column'>
            <h1 className='title'>
              text
            </h1>
              <h2 className='subtitle'>
                {data.text }
              </h2>
            <h1 className='title'>
              image
            </h1>
              <h2 className='subtitle'>
                {data.image }
              </h2>
          <h2 className='subtitle'>
            <TimeAgo date={data.timestamp * 1000} />
          </h2>
                   {reference_contract_link()}
                   {reverse_reference_contract_link()}
        </div>
      </div>
    </div>
  </div>
</section>
)
}
