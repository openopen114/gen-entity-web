import React, { Component } from "react";
import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";

 

import SettingArea from './components/SettingArea/';

class App extends Component {
  render() {
    return (
      <div className="App"> 
        <SettingArea />
        
      </div>
    );
  }
}

export default App;
