import React, { useState, useEffect } from 'react'
import { auth } from '../../lib/db'
import ImageUpload from '../ImageUpload.js'

import { contract, w3 } from '../../helpers/Web3Helper'

export default function Send(props) {




      const [alice, setalice] = useState() 
  


      const [bob, setbob] = useState() 
  

  const [errorMessage, setErrorMessage] = useState()
  const [sendStatus, setSendStatus] = useState()
  const [user, setUser] = useState(false)

  useEffect(() => {    
    fetch(`${process.env.REACT_APP_GOOGLE_AUTH_DOMAIN}/check-auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      withCredentials: true,
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        const { auth, message, user } = JSON.parse(data);
        setUser(user);
        console.log(message);
      });
  }, [])

  const mySubmitHandler = async (event) => {
    event.preventDefault()

      var alice_value = alice
      var bob_value = bob

    




    let fail = false;
    if (alice === '') {
      setErrorMessage('Your alice cannot be empty')
      fail = true;
    } 
    if(fail){

    }
    else {
      setSendStatus('Sending')


      contract.methods
        .new_Follows(alice_value,bob_value) 
        .estimateGas()
        .then((gasEstimate) => {
          contract.methods
            .new_Follows(alice_value,bob_value) 
            .send({ gas: gasEstimate  })
            .then(() => {
              setSendStatus('')
                      setalice("")
                      setbob("")
            })
        })
    }
  }
  if (user) {
    return (
      <form className="p-6" onSubmit={mySubmitHandler}>






              <div className="field">
                <label className="label">alice</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Type your alice here..."
                    name="alice"
                    value={ alice    }
                    onChange={(event) => setalice(event.target.value)}
                  />
                </div>
              </div>





              <div className="field">
                <label className="label">bob</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Type your bob here..."
                    name="bob"
                    value={ bob    }
                    onChange={(event) => setbob(event.target.value)}
                  />
                </div>
              </div>


<div className="field is-grouped">
  <div className="control">
    <input  className={
                sendStatus === 'Sending'
                  ? 'button is-info is-bold'
                  : 'button is-warning has-text-white is-bold'
              }
              type="submit"
              value={sendStatus === 'Sending' ? 'Sharing...' : 'Share'}
              />
  </div>
</div>


      </form>
    )
  } else {
    return (
      <section className="hero is-warning mb-6">
        <div className="hero-body">
          <div className="container">
            <h3 className="title has-text-centered is-5">Please sign in to create a Follows</h3>
          </div>
        </div>
      </section>
    )
  }
}
