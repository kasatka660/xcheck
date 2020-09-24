import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AssessmentForm from "../components/AssessmentForm";
import SelectMenu from "../components/FormElements/Select";
import { Col, Input, Row, Form } from "antd";
import TaskModel from "../models/Task.model";
import SelfEsteemModel from "../models/SelfEsteem.model";

const page: React.FC = () => {
  const [allTasks, setTasksArray] = useState<TaskModel[]>([]);
  const [selectedTask, setTask] = useState<TaskModel>(null);
  const selectOptions = [];
  useEffect(() => {
    fetch("http://localhost:3004/tasks")
      .then((res) => res.json())
      .then((res) => setTasksArray(res));
  }, []);

  allTasks.forEach((task) =>
    selectOptions.push({ id: task.id, name: task.name })
  );

  const onTaskSelect = (taskId) => {
    const [task] = allTasks.filter((task) => task.id === taskId);
    setTask({ ...task });
  };

  const submitForm = (values) => {
    const gradeItems = Object.keys(values.items).map((key) => ({
      requirementId: key,
      estimate: values.items[key].estimate,
      comment: values.items[key].comment,
    }));
    const selfEsteemItem: SelfEsteemModel = {
      /* Temporary student. */
      student: "kasatka660",
      task: selectedTask.id,
      gradeItems: gradeItems,
    };
    fetch("http://localhost:3004/self-esteems/", {
      method: "POST",
      body: JSON.stringify(selfEsteemItem),
      headers: { "Content-Type": "application/json" },
    }).then((res) => alert("Form submitted"));
  };

  return (
    <Layout withHeader={true}>
      <Row className="AlignCenter">
        <Col span={24}>
          <SelectMenu
            selectOptions={selectOptions}
            placeholder={"Select task"}
            onSelect={(taskId) => onTaskSelect(taskId)}
          />
        </Col>
      </Row>
      {selectedTask && (
        <>
          {/*<Row className="AlignCenter">
            <Col span={24}>
              <Form.Item>
                <Input placeholder="Link to your demo" style={{ width: 400 }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Input placeholder="Link to your PR" style={{ width: 400 }} />
              </Form.Item>
            </Col>
          </Row>*/}
          <AssessmentForm
            task={selectedTask}
            handleSubmit={(values) => submitForm(values)}
          />
        </>
      )}
    </Layout>
  );
};

export default page;
