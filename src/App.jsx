import React, { Component } from "react";

import * as _ from "lodash";
import * as beautify from "js-beautify";
import * as XmlBeautify from 'xml-beautify';

import "antd/dist/antd.css";
import "./App.scss";

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
      formattedEntity: "",
      formattedXml:""
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
      this.genXML();
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
      if (!this.ignoreColumnName.includes(item.columnName)) {
        result += this.getEntityCell(item);
      }
    });

    result += "} ";

    const formattedEntity = beautify.js_beautify(result);
    this.setState({ formattedEntity });
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




  genXML = () => {
    const { tableSchema, packageName, projectName, tableName } = this.state;
    

    const lowerProjectName = _.toLower(_.camelCase(projectName));
    const upperCamelProjectname = _.upperFirst(_.camelCase(projectName));
    const upperCamelTableName = _.upperFirst(_.camelCase(tableName));
    

    let map = new Map();

    map.set("String", "VARCHAR");
    map.set("Double", "DECIMAL");
    map.set("Integer", "INTEGER");


    let xml = "";


    xml += `<?xml version="1.0" encoding="UTF-8"?>
        <mapper namespace="${packageName}.${lowerProjectName}.dao.${upperCamelTableName}Mapper">
        <resultMap id="BaseResultMap" type="${packageName}.${upperCamelTableName}.entity.MachineD18">

   `

   tableSchema.map(item => {
    if(item.at_Id){
      xml += `<id column="${item.columnName}" jdbcType="${map.get(item.type)}" property="${_.toLower(_.camelCase(item.columnName))}" /> \n`
    }else{
      xml += `<result column="${item.columnName}" jdbcType="${map.get(item.type)}" property="${_.camelCase(item.columnName)}" /> \n`;
    }
   })

   xml += `
   </resultMap>
  

  `


  xml += `
    <select id="selectAllByPage" resultMap="BaseResultMap">
    SELECT t.* FROM ${tableName} t WHERE 1 =1 and t.dr=0
      <if test="condition != null">

    `

  tableSchema.map(item => {
    xml += `
      <if test="condition.searchMap.${_.camelCase(item.columnName)}!=null and condition.searchMap.${_.camelCase(item.columnName)}!='' ">
        and t.${item.columnName} = #{condition.searchMap.${_.camelCase(item.columnName)}}
      </if>
    `
  })  


  xml += `
      </if>
        order by ts desc
        <if test="page != null">
          <if test="page.sort!=null">
            <foreach collection="page.sort" item="item" separator=" ">
              ,\$\{item.property} \$\{item.direction}
            </foreach>
          </if>
        </if>
      </select>
    </mapper>
  ` 
 
    const formattedXml = new XmlBeautify().beautify(xml, {
            indent: "  ",  //indent pattern like white spaces
            useSelfClosingElement: true //true:use self-closing element when empty element.
        });
   

    this.setState({formattedXml})



  }

  render() {
    const {
      packageName,
      projectName,
      tableName,
      tableSchema,
      formattedEntity,
      formattedXml
    } = this.state;
    return (
      <div className="App">
        <h1 className="app-title">ENTITY & XML GENERATOR</h1>
        <SettingArea setSettingConfig={this.setSettingConfig} />
        <AnnotationConfigTable
          tableSchema={tableSchema}
          updateAnnotationConfig={this.updateAnnotationConfig}
        />

        <h1 className="result-title">Generate Entity Result</h1>
        <HighlightCode codeStr={formattedEntity} lang="java" />


        <h1 className="result-title">Generate XML Result</h1>
        <HighlightCode codeStr={formattedXml} lang="xml" />
      </div>
    );
  }
}

export default App;
