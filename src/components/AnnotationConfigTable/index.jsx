import React, { Component } from "react";

import { Table, Divider, Tag } from "antd";
import { Checkbox } from "antd";
import { Button } from 'antd';

import "./index.scss";

const CheckboxGroup = Checkbox.Group;

// const plainOptions = ['@Id', '@Condition', '@3333'];

const plainOptions = [
  { label: "@Id", value: "at_Id" },
  { label: "@GeneratedValue", value: "at_GeneratedValue" },
  { label: "@Condition", value: "at_Condition" }
];

class AnnotationConfigTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tableSchema: [],

      indeterminate: true
    };
  }

  componentDidMount() {}

  onChange = (_index, _checkedData) => { 
    const { tableSchema } = this.props;

 
    const annotation = {
      at_Id: false,
      at_Condition: false,
      at_GeneratedValue:false
    };

    _checkedData.map(item => {
      annotation[item] = true;
    });

    tableSchema[_index] = {
      ...tableSchema[_index],
      ...annotation
    };

 

    // this.setState({ tableSchema });

  
  };


  updateAnnotationConfig = () => {
     const { tableSchema } = this.props;
    this.props.updateAnnotationConfig(tableSchema)
  }




  render() {
    console.log("this.props");
    console.log(this.props);

    const {  tableSchema } = this.props;

    const columns = [
      {
        title: "Column Name",
        dataIndex: "columnName",
        key: "columnName"
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type"
      },
      ,
      {
        title: "Annotation",
        key: "Annotation",
        render: (text, record, index) => (
          <CheckboxGroup
            options={plainOptions}
            onChange={this.onChange.bind(this, index)}
          />
        )
      }
    ];

    return (
      <div className="annotation-table">
        <h1 className="text-gradient">@ Annotation</h1>
        <Table columns={columns} dataSource={tableSchema} pagination={false} />
        <Button type="primary" onClick={this.updateAnnotationConfig}>Generate Entity & XML</Button>
      </div>
    );
  }
}

export default AnnotationConfigTable;
