import React, { Component } from "react";

import { Form, Input, Button, Radio, Select  } from "antd";
import * as _ from "lodash";

import "./index.scss";

const { TextArea } = Input;
const Option = Select.Option;

class SettingArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {  
        this.props.setSettingConfig(values);
      }
    });
  };

  hasErrors = fieldsError => {
    const hasError = Object.keys(fieldsError).some(field => fieldsError[field]);
    return hasError;
  };

 

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const { hasError } = this.state;
 

    return (
      <div className="setting-area">
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          {/* # Table Name */}
     
            <Form.Item  label="# Table Name">
              {getFieldDecorator("tableName", {
                rules: [
                  { required: true, message: "Please input your Table Name!" }
                ]
              })(<Input placeholder="table name" />)}
            </Form.Item>
         

          {/* # Table Schema */}
          <Form.Item label="# Table Schema">
            {getFieldDecorator("tableSchema", {
               initialValue:`
              [ID] [varchar](64) NOT NULL,
              [NAME] [varchar](64) NULL,
              [IS_SON] [decimal](1, 0) NULL,
              [PARENTID] [varchar](64) NULL,
              [CREATE_TIME] [varchar](64) NULL,
              [CREATE_USER] [varchar](64) NULL,
              [LAST_MODIFIED] [varchar](64) NULL,
              [LAST_MODIFY_USER] [varchar](64) NULL,
              [TS] [varchar](64) NULL,
              [DR] [decimal](11, 0) NULL,
              [BPM_STATE] [decimal](11, 0) NULL,
              [TENANT_ID] [varchar](64) NULL,
              [CODE] [varchar](255) NULL
            `,
              rules: [
                { required: true, message: "Please input your Table Schema!" }
              ]
            })(<TextArea rows={10} />)}
          </Form.Item>

          {/* # Package Name */}
          <Form.Item label="# Package Name">
            {getFieldDecorator("packageName", {
              initialValue: 'com.yonyou.iuap',
              rules: [
                { required: true, message: "Please input your Package Name!" }
              ]
            })(<Input placeholder="package name" />)}
          </Form.Item>

          {/* # Project Name */}
          <Form.Item label="# Project Name">
            {getFieldDecorator("projectName", {
              rules: [
                { required: true, message: "Please input your Project Name!" }
              ]
            })(<Input placeholder="project name" />)}
          </Form.Item>


          {/* # Project Type */}
          {/*

            <Form.Item label="# Project Type">
            {getFieldDecorator("projectType", {
              initialValue:`A3`,
              rules: [
                { required: true, message: "Please input your Project Type!" }
              ]
            })(<Select  >
                <Option value="A1" disabled>A1 單表查詢</Option>
                <Option value="A2">A2 單表行編輯</Option>
                <Option value="A3">A3 單表彈窗</Option>
                <Option value="B1" disabled>B1 左樹右表</Option>
                <Option value="B2" disabled>B2 ㄧ主ㄧ子</Option>
                <Option value="B3" disabled>B3 ㄧ主多子</Option> 
              </Select>
            )}
          </Form.Item>

 
          */}


          {/* Submit Button  */}
          <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                disabled={this.hasErrors(getFieldsError())}
            >
                Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(SettingArea);
