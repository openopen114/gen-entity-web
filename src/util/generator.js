import * as _ from "lodash";
import * as beautify from "js-beautify";
import * as XmlBeautify from "xml-beautify";

//ignore entity colunm
export const ignoreColumnName = [
  "CREATE_TIME",
  "CREATE_USER",
  "LAST_MODIFIED",
  "LAST_MODIFY_USER",
  "TS",
  "DR"
];

// Generate Entity
export const genEntity = _state => {
  const { tableSchema, packageName, projectName, tableName } = _state;

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
    if (!ignoreColumnName.includes(item.columnName)) {
      result += getEntityCell(item);
    }
  });

  result += "} ";

  const formattedEntity = beautify.js_beautify(result);

  return formattedEntity;
};

// Generate Entity Cell
export const getEntityCell = _item => {
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
      
      @Condition
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
      private ${type} ${colNameCamel};  

      public void set${colNameUpperCamel}(${type} ${colNameCamel}) {
        this.${colNameCamel} = ${colNameCamel};
      }

      public ${type} get${colNameUpperCamel}() {
        return this.${colNameCamel};
      }

    `;
  }

  return cell;
};

export const formatTableSchemaToArray = _tableSchema => {
  let preprocessData = _.split(_tableSchema, "[");
  const patt = new RegExp("]");
  preprocessData = _.filter(preprocessData, item => patt.test(item));
  preprocessData = _.map(preprocessData, item => _.split(item, "]")[0]);

  preprocessData = _.filter(preprocessData, o => {
    return o !== "" && o !== "\n";
  });

  return preprocessData;
};

export const genXML = _state => {
  const { tableSchema, packageName, projectName, tableName } = _state;

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

   `;

  tableSchema.map(item => {
    if (item.at_Id) {
      xml += `<id column="${item.columnName}" jdbcType="${map.get(
        item.type
      )}" property="${_.camelCase(item.columnName)}" /> \n`;
    } else if (item.columnName == "TENANT_ID") {
      xml += `<result column="TENANT_ID" jdbcType="VARCHAR" property="tenantid" />`;
    } else {
      xml += ` <result column="${item.columnName}" jdbcType="${map.get(
        item.type
      )}" property="${_.camelCase(item.columnName)}" /> \n`;
    }
  });

  xml += `
   </resultMap>
  

  `;

  xml += `
    <select id="selectAllByPage" resultMap="BaseResultMap">
    SELECT t.* FROM ${tableName} t WHERE 1 =1 and t.dr=0
      <if test="condition != null">

    `;

  tableSchema.map(item => {
    if (item.columnName == "TENANT_ID") {
      xml += `   <if test="condition.searchMap.tenantid!=null and condition.searchMap.tenantid!='' ">
        and t.TENANT_ID = #{condition.searchMap.tenantid}
      </if> `;
    } else {
      xml += `
      <if test="condition.searchMap.${_.camelCase(
        item.columnName
      )}!=null and condition.searchMap.${_.camelCase(item.columnName)}!='' ">
        and t.${item.columnName} = #{condition.searchMap.${_.camelCase(
        item.columnName
      )}}
      </if>
    `;
    }
  });

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
  `;

  const formattedXml = new XmlBeautify().beautify(xml, {
    indent: "  ", //indent pattern like white spaces
    useSelfClosingElement: true //true:use self-closing element when empty element.
  });

  return formattedXml;
};

// Set Seeting Config For Setting Comp Data
export const formateConfigParam = _data => {
  const packageName = _.toLower(_data.packageName);
  const projectName = _.upperFirst(_.camelCase(_data.projectName));
  const tableName = _data.tableName;
  let tableSchema = _data.tableSchema;

  let map = new Map();

  map.set("VAR", "String");
  map.set("DEC", "Double");
  map.set("INT", "Integer");

  const tableSchemaArray = formatTableSchemaToArray(tableSchema);

  tableSchema = [];
  const annotation = {
    at_Id: false,
    at_Condition: false,
    at_GeneratedValue: false
  };

  for (let i = 0; i < tableSchemaArray.length; i += 2) {
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

  return { packageName, projectName, tableName, tableSchema };
};
