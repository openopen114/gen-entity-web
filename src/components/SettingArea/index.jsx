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
        console.log("Received values of form: ", values);
        this.getTableSchemaArray(values.tableSchema);
      }
    });
  };

  hasErrors = fieldsError => {
    const hasError = Object.keys(fieldsError).some(field => fieldsError[field]);
    return hasError;
  };

  getTableSchemaArray = _tableSchema => {
    /*
      [CREATE_USER] varchar(64) NULL ,
      [LAST_MODIFIED] varchar(64) NULL ,
      [LAST_MODIFY_USER] varchar(64) NULL ,
      [TS] varchar(64) NULL ,
    */
    console.log(_tableSchema);

    let data = _.replace(_tableSchema, /\[/g, "");
    data = _.replace(data, /\]/g, "");
    data = _.replace(data, /\,/g, "");
    data = _.split(data, "\n");
    // data = data.map(x => _.trim(x));
    data = _.filter(data, function(o) {
      return o !== "";
    });

    console.log(data);

    return data;
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
      <div>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          {/* # Table Name */}
          <Form.Item label="# Table Name">
            <Form.Item>
              {getFieldDecorator("tableName", {
                rules: [
                  { required: true, message: "Please input your Table Name!" }
                ]
              })(<Input placeholder="table name" />)}
            </Form.Item>
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
