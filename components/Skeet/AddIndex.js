import React, { useState, useEffect } from 'react'
import { auth } from '../../lib/db'
import ImageUpload from '../ImageUpload.js'

import { contract, w3 } from '../../helpers/Web3Helper'

export default function Send(props) {

      const image_address = props.image_address



      const [text, settext] = useState() 
  


      const [image, setimage] = useState(image_address) 
  

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

      var text_value = text
      var image_value = image

    




    let fail = false;
    if (text === '') {
      setErrorMessage('Your text cannot be empty')
      fail = true;
    } 
    if(fail){

    }
    else {
      setSendStatus('Sending')


      contract.methods
        .new_Skeet(text_value,image_value) 
        .estimateGas()
        .then((gasEstimate) => {
          contract.methods
            .new_Skeet(text_value,image_value) 
            .send({ gas: gasEstimate  })
            .then(() => {
              setSendStatus('')
                      settext("")
            })
        })
    }
  }
  if (user) {
    return (
      <form className="p-6" onSubmit={mySubmitHandler}>






              <div className="field">
                <label className="label">text</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Type your text here..."
                    name="text"
                    value={ text    }
                    onChange={(event) => settext(event.target.value)}
                  />
                </div>
              </div>




            <input type="hidden"
              name="image"
              value={ image_address    }
            />

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
            <h3 className="title has-text-centered is-5">Please sign in to create a Skeet</h3>
          </div>
        </div>
      </section>
    )
  }
}
