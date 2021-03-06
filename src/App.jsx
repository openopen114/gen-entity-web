import React, { Component } from "react";

import * as _ from "lodash";
import * as beautify from "js-beautify";
import * as XmlBeautify from "xml-beautify";
import { Button } from 'antd';

import { genEntity, formateConfigParam, genXML, genDao, genService, genEnumService, genController } from "./util/generator.js";
import SettingArea from "./components/SettingArea/";
import AnnotationConfigTable from "./components/AnnotationConfigTable/";
import HighlightCode from "./components/HighlightCode/";

import "antd/dist/antd.css";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageName: "",
      projectName: "",
      projectType:'',
      tableName: "",
      tableSchema: [],
      formattedEntity: "",
      formattedDao: "",
      formattedServie: "",
      formattedController: "",
      formattedEnumServie:"",
      formattedXml: ""
    };
  }

  componentDidMount() {}

  // Set Seeting Config For Setting Comp Data
  setSettingConfig = _data => {
    const {
      packageName,
      projectName,
      tableName,
      tableSchema
    } = formateConfigParam(_data);

    const projectType = _data.projectType;
    this.setState({ packageName, projectName, tableName, tableSchema, projectType });
  };

  // Update Annotation Config For Config Table Comp
  updateAnnotationConfig = _tableSchema => {
    this.setState({ tableSchema: _tableSchema }, () => {
      const formattedEntity = genEntity(this.state);
      const formattedXml = genXML(this.state);
      const formattedDao = genDao(this.state);
      const formattedServie = genService(this.state);
      //const formattedEnumServie = genEnumService(this.state);
      const formattedController = genController(this.state);

      this.setState({ formattedEntity, formattedXml, formattedDao,formattedServie, formattedController });
    });
  };

  render() {

    const {
      packageName,
      projectName,
      tableName,
      tableSchema,
      formattedEntity,
      formattedDao,
      formattedServie,
      formattedXml,
      formattedController,
      formattedEnumServie
    } = this.state;


    return (
      <div className="App">
      
        {/* Github Button */}
        <Button ghost icon="github" className="githubBtn">
          <a href="https://github.com/openopen114/gen-entity-web" target="_blank"> Github</a>
        </Button>

        {/* Title */}
        <h1 className="app-title">ENTITY & XML GENERATOR</h1>

        {/* Setting Area*/}
        <SettingArea setSettingConfig={this.setSettingConfig} />

        {/* Annotation Config Table*/}
        <AnnotationConfigTable
          tableSchema={tableSchema}
          updateAnnotationConfig={this.updateAnnotationConfig}
        />

        {/* Entity Result */}
        <h1 className="result-title">Generate Entity Result</h1>
        <HighlightCode codeStr={formattedEntity} lang="java" />



        {/* Dao Result */}
        <h1 className="result-title">Generate Dao Result</h1>
        <HighlightCode codeStr={formattedDao} lang="java" />


        {/* Service Result */} 
        <h1 className="result-title">Generate Service Result</h1>
        <HighlightCode codeStr={formattedServie} lang="java" />


        {/* Enum Service Result */} 
        {/*
          <h1 className="result-title">Generate Enum Service Result</h1>
          <HighlightCode codeStr={formattedEnumServie} lang="java" />
        */}



        {/* EController Result */}
        <h1 className="result-title">Generate Controller Result</h1>
        <HighlightCode codeStr={formattedController} lang="java" />

        {/* XML Result */}
        <h1 className="result-title">Generate XML Result</h1>
        <HighlightCode codeStr={formattedXml} lang="xml" />
      </div>
    );
  }
}

export default App;
