import React, { useState } from "react";
import AppContext from "../config/Context";

import { genEntity, formatTableSchemaToArray, genXML, formateConfigParam } from "../util/generator";

/*
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

*/

 

const AppContextProvider = props => {

  const [tableSchema, setTableSchema] = useState([]); //table schema
  const [projectName, setProjectName] = useState([]); //project name
  const [packageName, setpackageName] = useState([]); //package name
  const [formattedGridColumn, setFormattedGridColumn] = useState(""); // formatted result of grid column

  const [formattedFactoryComp, setFormattedFactoryComp] = useState(""); // formatted result of Factory Comp

  // Set Setting Config Form Setting Comp Data
  const setSettingConfig = _data => { 
    const { tableSchema } = formateConfigParam(_data);
    setTableSchema(tableSchema); 
  };

  // Update Column Config For Config Table Comp
  const updateConfig = _tableSchema => { 
    console.log('updateConfig')
    console.log(_tableSchema)
    setTableSchema(_tableSchema);
    const formattedGridColumn = genGridColumn({tableSchema});
    setFormattedGridColumn(formattedGridColumn); 


    const formattedFactoryComp = genFactoryComp({tableSchema});
    setFormattedFactoryComp(formattedFactoryComp)

    
  };

  return (
    <AppContext.Provider
      value={{
        tableSchema,
        formattedGridColumn,
        formattedFactoryComp,
        setSettingConfig,
        updateConfig
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
