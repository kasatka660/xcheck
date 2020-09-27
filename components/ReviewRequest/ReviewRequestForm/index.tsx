import React, { useEffect, useState } from "react";
import styles from "./ReviewRequest.module.css";
import { Formik } from "formik";
import { Button, Col, Row, Form, Input, Modal, Steps } from "antd";
import SelectMenu from "../../FormElements/Select";
import TaskModel from "../../../models/Task.model";
import ReviewRequestModel from "../../../models/ReviewRequest.model";
import AssessmentForm from "../../AssessmentForm";
import SelfEsteemModel from "../../../models/SelfEsteem.model";

const { Step } = Steps;

const ReviewRequestForm: React.FC = () => {
  const [allTasks, setTasksArray] = useState<TaskModel[]>([]);
  const [selectedTask, setTask] = useState<TaskModel>(null);

  const taskSelectOptions = [];
  useEffect(() => {
    fetch("http://localhost:3004/tasks")
      .then((res) => res.json())
      .then((res) => setTasksArray(res));
  }, []);

  allTasks.forEach((task) =>
    taskSelectOptions.push({ id: task.id, name: task.name })
  );

  const onTaskSelect = (taskId) => {
    const [task] = allTasks.filter((task) => task.id === taskId);
    setTask({ ...task });
  };

  useEffect(() => {
    fetch("http://localhost:3004/tasks")
      .then((res) => res.json())
      .then((res) => setTasksArray(res));
  }, []);

  const initialValues = {
    linkToPR: "",
    linkToDemo: "",
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

  class AssessmentModalForm extends React.Component {
    state = { visible: false };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    handleCancel = () => {
      this.setState({ visible: false });
    };

    render() {
      const { visible } = this.state;
      return (
        <>
          <Steps progressDot direction="vertical">
            <Step title="Step 1"></Step>
          </Steps>
          <Button
            className="NewTaskButton"
            type="primary"
            onClick={this.showModal}
          >
            Click to assess yourself
          </Button>
          <Steps progressDot direction="vertical">
            <Step title="Step 2"></Step>
          </Steps>
          <Modal
            visible={visible}
            onCancel={this.handleCancel}
            width={1000}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Cancel
              </Button>,
            ]}
          >
            <AssessmentForm
              task={selectedTask}
              handleSubmit={(values) => submitForm(values)}
            />
          </Modal>
        </>
      );
    }
  }

  return (
    <div className="AlignCenter" style={{ maxWidth: "400px" }}>
      <SelectMenu
        selectOptions={taskSelectOptions}
        placeholder="Select Task"
        onSelect={(taskId) => onTaskSelect(taskId)}
      />

      {selectedTask && (
        <>
          <AssessmentModalForm />
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              const reviewRequestItem: ReviewRequestModel = {
                author: "kasatka660",
                task: selectedTask.id,
                selfEsteem: null,
                solution: {
                  pr: values.linkToPR,
                  demo: values.linkToDemo,
                },
              };
              fetch("http://localhost:3004/review-requests/", {
                method: "POST",
                body: JSON.stringify(reviewRequestItem),
                headers: { "Content-Type": "application/json" },
              }).then((res) => alert("Form submitted"));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Form.Item>
                  <Input
                    placeholder="Link to your PR"
                    style={{ width: 400 }}
                    type="text"
                    name="linkToPR"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.linkToPR}
                  />
                </Form.Item>

                <Form.Item>
                  <Input
                    placeholder="Link to your demo"
                    style={{ width: 400 }}
                    type="text"
                    name="linkToDemo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.linkToDemo}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size={"large"}
                  shape={"round"}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default ReviewRequestForm;
