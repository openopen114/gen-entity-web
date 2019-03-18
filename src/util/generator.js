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




//Generate COntroller
export const genController = _state => {

   const { tableSchema, packageName, projectName, tableName } = _state;
   let result = ""; 


   const UpperTableName = _.upperFirst(_.camelCase(tableName)); 
   const UpperProjectName = _.upperFirst(_.camelCase(projectName));


   result += `
         package ${_.toLower(packageName)}.${_.toLower(projectName)}.controller;

        import java.util.List;
        import java.util.Map;

        import javax.servlet.http.HttpServletRequest;
        import javax.servlet.http.HttpServletResponse;

        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.data.domain.Page;
        import org.springframework.data.domain.PageRequest;
        import org.springframework.stereotype.Controller;
        import org.springframework.web.bind.annotation.RequestBody;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.RequestMethod;
        import org.springframework.web.bind.annotation.ResponseBody;

        import com.yonyou.iuap.CSRFToken;
        import com.yonyou.iuap.${_.toLower(projectName)}.entity.${UpperProjectName};
        import com.yonyou.iuap.${_.toLower(projectName)}.service.${UpperProjectName}EnumService;
        import com.yonyou.iuap.${_.toLower(projectName)}.service.${UpperProjectName}Service;
        import com.yonyou.iuap.base.web.BaseController;
        import com.yonyou.iuap.baseservice.statistics.service.StatCommonService;
        import com.yonyou.iuap.mvc.constants.RequestStatusEnum;
        import com.yonyou.iuap.mvc.type.SearchParams;

        /**
         * 说明：${UpperProjectName} 基础Controller——提供数据增、删、改、查、导入导出等rest接口
         * 
         * @date YYYY-MM-DD HH:mm:ss
         */
        @Controller
        @RequestMapping(value = "/${_.toLower(projectName)}")
        public class ${UpperProjectName}Controller extends BaseController {
          private Logger logger = LoggerFactory.getLogger(${UpperProjectName}Controller.class);

          private ${UpperProjectName}Service ${_.camelCase(projectName)}Service;

          @Autowired
          public void set${UpperProjectName}Service(${UpperProjectName}Service ${_.camelCase(projectName)}Service) {
            this.${_.camelCase(projectName)}Service = ${_.camelCase(projectName)}Service;
          }
          
          @Autowired
          private StatCommonService statCommonService;
          
          private static final String MODELCODE = "${UpperProjectName}";
          /**
           * 添加
           * @param entity
           * @return
           */
          @CSRFToken
          @RequestMapping(value = "/insertSelective", method = RequestMethod.POST)
          @ResponseBody
          public Object insertSelective(@RequestBody ${UpperProjectName} entity) {
            try {
               ${_.camelCase(projectName)}Service.insertSelective(entity);
              return this.buildSuccess(entity);
            } catch (Exception exp) {
              logger.error("exp", exp);
              return this.buildError("msg", "Error insert database", RequestStatusEnum.FAIL_FIELD);
            }
          }
          /**
           * 修改
           * @param entity
           * @return
           */
          @CSRFToken
          @RequestMapping(value = "/updateSelective", method = RequestMethod.POST)
          @ResponseBody
          public Object updateSelective(@RequestBody ${UpperProjectName} entity) {
            try {
               ${_.camelCase(projectName)}Service.updateSelective(entity);
              return this.buildSuccess(entity);
            } catch (Exception exp) {
              logger.error("exp", exp);
              return this.buildError("msg", "Error update database", RequestStatusEnum.FAIL_FIELD);
            }
          } 




          /**
           * 批量添加
           * @param listData
           * @return
           */
          @CSRFToken
          @RequestMapping(value = "/saveMultiple", method = RequestMethod.POST)
          @ResponseBody
          public Object saveMultiple(@RequestBody List<${UpperProjectName}> listData) {
            try {
              this.${_.camelCase(projectName)}Service.saveMultiple(listData);
              return this.buildSuccess();
            } catch (Exception exp) {
              logger.error("exp", exp);
              return this.buildError("msg", "Error save database", RequestStatusEnum.FAIL_FIELD);
            }
            
          }
          /**
           * 批量修改
           * @param listData
           * @return
           */
          @CSRFToken
          @RequestMapping(value = "/updateMultiple", method = RequestMethod.POST)
          @ResponseBody
          public Object updateMultiple(@RequestBody List<${UpperProjectName}> listData) {
            try {
              this.${_.camelCase(projectName)}Service.updateMultiple(listData);
              return this.buildSuccess();
            } catch (Exception exp) {
              logger.error("exp", exp);
              return this.buildError("msg", "Error update database", RequestStatusEnum.FAIL_FIELD);
            }
            
          }


   
          
          /**
           * 删除
           * @param listData
           * @param request
           * @param response
           * @return
           * @throws Exception
           */
          @CSRFToken
          @RequestMapping(value = "/deleteBatch", method = RequestMethod.POST)
          @ResponseBody
          public Object deleteBatch(@RequestBody List<${UpperProjectName}> listData, HttpServletRequest request,
              HttpServletResponse response) throws Exception {
            this. ${_.camelCase(projectName)}Service.deleteBatch(listData);
            return super.buildSuccess();
          }
          
          /**
           * 多过滤 多排序
           * @param pageRequest
           * @param searchMap
           * @return
           */
          @CSRFToken(verify = false)
          @RequestMapping(value = "/list", method = RequestMethod.POST)
          @ResponseBody
          public Object list(PageRequest pageRequest, @RequestBody Map<String, Object> searchMap) {
            try {
              SearchParams searchParams = new SearchParams();
              searchParams.setSearchMap(searchMap);
                if (pageRequest.getPageSize() == 1) {
                Integer allCount = Integer.MAX_VALUE-1;
                pageRequest = new PageRequest(pageRequest.getPageNumber(), allCount, pageRequest.getSort());
              }
                Page<Map> page = this.statCommonService.selectFieldsByPage(pageRequest, searchParams, MODELCODE);
                ${UpperProjectName}EnumService.fillDynamicList( page.getContent());
                return this.buildSuccess(page);
            } catch (Exception exp) {
              logger.error("exp", exp);
              return this.buildError("msg", "Error querying database", RequestStatusEnum.FAIL_FIELD);
            }
          }
        }
`;




    const formattedController = beautify.js_beautify(result);

    return formattedController;





  
}




//Generate Dao
export const genDao = _state => {
   const { tableSchema, packageName, projectName, tableName } = _state;
   let result = "";
   const className = _.upperFirst(_.camelCase(tableName));


   result+= `
      package ${_.toLower(packageName)}.${_.toLower(projectName)}.dao;
      import com.yonyou.iuap.${_.toLower(projectName)}.entity.${_.upperFirst(_.camelCase(projectName))};
      import com.yonyou.iuap.baseservice.persistence.mybatis.mapper.GenericExMapper;
      import com.yonyou.iuap.mybatis.anotation.MyBatisRepository;
      @MyBatisRepository
      public interface ${_.upperFirst(_.camelCase(projectName))}Mapper extends GenericExMapper<${_.upperFirst(_.camelCase(projectName))}> {
  
      }

   `;


    const formattedDao = beautify.js_beautify(result);

    return formattedDao;

}




//Generate EnumService
export const genEnumService = _state => {
   const { tableSchema, packageName, projectName, tableName } = _state;
   let result = "";
   const UpperTableName = _.upperFirst(_.camelCase(tableName)); 
   const UpperProjectName = _.upperFirst(_.camelCase(projectName));


   result += `

   package ${_.toLower(packageName)}.${_.toLower(projectName)}.service;

  import com.yonyou.iuap.${_.toLower(projectName)}.entity.${_.upperFirst(_.camelCase(projectName))};
  import java.util.ArrayList;
  import java.util.HashMap;
  import java.util.List;
  import java.util.Map;
  import org.springframework.stereotype.Service;
  import com.yonyou.iuap.baseservice.persistence.support.QueryFeatureExtension;
  import com.yonyou.iuap.mvc.type.SearchParams;

  @Service
  public class ${_.upperFirst(_.camelCase(projectName))}EnumService implements QueryFeatureExtension<${_.upperFirst(_.camelCase(projectName))}> {
    private static Map<String, String> sexMap = new HashMap<String, String>(); 
    private static Map<String, String> monthMap = new HashMap<String, String>(); 
    static {
      sexMap.put("0", "女");
      sexMap.put("1", "男");  
      monthMap.put("1", "一月");
      monthMap.put("2", "二月");
      monthMap.put("3", "三月");
      monthMap.put("4", "四月");
      monthMap.put("5", "五月");
      monthMap.put("6", "六月");
      monthMap.put("7", "七月");
      monthMap.put("8", "八月");
      monthMap.put("9", "九月");
      monthMap.put("10", "十月");
      monthMap.put("11", "十一月");
      monthMap.put("12", "十二月"); 
    }

    public static List<Map> fillDynamicList(List<Map> list) {
      for (Map<String, Object> item : list) {
        /*
        if(item.get("sex") != null){
          item.put("sexEnumValue",sexMap.get( String.valueOf(item.get("sex") )  ));
        } 
        */
       
        /*
        if(item.get("month") != null){
          item.put("monthEnumValue",monthMap.get( String.valueOf(item.get("month") )  ));
        }
        */ 
      }
      return list;
    }
    
    @Override
    public List<${_.upperFirst(_.camelCase(projectName))}> afterListQuery(List<${_.upperFirst(_.camelCase(projectName))}> list) {
      List<${_.upperFirst(_.camelCase(projectName))}> resultList = new ArrayList<${_.upperFirst(_.camelCase(projectName))}>();
      for (${_.upperFirst(_.camelCase(projectName))} entity : list) {
        /*
        if (entity.getSex() != null) {
          String value = sexMap.get(entity.getSex().toString());
          entity.setSexEnumValue(value);
        }
        */
       
 

        /*
        if (entity.getMonth() != null) {
          String value = monthMap.get(entity.getMonth().toString());
          entity.setMonthEnumValue(value);
        }
        */
        resultList.add(entity);
      }

      return resultList;
    }

    @Override
    public SearchParams prepareQueryParam(SearchParams searchParams, Class modelClass) {
      return searchParams;
    }  
  }


   `;


   const formattedEnumServie = beautify.js_beautify(result);

   return formattedEnumServie;



}




//Generate Service
export const genService = _state => {
   const { tableSchema, packageName, projectName, tableName } = _state;
   let result = "";
   const UpperTableName = _.upperFirst(_.camelCase(tableName)); 
   const UpperProjectName = _.upperFirst(_.camelCase(projectName));


   result+= `  
      package ${_.toLower(packageName)}.${_.toLower(projectName)}.service;

      import static com.yonyou.iuap.baseservice.intg.support.ServiceFeature.BPM;
      import static com.yonyou.iuap.baseservice.intg.support.ServiceFeature.LOGICAL_DEL;
      import static com.yonyou.iuap.baseservice.intg.support.ServiceFeature.MULTI_TENANT;
      import static com.yonyou.iuap.baseservice.intg.support.ServiceFeature.REFERENCE;
      import static com.yonyou.iuap.baseservice.intg.support.ServiceFeature.REMOTE_REFERENCE;

      import java.util.Date;
      import java.util.List;

      import org.springframework.beans.factory.annotation.Autowired;
      import org.springframework.stereotype.Service;

      import com.yonyou.iuap.${_.toLower(projectName)}.dao.${UpperProjectName}Mapper;
      import com.yonyou.iuap.${_.toLower(projectName)}.entity.${UpperProjectName};
      import com.yonyou.iuap.baseservice.intg.service.GenericIntegrateService;
      import com.yonyou.iuap.baseservice.intg.support.ServiceFeature;
      import com.yonyou.uap.busilog.annotation.LogConfig;

      import cn.hutool.core.date.DateUtil;

      @Service

      /**
       * ${UpperProjectName} CRUD 核心服务,提供逻辑删除/乐观锁
       */
      public class ${UpperProjectName}Service extends GenericIntegrateService<${UpperProjectName}> {

        private ${UpperProjectName}Mapper ${_.camelCase(projectName)}Mapper;

        @Autowired
        public void set${UpperProjectName}Mapper(${UpperProjectName}Mapper ${_.camelCase(projectName)}Mapper) {
          this.${_.camelCase(projectName)}Mapper = ${_.camelCase(projectName)}Mapper;
          super.setGenericMapper(${_.camelCase(projectName)}Mapper);
        }

        /**
         * @CAU 可插拔设计
         * @return 向父类 GenericIntegrateService 提供可插拔的特性声明
         */
        @Override
        protected ServiceFeature[] getFeats() {
          return new ServiceFeature[] { REFERENCE, BPM, MULTI_TENANT, LOGICAL_DEL,REMOTE_REFERENCE };
        }
        
        private static final String DATEFORMAT = "yyyy-MM-dd HH:mm:ss";
        
        @Override
        @LogConfig(busiCode = "${_.camelCase(projectName)}_insertSelective", busiName = "${_.camelCase(projectName)}", operation = "${_.camelCase(projectName)}保存", templateId = "${_.camelCase(projectName)}_insertSelective")
        public ${UpperProjectName} insertSelective(${UpperProjectName} entity) { 
          return super.insertSelective(entity);
        }

        @Override
        @LogConfig(busiCode = "${_.camelCase(projectName)}_updateSelective", busiName = "${_.camelCase(projectName)}", operation = "${_.camelCase(projectName)}修改", templateId = "${_.camelCase(projectName)}_updateSelective")
        public ${UpperProjectName} updateSelective(${UpperProjectName} entity) {
          return super.updateSelective(entity);

        }
        @LogConfig(busiCode = "${_.camelCase(projectName)}_saveMultiple", busiName = "${_.camelCase(projectName)}", operation = "${_.camelCase(projectName)}批量添加", templateId = "${_.camelCase(projectName)}_saveMultiple")
        public void saveMultiple(List<${UpperProjectName}> listData) { 
          super.saveBatch(listData);
        }
        
        @LogConfig(busiCode = "${_.camelCase(projectName)}_updateMultiple", busiName = "${_.camelCase(projectName)}", operation = "${_.camelCase(projectName)}批量修改", templateId = "${_.camelCase(projectName)}_updateMultiple")
        public void updateMultiple(List<${UpperProjectName}> listData) {
          super.saveBatch(listData);
        }

        @Override
        @LogConfig(busiCode = "${_.camelCase(projectName)}_deleteBatch", busiName = "${_.camelCase(projectName)}", operation = "${_.camelCase(projectName)}删除", templateId = "${_.camelCase(projectName)}_deleteBatch")
        public int deleteBatch(List<${UpperProjectName}> list) {
          return super.deleteBatch(list);
        }
        
      }

   `;


    const formattedServie = beautify.js_beautify(result);

    return formattedServie;

}


// Generate Entity
export const genEntity = _state => {
  const { tableSchema, packageName, projectName, tableName } = _state;

  const className = _.upperFirst(_.camelCase(tableName));
  let result = "";

  let absMode = 'AbsDrModel';
  let codingEntity = ''; 

 

  tableSchema.map(item => { 
    if(_.startsWith(item.columnName, 'BPM')){
      console.log('=== abs bpm mode ===')
      absMode = 'AbsBpmModel';
      return ;
    }  
  });


  console.log('=== tableSchema ===')
  console.log(tableSchema)

  tableSchema.map(item => { 
    if(_.get(item, 'at_CodingEntity') == true){
      codingEntity = `@CodingEntity(codingField = "${_.camelCase(item.columnName)}") `;
      return ;
    } 
  });

 




  result += `
      package ${_.toLower(packageName)}.${_.toLower(projectName)}.entity;

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
      import com.yonyou.iuap.baseservice.support.condition.Match; 
      import com.yonyou.iuap.baseservice.entity.annotation.CodingEntity;
      import com.yonyou.iuap.baseservice.entity.annotation.CodingField;
      import com.yonyou.iuap.baseservice.bpm.entity.AbsBpmModel;
      import com.yonyou.iuap.baseservice.statistics.support.StatFunctions;
      import com.yonyou.iuap.baseservice.statistics.support.StatisticsField;

      @JsonIgnoreProperties(ignoreUnknown = true)
      @Table(name = "${tableName}") 
      ${codingEntity}
      public class ${_.upperFirst(_.camelCase(projectName))} extends ${absMode} implements Serializable, MultiTenant{


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
  cell += _item.at_Condition ? "@Condition(match = Match.EQ) \n" : "";


  const colName = _item.columnName;
  const colNameCamel = _.camelCase(colName);
  const colNameUpperCamel = _.upperFirst(_.camelCase(colName));
  const type = _item.type;

  if (_item.at_Id) {

    cell += ` @StatisticsField(functions = { StatFunctions.count })
          protected String ${colNameCamel};

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
  } else if (_item.columnName == "BPM_STATE") {
    cell += `
      
      @Condition(match = Match.EQ)
      @Column(name = "bpm_state")
      private Integer bpmState;

      public Integer getBpmState() {
        return bpmState;
      }

      public void setBpmState(Integer bpmState) {
        this.bpmState = bpmState;
      }


      @Override
      public String getBpmBillCode() {
        return getCode();
      }

      `;
  } else {
    cell += `@Column(name = "${colName}") \n`
    cell += _item.at_CodingEntity ? ` @CodingField(code = "XXXXX") ` : "";
    cell += _item.at_Reference ? ` @Reference(code = "XXXXX", srcProperties = { "XXXXX" }, desProperties = { "XXXXX" }) ` : "";
    cell+=`
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
        <mapper namespace="${packageName}.${lowerProjectName}.dao.${_.upperFirst(_.camelCase(projectName))}Mapper">
        <resultMap id="BaseResultMap" type="${packageName}.${_.toLower(projectName)}.entity.${_.upperFirst(_.camelCase(projectName))}">

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
  let tableName = _data.tableName;


  tableName = _.replace(tableName, '[', '');
  tableName = _.replace(tableName, ']', '');


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
    at_GeneratedValue: false,
    at_CodingEntity:false,
    at_Reference:false
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
