import React, { Component } from 'react'
import TimeAgo from 'react-timeago'
import User from '../components/User.js'

import { setupAccounts, w3, contractws } from '../helpers/Web3Helper'

  import ViewSkeet from '../components/Skeet/View.js'
  import ViewFollows from '../components/Follows/View.js'

function zip(arr1, arr2, out = {}) {
  arr1.map((val, idx) => {
    out[val] = arr2[idx]
  })
  return out
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages_Skeet_count: 0,
      messages_Skeet: null,
      messages_Follows_count: 0,
      messages_Follows: null,
    }
  }

  async setUpListeners() {
    var that = this
    contractws.events.allEvents(
      'allEvents',
      {
        fromBlock: 'latest',
      },
      async function (err, data) {
        await that.fetchMessages()
      },
    )
  }

  async componentDidMount() {
    setupAccounts()
    await this.fetchMessages()
    await this.setUpListeners()
  }

  async fetchMessages() {
      var messages_Skeet_count = await contractws.methods.get_Skeet_list_length().call()
      this.setState({ messages_Skeet_count: messages_Skeet_count })

      if(messages_Skeet_count > 0 ){
        const offset_Skeet = messages_Skeet_count - 1
        var messages = await contractws.methods.get_last_Skeet_N(1, offset_Skeet).call()
        this.setState({ messages_Skeet: messages[0] })
      }
      var messages_Follows_count = await contractws.methods.get_Follows_list_length().call()
      this.setState({ messages_Follows_count: messages_Follows_count })

      if(messages_Follows_count > 0 ){
        const offset_Follows = messages_Follows_count - 1
        var messages = await contractws.methods.get_last_Follows_N(1, offset_Follows).call()
        this.setState({ messages_Follows: messages[0] })
      }
  }

  render() {
    return (
      <div className="container">
        <nav className="panel is-primary">
          <p className="panel-heading">
              <span className="bd-snippet-tag bd-is-example"><a className="has-text-white" href="/Skeet">Skeet</a> </span>
              <span className="tag">{this.state.messages_Skeet_count}</span>
          </p>
          <div className="panel-block">
          {
            this.state.messages_Skeet && (
              <ViewSkeet data={ this.state.messages_Skeet } />
            )
          }
          </div>
        </nav>
        <nav className="panel is-primary">
          <p className="panel-heading">
              <span className="bd-snippet-tag bd-is-example"><a className="has-text-white" href="/Follows">Follows</a> </span>
              <span className="tag">{this.state.messages_Follows_count}</span>
          </p>
          <div className="panel-block">
          {
            this.state.messages_Follows && (
              <ViewFollows data={ this.state.messages_Follows } />
            )
          }
          </div>
        </nav>
      </div>
    )
  }
}
