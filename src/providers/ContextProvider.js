import React, { Component, createContext } from "react";
import Context from '../config/Context';

class ContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      tableSetting:[],
      projectName:'',
      packageName:'',


      items: [],
      count:0,

      Submit: (e) => {
        console.log('=== Submit ===')
        console.log(e);
      },

      updateTableSetting: (_tableSetting) => {
        const tableSetting = _tableSetting;
        this.setState({tableSetting})
      },

      updateProjectName: (_projectName) => {
        const projectName = _projectName;
        this.setState({projectName})
      },


      updatePackageName: (_packageName) => {
        const packageName = _packageName;
        this.setState({packageName})
      },

      inc: () => {
        this.setState({count: this.state.count + 1})
      }
    };
  }

  getDataFromAPI() {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then(response => response.json())
      .then(json => this.setState({items: json}))
  }

  componentWillMount() {
    this.getDataFromAPI();
  }



  render() {
    return (
        <Context.Provider value={ this.state}>
        {this.props.children}
       </Context.Provider>
    );
  }
}

export default ContextProvider;