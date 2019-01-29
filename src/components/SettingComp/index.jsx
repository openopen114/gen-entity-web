import React, { Component } from "react"; 

import "./index.scss";

class SettingComp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return(
		<div> 
			<h1 className="text-gradient">
 This is How Gradient Text Looks!
 </h1>
		</div>
	
    )
  }
}

export default SettingComp;
