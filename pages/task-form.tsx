import React, { useEffect, useState } from "react";
import styles from "../components/TaskForm/TaskForm.module.css";
import { Divider, Alert, Col, InputNumber, Button, Row, Modal } from "antd";
import SelectMenu from "../components/FormElements/Select";
import Layout from "../components/Layout";
import TaskModel from "../models/Task.model";
import { Formik, Field, ErrorMessage, FieldArray, Form } from "formik";

const page: React.FC = () => {
  let initialValues = {
    scopeItems: [
      {
        id: "",
        minScore: "",
        maxScore: "",
        category: "",
        title: "",
        description: "",
      },
    ],
  };

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

  const editTask = [];

  let initialEditValues = {
    editTask,
  };

  if (selectedTask) {
    selectedTask.items.forEach((item) =>
      editTask.push({
        id: selectedTask.name,
        minScore: item.minScore,
        maxScore: item.maxScore,
        category: item.category,
        title: item.title,
        description: item.description,
      })
    );
  }

  async function onSubmitEdit(values) {
    await new Promise((r) => setTimeout(r, 500));
    //alert(JSON.stringify(values, null, 2));
    const taskItems = values;
    const taskName = Object.keys(values.editTask).map((key) => ({
      name: values.editTask[key].id,
    }));
    const addTaskName = taskName.find((item) => item.name);
    const taskFormItem = {
      name: Object.values(addTaskName).toString(),
      author: "lisenokfoxy",
      categoriesOrder: ["Basic Scope", "Extra Scope", "Fines"],
      items: taskItems.editTask,
    };
    //alert(JSON.stringify(taskFormItem));
    if (selectedTask) {
      fetch(`http://localhost:3004/tasks/${selectedTask.id}`, {
        method: "PUT",
        body: JSON.stringify(taskFormItem),
        headers: { "Content-Type": "application/json" },
      }).then((res) => alert("Task updated"));
    }
  }

  const EditTask: React.FC<{ task: TaskModel }> = ({ task }) => (
    <div>
      <Divider orientation="left">Edit current task</Divider>
      <Formik initialValues={initialEditValues} onSubmit={onSubmitEdit}>
        {({ values }) => (
          <Form className={styles.Container}>
            <FieldArray name="editTask">
              {({ insert, remove, push }) => (
                <div>
                  {values.editTask.length > 0 &&
                    values.editTask.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label
                            htmlFor={`editTask.${index}.id`}
                            className={styles.RequirementName}
                          >
                            Task name
                          </label>
                          <Field
                            name={`editTask.${index}.id`}
                            placeholder="task name"
                            type="text"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`editTask.${index}.id`}
                            component="div"
                            className="field-error"
                          />
                        </div>

                        <div className="col">
                          <label
                            htmlFor={`editTask.${index}.minScore`}
                            className={styles.RequirementName}
                          >
                            Min Score
                          </label>
                          <Field
                            name={`editTask.${index}.minScore`}
                            placeholder="minScore"
                            type="number"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`editTask.${index}.minScore`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor={`editTask.${index}.maxScore`}
                            className={styles.RequirementName}
                          >
                            Max Score
                          </label>
                          <Field
                            name={`editTask.${index}.maxScore`}
                            placeholder="maxScore"
                            type="number"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`editTask.${index}.maxScore`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor={`editTask.${index}.category`}
                            className={styles.RequirementName}
                          >
                            Category
                          </label>
                          <Field
                            name={`editTask.${index}.category`}
                            placeholder="category"
                            type="text"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`editTask.${index}.category`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor={`editTask.${index}.title`}
                            className={styles.RequirementName}
                          >
                            Title
                          </label>
                          <Field
                            name={`editTask.${index}.title`}
                            placeholder="title"
                            type="text"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`editTask.${index}.title`}
                            component="div"
                            className="field-error"
                          />
                        </div>

                        <div className="col">
                          <label
                            htmlFor={`editTask.${index}.description`}
                            className={styles.RequirementName}
                          >
                            Description
                          </label>
                          <Field
                            className="ant-input"
                            name={`editTask.${index}.description`}
                            placeholder="description"
                            type="text"
                          />
                          <ErrorMessage
                            name={`editTask.${index}.description`}
                            component="div"
                            className="field-error"
                          />
                        </div>

                        <div className="col">
                          <Button
                            className={styles.Button}
                            onClick={() => remove(index)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  <Button
                    className={styles.Button}
                    onClick={() =>
                      push({
                        id: "",
                        minScore: "",
                        maxScore: "",
                        category: "",
                        title: "",
                        description: "",
                      })
                    }
                  >
                    Add task requirements
                  </Button>
                </div>
              )}
            </FieldArray>
            <button type="submit" className={styles.ButtonSubmit}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );

  const onSubmitAdd = (values) => {
    new Promise((r) => setTimeout(r, 500));
    //alert(JSON.stringify(values, null, 2));
    const taskItems = values;
    const taskName = Object.keys(values.scopeItems).map((key) => ({
      name: values.scopeItems[key].id,
    }));
    const addTaskName = taskName.find((item) => item.name);
    const taskFormItem = {
      name: Object.values(addTaskName).toString(),
      author: "lisenokfoxy",
      categoriesOrder: ["Basic Scope", "Extra Scope", "Fines"],
      items: taskItems.scopeItems,
    };
    console.log("New task added");

    //alert(JSON.stringify(taskFormItem, null, 2));

    fetch("http://localhost:3004/tasks/", {
      method: "POST",
      body: JSON.stringify(taskFormItem),
      headers: { "Content-Type": "application/json" },
    }).then((res) => alert("Task submitted"));
  };

  const AddTask: React.FC<{}> = () => (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmitAdd}>
        {({ values }) => (
          <Form className={styles.Container}>
            <FieldArray name="scopeItems">
              {({ insert, remove, push }) => (
                <div>
                  {values.scopeItems.length > 0 &&
                    values.scopeItems.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label
                            htmlFor={`scopeItems.${index}.id`}
                            className={styles.RequirementName}
                          >
                            Task name
                          </label>
                          <Field
                            name={`scopeItems.${index}.id`}
                            placeholder="task name"
                            type="text"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`scopeItems.${index}.id`}
                            component="div"
                            className="field-error"
                          />
                        </div>

                        <div className="col">
                          <label
                            htmlFor={`scopeItems.${index}.minScore`}
                            className={styles.RequirementName}
                          >
                            Min Score
                          </label>
                          <Field
                            name={`scopeItems.${index}.minScore`}
                            placeholder="minScore"
                            type="number"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`scopeItems.${index}.minScore`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor={`scopeItems.${index}.maxScore`}
                            className={styles.RequirementName}
                          >
                            Max Score
                          </label>
                          <Field
                            name={`scopeItems.${index}.maxScore`}
                            placeholder="maxScore"
                            type="number"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`scopeItems.${index}.maxScore`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor={`scopeItems.${index}.category`}
                            className={styles.RequirementName}
                          >
                            Category
                          </label>
                          <Field
                            name={`scopeItems.${index}.category`}
                            placeholder="category"
                            type="text"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`scopeItems.${index}.category`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor={`scopeItems.${index}.title`}
                            className={styles.RequirementName}
                          >
                            Title
                          </label>
                          <Field
                            name={`scopeItems.${index}.title`}
                            placeholder="title"
                            type="text"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`scopeItems.${index}.title`}
                            component="div"
                            className="field-error"
                          />
                        </div>

                        <div className="col">
                          <label
                            htmlFor={`scopeItems.${index}.description`}
                            className={styles.RequirementName}
                          >
                            Description
                          </label>
                          <Field
                            className="ant-input"
                            name={`scopeItems.${index}.description`}
                            placeholder="description"
                            type="text"
                          />
                          <ErrorMessage
                            name={`scopeItems.${index}.description`}
                            component="div"
                            className="field-error"
                          />
                        </div>

                        <div className="col">
                          <Button
                            className={styles.Button}
                            onClick={() => remove(index)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  <Button
                    className={styles.Button}
                    onClick={() =>
                      push({
                        id: "",
                        minScore: "",
                        maxScore: "",
                        category: "",
                        title: "",
                        description: "",
                      })
                    }
                  >
                    Add task requirements
                  </Button>
                </div>
              )}
            </FieldArray>
            <Button htmlType="submit" className={styles.ButtonSubmit}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );

  class AddTaskForm extends React.Component {
    state = { loading: false, visible: false };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    handleCancel = () => {
      this.setState({ visible: false });
    };

    render() {
      const { visible, loading } = this.state;
      return (
        <>
          <Button
            className="NewTaskButton"
            type="primary"
            onClick={this.showModal}
          >
            Create new task
          </Button>
          <Modal
            visible={visible}
            title="Create new task"
            onCancel={this.handleCancel}
            width={1000}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Cancel
              </Button>,
            ]}
          >
            <AddTask></AddTask>
          </Modal>
        </>
      );
    }
  }

  return (
    <Layout withHeader={true}>
      <Row className="AlignCenter">
        <Col span={24}>
          {<AddTaskForm /> || selectedTask}
          <Divider type="vertical"></Divider>
          <Divider type="vertical"></Divider>
          <SelectMenu
            selectOptions={selectOptions}
            placeholder={"Select existing task..."}
            onSelect={(taskId) => onTaskSelect(taskId)}
          />
        </Col>
      </Row>

      {selectedTask && (
        <>
          <EditTask task={selectedTask} />
        </>
      )}
    </Layout>
  );
};

export default page;
