import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

import memoryUtils from "../../util/memoryUtils";
export default class Admin extends Component {
  render() {

    const user = memoryUtils.user

    if (!user._id) {
      return <Redirect to="/login"></Redirect>
    }
    return (
      <div>
        Hello,{user.username}
      </div>
    )
  }
}
