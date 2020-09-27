import styles from "./TaskForm.module.css";
import React, { useState } from "react";
import { Divider, Col, InputNumber, Button, Row } from "antd";
import SelectMenu from "../FormElements/Select/index";
import { tasks } from "../../data/data";
import Layout from "../Layout";
import TaskModel from "../../models/Task.model";
import { Formik, Field, ErrorMessage, FieldArray, Form } from "formik";

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

const correctTask = [];

let initialEditValues = {
  correctTask,
};

export const TaskForm: React.FC = () => {
  const [selectedTask, setTask] = useState<TaskModel>(null);
  const selectOptions = [];
  tasks.forEach((task) => selectOptions.push({ id: task.id, name: task.id }));

  const onTaskSelect = (taskId) => {
    const [task] = tasks.filter((task) => task.id === taskId);
    setTask({ ...task });
    task.items.forEach((item) =>
      correctTask.push({
        id: task.id,
        minScore: item.minScore,
        maxScore: item.maxScore,
        category: item.category,
        title: item.title,
        description: item.description,
      })
    );
  };

  const EditTask: React.FC<{ task: TaskModel }> = ({ task }) => (
    <div>
      <Divider orientation="left">Edit current task</Divider>
      <Formik
        initialValues={initialEditValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form className={styles.Container}>
            <FieldArray name="correctTask">
              {({ insert, remove, push }) => (
                <div>
                  {values.correctTask.length > 0 &&
                    values.correctTask.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label
                            htmlFor={`correctTask.${index}.id`}
                            className={styles.RequirementName}
                          >
                            Task name
                          </label>
                          <Field
                            name={`correctTask.${index}.id`}
                            placeholder="task name"
                            type="text"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`correctTask.${index}.id`}
                            component="div"
                            className="field-error"
                          />
                        </div>

                        <div className="col">
                          <label
                            htmlFor={`correctTask.${index}.minScore`}
                            className={styles.RequirementName}
                          >
                            Min Score
                          </label>
                          <Field
                            name={`correctTask.${index}.minScore`}
                            placeholder="minScore"
                            type="text"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`correctTask.${index}.minScore`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor={`correctTask.${index}.maxScore`}
                            className={styles.RequirementName}
                          >
                            Max Score
                          </label>
                          <Field
                            name={`correctTask.${index}.maxScore`}
                            placeholder="maxScore"
                            type="text"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`correctTask.${index}.maxScore`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor={`correctTask.${index}.category`}
                            className={styles.RequirementName}
                          >
                            Category
                          </label>
                          <Field
                            name={`correctTask.${index}.category`}
                            placeholder="category"
                            type="text"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`correctTask.${index}.category`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor={`correctTask.${index}.title`}
                            className={styles.RequirementName}
                          >
                            Title
                          </label>
                          <Field
                            name={`correctTask.${index}.title`}
                            placeholder="title"
                            type="text"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`correctTask.${index}.title`}
                            component="div"
                            className="field-error"
                          />
                        </div>

                        <div className="col">
                          <label
                            htmlFor={`correctTask.${index}.description`}
                            className={styles.RequirementName}
                          >
                            Description
                          </label>
                          <Field
                            className="ant-input"
                            name={`correctTask.${index}.description`}
                            placeholder="description"
                            type="text"
                          />
                          <ErrorMessage
                            name={`correctTask.${index}.description`}
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

  const AddTask: React.FC = () => (
    <div>
      <Divider orientation="left">Add new task</Divider>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
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
                            type="text"
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
                            type="text"
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
            <button type="submit" className={styles.ButtonSubmit}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );

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
      {<AddTask /> || selectedTask}
      {selectedTask && (
        <>
          <EditTask task={selectedTask} />
        </>
      )}
    </Layout>
  );
};

export default TaskForm;
