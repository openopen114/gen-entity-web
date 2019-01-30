import React, { Component } from "react";

import * as _ from "lodash";
import * as beautify from "js-beautify";

import "antd/dist/antd.css";
import "./App.css";

import SettingArea from "./components/SettingArea/";
import AnnotationConfigTable from "./components/AnnotationConfigTable/";
import HighlightCode from "./components/HighlightCode/";

class App extends Component {
  ignoreColumnName = [
    "CREATE_TIME",
    "CREATE_USER",
    "LAST_MODIFIED",
    "LAST_MODIFY_USER",
    "TS",
    "DR"
  ];

  constructor(props) {
    super(props);
    this.state = {
      packageName: "",
      projectName: "",
      tableName: "",
      tableSchema: [],
      entity: ""
    };
  }

  componentDidMount() {}

  setSettingConfig = _data => {
    const packageName = _.toLower(_data.packageName);
    const projectName = _.upperFirst(_.camelCase(_data.projectName));
    const tableName = _data.tableName;
    let tableSchema = _data.tableSchema;

    let map = new Map();

    map.set("VAR", "String");
    map.set("DEC", "Double");
    map.set("INT", "Integer");

    const tableSchemaArray = this.formatTableSchemaToArray(tableSchema);

    tableSchema = [];
    const annotation = {
      at_Id: false,
      at_Condition: false,
      at_GeneratedValue: false
    };

    for (let i = 0; i < tableSchemaArray.length; i += 3) {
      let obj = {};
      obj.columnName = tableSchemaArray[i];
      obj.type = map.get(_.toUpper(tableSchemaArray[i + 1]).substring(0, 3));
      obj.key = tableSchemaArray[i];

      obj = {
        ...obj,
        ...annotation
      };

      tableSchema.push(obj);
    }

    this.setState({ packageName, projectName, tableName, tableSchema });
  };

  updateAnnotationConfig = _tableSchema => {
    this.setState({ tableSchema: _tableSchema }, () => {
      this.genEntity();
    });
  };

  genEntity = () => {
    const { tableSchema, packageName, projectName, tableName } = this.state;

    const className = _.upperFirst(_.camelCase(tableName));
    let result = "";

    result += `
      package com.yonyou.iuap.${_.toLower(projectName)}.entity;

      import java.io.Serializable;
      import java.math.BigDecimal;

      import javax.persistence.Column;
      import javax.persistence.Id;
      import javax.persistence.Table;
      import javax.persistence.Transient;

      import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
      import com.yonyou.iuap.baseservice.entity.AbsDrModel;
      import com.yonyou.iuap.baseservice.entity.annotation.Associative;
      import com.yonyou.iuap.baseservice.entity.annotation.Reference;
      import com.yonyou.iuap.baseservice.support.condition.Condition;
      import com.yonyou.iuap.baseservice.support.generator.GeneratedValue;
      import com.yonyou.iuap.baseservice.multitenant.entity.MultiTenant;

      @JsonIgnoreProperties(ignoreUnknown = true)
      @Table(name = "${tableName}") 
      public class ${className} extends AbsDrModel implements Serializable, MultiTenant{


    `;

    tableSchema.map(item => {
      console.log("0000");
      console.log(item.columnName);
      console.log(!this.ignoreColumnName.includes(item.columnName));
      console.log("1111");
      if (!this.ignoreColumnName.includes(item.columnName)) {
        result += this.getEntityCell(item);
      }
    });

    result += "} ";

    result = beautify.js_beautify(result);
    this.setState({ entity: result });
  };

  getEntityCell = _item => {
    let cell = "";

    cell += _item.at_Id ? "@Id \n " : "";
    cell += _item.at_GeneratedValue ? "@GeneratedValue \n " : "";
    cell += _item.at_Condition ? "@Condition \n" : "";

    const colName = _item.columnName;
    const colNameCamel = _.camelCase(colName);
    const colNameUpperCamel = _.upperFirst(_.camelCase(colName));
    const type = _item.type;

    if (_item.at_Id) {
      cell += `protected String ${colNameCamel};

          @Override
          public String getId() {
            return ${colNameCamel};
          }

          @Override
          public void set${colNameUpperCamel}(Serializable id) {
            this.${colNameCamel} = id.toString();
            super.id = id;
          }

          public void set${colNameUpperCamel}(String id) {
            this.${colNameCamel} = id;
          }

    `;
    } else if (_item.columnName == "TENANT_ID") {
      cell += `
      @Column(name = "TENANT_ID")
      private String tenantid;

      public String getTenantid() {
        return this.tenantid;
      }

      public void setTenantid(String tenantid) {
        this.tenantid = tenantid;
      }

      `;
    } else {
      cell += `@Column(name = "${colName}")
      private String ${colNameCamel};  

      public void set${colNameUpperCamel}(${type} ${colNameCamel}) {
        this.${colNameCamel} = ${colNameCamel};
      }

      public String get${colNameUpperCamel}() {
        return this.${colNameCamel};
      }

    `;
    }

    return cell;
  };

  formatTableSchemaToArray = _tableSchema => {
    let preprocessData = _.replace(_tableSchema, /\[/g, ""); //remove [
    preprocessData = _.replace(preprocessData, /\]/g, ""); //remove ]
    preprocessData = _.replace(preprocessData, /\,/g, ""); //remove ,
    preprocessData = _.replace(preprocessData, /\ NOT/g, ""); //remove NOT
    preprocessData = _.replace(preprocessData, /\ DEFAULT/g, ""); //remove DEFAULT
    preprocessData = _.replace(preprocessData, /\ "/g, ""); //remove "
    preprocessData = _.replace(preprocessData, /\ '/g, ""); //remove '
    preprocessData = _.replace(preprocessData, /\n/g, ""); //remove \n

    preprocessData = _.split(preprocessData, " ");

    preprocessData = _.filter(preprocessData, o => {
      return o !== "" && o !== "\n";
    });

    return preprocessData;
  };

  render() {
    const {
      packageName,
      projectName,
      tableName,
      tableSchema,
      entity
    } = this.state;
    return (
      <div className="App">
        <SettingArea setSettingConfig={this.setSettingConfig} />
        <AnnotationConfigTable
          tableSchema={tableSchema}
          updateAnnotationConfig={this.updateAnnotationConfig}
        />

        <HighlightCode codeStr={entity} lang="java" />
      </div>
    );
  }
}

export default App;
