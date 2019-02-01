import React, { Component } from "react";

import { Form, Input, Button, Radio } from "antd";
import * as _ from "lodash";

import "./index.scss";

const { TextArea } = Input;

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
