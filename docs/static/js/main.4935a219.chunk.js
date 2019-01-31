(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{162:function(e,t,n){e.exports=n(336)},167:function(e,t,n){},171:function(e,t,n){},273:function(e,t,n){},329:function(e,t,n){e.exports=n.p+"static/media/index.d41d8cd9.less"},332:function(e,t,n){},336:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),r=n(8),i=n.n(r),c=(n(167),n(80)),l=n(35),s=n(36),m=n(39),u=n(37),p=n(40),d=n(12),b=n(144),g=n(145),f=n(339),h=n(338),y=n(143),v=(n(171),f.a.TextArea),E=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),n.props.form.validateFields(function(e,t){e||(console.log("Received values of form: ",t),n.props.setSettingConfig(t))})},n.hasErrors=function(e){return Object.keys(e).some(function(t){return e[t]})},n.state={},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props.form,t=e.getFieldDecorator,n=e.getFieldsError;e.getFieldError,e.isFieldTouched,this.state.hasError;return o.a.createElement("div",{className:"setting-area"},o.a.createElement(h.a,{layout:"vertical",onSubmit:this.handleSubmit},o.a.createElement(h.a.Item,{label:"# Table Name"},t("tableName",{rules:[{required:!0,message:"Please input your Table Name!"}]})(o.a.createElement(f.a,{placeholder:"table name"}))),o.a.createElement(h.a.Item,{label:"# Table Schema"},t("tableSchema",{rules:[{required:!0,message:"Please input your Table Schema!"}]})(o.a.createElement(v,{rows:10}))),o.a.createElement(h.a.Item,{label:"# Package Name"},t("packageName",{initialValue:"com.yonyou.iuap",rules:[{required:!0,message:"Please input your Package Name!"}]})(o.a.createElement(f.a,{placeholder:"package name"}))),o.a.createElement(h.a.Item,{label:"# Project Name"},t("projectName",{rules:[{required:!0,message:"Please input your Project Name!"}]})(o.a.createElement(f.a,{placeholder:"project name"}))),o.a.createElement(h.a.Item,null,o.a.createElement(y.a,{type:"primary",htmlType:"submit",disabled:this.hasErrors(n())},"Submit"))))}}]),t}(a.Component),N=h.a.create()(E),C=n(337),S=n(108),j=(n(273),S.a.Group),T=[{label:"@Id",value:"at_Id"},{label:"@GeneratedValue",value:"at_GeneratedValue"},{label:"@Condition",value:"at_Condition"}],k=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(m.a)(this,Object(u.a)(t).call(this,e))).onChange=function(e,t){var a=n.props.tableSchema,o={at_Id:!1,at_Condition:!1,at_GeneratedValue:!1};t.map(function(e){o[e]=!0}),a[e]=Object(c.a)({},a[e],o)},n.updateAnnotationConfig=function(){var e=n.props.tableSchema;n.props.updateAnnotationConfig(e)},n.state={tableSchema:[],indeterminate:!0},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;console.log("this.props"),console.log(this.props);var t=this.props.tableSchema,n=[{title:"Column Name",dataIndex:"columnName",key:"columnName"},{title:"Type",dataIndex:"type",key:"type"},,{title:"Annotation",key:"Annotation",render:function(t,n,a){return o.a.createElement(j,{options:T,onChange:e.onChange.bind(e,a)})}}];return o.a.createElement("div",{className:"annotation-table"},o.a.createElement("h1",{className:"text-gradient"},"@ Annotation"),o.a.createElement(C.a,{columns:n,dataSource:t,pagination:!1}),o.a.createElement(y.a,{type:"primary",onClick:this.updateAnnotationConfig},"Generate Entity & XML"))}}]),t}(a.Component),I=n(114),M=n(160),O=n.n(M),A=(n(329),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(m.a)(this,Object(u.a)(t).call(this,e))).state={},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.codeStr,n=e.lang;return o.a.createElement(I.a,Object.assign({},I.b,{theme:O.a,code:t,language:n}),function(e){var t=e.className,n=e.style,a=e.tokens,r=e.getLineProps,i=e.getTokenProps;return o.a.createElement("pre",{className:t,style:n},a.map(function(e,t){return o.a.createElement("div",r({line:e,key:t}),e.map(function(e,t){return o.a.createElement("span",i({token:e,key:t}))}))}))})}}]),t}(a.Component)),w=(n(330),n(332),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(m.a)(this,Object(u.a)(t).call(this,e))).ignoreColumnName=["CREATE_TIME","CREATE_USER","LAST_MODIFIED","LAST_MODIFY_USER","TS","DR"],n.setSettingConfig=function(e){var t=d.toLower(e.packageName),a=d.upperFirst(d.camelCase(e.projectName)),o=e.tableName,r=e.tableSchema,i=new Map;i.set("VAR","String"),i.set("DEC","Double"),i.set("INT","Integer");var l=n.formatTableSchemaToArray(r);r=[];for(var s={at_Id:!1,at_Condition:!1,at_GeneratedValue:!1},m=0;m<l.length;m+=2){var u={};u.columnName=l[m],u.type=i.get(d.toUpper(l[m+1]).substring(0,3)),u.key=l[m],u=Object(c.a)({},u,s),r.push(u)}n.setState({packageName:t,projectName:a,tableName:o,tableSchema:r})},n.updateAnnotationConfig=function(e){n.setState({tableSchema:e},function(){n.genEntity(),n.genXML()})},n.genEntity=function(){var e=n.state,t=e.tableSchema,a=(e.packageName,e.projectName),o=e.tableName,r=d.upperFirst(d.camelCase(o)),i="";i+="\n      package com.yonyou.iuap.".concat(d.toLower(a),'.entity;\n\n      import java.io.Serializable;\n      import java.math.BigDecimal;\n\n      import javax.persistence.Column;\n      import javax.persistence.Id;\n      import javax.persistence.Table;\n      import javax.persistence.Transient;\n\n      import com.fasterxml.jackson.annotation.JsonIgnoreProperties;\n      import com.yonyou.iuap.baseservice.entity.AbsDrModel;\n      import com.yonyou.iuap.baseservice.entity.annotation.Associative;\n      import com.yonyou.iuap.baseservice.entity.annotation.Reference;\n      import com.yonyou.iuap.baseservice.support.condition.Condition;\n      import com.yonyou.iuap.baseservice.support.generator.GeneratedValue;\n      import com.yonyou.iuap.baseservice.multitenant.entity.MultiTenant;\n\n      @JsonIgnoreProperties(ignoreUnknown = true)\n      @Table(name = "').concat(o,'") \n      public class ').concat(r," extends AbsDrModel implements Serializable, MultiTenant{\n\n\n    "),t.map(function(e){n.ignoreColumnName.includes(e.columnName)||(i+=n.getEntityCell(e))}),i+="} ";var c=b.js_beautify(i);n.setState({formattedEntity:c})},n.getEntityCell=function(e){var t="";t+=e.at_Id?"@Id \n ":"",t+=e.at_GeneratedValue?"@GeneratedValue \n ":"",t+=e.at_Condition?"@Condition \n":"";var n=e.columnName,a=d.camelCase(n),o=d.upperFirst(d.camelCase(n)),r=e.type;return e.at_Id?t+="protected String ".concat(a,";\n\n          @Override\n          public String getId() {\n            return ").concat(a,";\n          }\n\n          @Override\n          public void set").concat(o,"(Serializable id) {\n            this.").concat(a," = id.toString();\n            super.id = id;\n          }\n\n          public void set").concat(o,"(String id) {\n            this.").concat(a," = id;\n          }\n\n    "):"TENANT_ID"==e.columnName?t+='\n      \n      @Condition\n      @Column(name = "TENANT_ID")\n      private String tenantid;\n\n      public String getTenantid() {\n        return this.tenantid;\n      }\n\n      public void setTenantid(String tenantid) {\n        this.tenantid = tenantid;\n      }\n\n      ':t+='@Column(name = "'.concat(n,'")\n      private ').concat(r," ").concat(a,";  \n\n      public void set").concat(o,"(").concat(r," ").concat(a,") {\n        this.").concat(a," = ").concat(a,";\n      }\n\n      public ").concat(r," get").concat(o,"() {\n        return this.").concat(a,";\n      }\n\n    "),t},n.formatTableSchemaToArray=function(e){var t=d.split(e,"["),n=new RegExp("]");return t=d.filter(t,function(e){return n.test(e)}),t=d.map(t,function(e){return d.split(e,"]")[0]}),t=d.filter(t,function(e){return""!==e&&"\n"!==e})},n.genXML=function(){var e=n.state,t=e.tableSchema,a=e.packageName,o=e.projectName,r=e.tableName,i=d.toLower(d.camelCase(o)),c=(d.upperFirst(d.camelCase(o)),d.upperFirst(d.camelCase(r))),l=new Map;l.set("String","VARCHAR"),l.set("Double","DECIMAL"),l.set("Integer","INTEGER");var s="";s+='<?xml version="1.0" encoding="UTF-8"?>\n        <mapper namespace="'.concat(a,".").concat(i,".dao.").concat(c,'Mapper">\n        <resultMap id="BaseResultMap" type="').concat(a,".").concat(c,'.entity.MachineD18">\n\n   '),t.map(function(e){e.at_Id?s+='<id column="'.concat(e.columnName,'" jdbcType="').concat(l.get(e.type),'" property="').concat(d.toLower(d.camelCase(e.columnName)),'" /> \n'):s+='<result column="'.concat(e.columnName,'" jdbcType="').concat(l.get(e.type),'" property="').concat(d.camelCase(e.columnName),'" /> \n')}),s+="\n   </resultMap>\n  \n\n  ",s+='\n    <select id="selectAllByPage" resultMap="BaseResultMap">\n    SELECT t.* FROM '.concat(r,' t WHERE 1 =1 and t.dr=0\n      <if test="condition != null">\n\n    '),t.map(function(e){s+='\n      <if test="condition.searchMap.'.concat(d.camelCase(e.columnName),"!=null and condition.searchMap.").concat(d.camelCase(e.columnName),"!='' \">\n        and t.").concat(e.columnName," = #{condition.searchMap.").concat(d.camelCase(e.columnName),"}\n      </if>\n    ")}),s+='\n      </if>\n        order by ts desc\n        <if test="page != null">\n          <if test="page.sort!=null">\n            <foreach collection="page.sort" item="item" separator=" ">\n              ,${item.property} ${item.direction}\n            </foreach>\n          </if>\n        </if>\n      </select>\n    </mapper>\n  ';var m=(new g).beautify(s,{indent:"  ",useSelfClosingElement:!0});n.setState({formattedXml:m})},n.state={packageName:"",projectName:"",tableName:"",tableSchema:[],formattedEntity:"",formattedXml:""},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.state,t=(e.packageName,e.projectName,e.tableName,e.tableSchema),n=e.formattedEntity,a=e.formattedXml;return o.a.createElement("div",{className:"App"},o.a.createElement("h1",{className:"app-title"},"ENTITY & XML GENERATOR"),o.a.createElement(N,{setSettingConfig:this.setSettingConfig}),o.a.createElement(k,{tableSchema:t,updateAnnotationConfig:this.updateAnnotationConfig}),o.a.createElement("h1",{className:"result-title"},"Generate Entity Result"),o.a.createElement(A,{codeStr:n,lang:"java"}),o.a.createElement("h1",{className:"result-title"},"Generate XML Result"),o.a.createElement(A,{codeStr:a,lang:"xml"}))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[162,2,1]]]);
//# sourceMappingURL=main.4935a219.chunk.js.map