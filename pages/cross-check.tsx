import React, { useState } from "react";
import Layout from "../components/Layout";
import AssessmentForm from "../components/AssessmentForm";
import SelectMenu from "../components/FormElements/Select";
import { tasks } from "./../data/data";
import { Col, Input, Row, Form } from "antd";
import TaskModel from "../models/Task.model";

const page: React.FC = () => {
  const [selectedTask, setTask] = useState<TaskModel>(null);
  const selectOptions = [];
  tasks.forEach((task) => selectOptions.push({ id: task.id, name: task.id }));

  const onTaskSelect = (taskId) => {
    const [task] = tasks.filter((task) => task.id === taskId);
    setTask({ ...task });
  };

  const submitForm = (values) => {
    console.log(values);
  };

  return (
    <Layout withHeader={true}>
      <Row className="AlignCenter">
        <Col span={24}>
          <SelectMenu
            selectOptions={selectOptions}
            placeholder={"Choose task"}
            onSelect={(taskId) => onTaskSelect(taskId)}
          />
        </Col>
      </Row>
      {selectedTask && (
        <>
          <Row className="AlignCenter">
            <Col span={24}>
              <div>
                <a>Link to student's demo</a>
              </div>
              <div>
                <a>Link to student's PR</a>
              </div>
            </Col>
          </Row>
          <AssessmentForm
            task={selectedTask}
            handleSubmit={(values) => submitForm(values)}
            isCrossCheck={true}
          />
        </>
      )}
    </Layout>
  );
};

export default page;
