import React, { useState } from "react";
import { Divider, Col, Row } from "antd";
import { Button, Form } from "antd";
import SelectMenu from "../../FormElements/Select/index";
import { tasks } from "../../../data/data";
import Layout from "../../Layout";
import TaskModel from "../../../models/Task.model";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";

type PropsTask = {
  taskAction: string;
  taskType: any;
};

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

export const TaskRequirementForm: React.FC = () => {
  const [selectedTask, setTask] = useState<TaskModel>(null);
  const selectOptions = [];
  tasks.forEach((task) => selectOptions.push({ id: task.id, name: task.id }));

  const onTaskSelect = (taskId) => {
    const [task] = tasks.filter((task) => task.id === taskId);
    setTask({ ...task });
    task.items.map(
      (item) =>
        (initialValues = {
          scopeItems: [
            {
              id: item.id,
              minScore: item.minScore.toString(),
              maxScore: item.maxScore.toString(),
              category: item.category,
              title: item.title,
              description: item.description,
            },
          ],
        })
    );

    // task.items.forEach((item) => {
    //   if (typeof item === "object") {
    //     let keys = Object.keys(item);
    //     keys.forEach((key) => {
    //       console.log(keys);
    //       initialValues = {
    //         scopeItems: [
    //           {
    //             id: item.id,
    //             minScore: item.minScore,
    //             maxScore: item.maxScore,
    //             category: item.category,
    //             title: item.title,
    //             description: item.description,
    //           },
    //         ],
    //       };
    //     });
    //   }
    // });
  };

  const AddNewTask: React.FC<{ task: TaskModel }> = ({ task }) => (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
          >
            <FieldArray name="scopeItems">
              {({ insert, remove, push }) => (
                <div>
                  {values.scopeItems.length > 0 &&
                    values.scopeItems.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label htmlFor={`scopeItems.${index}.id`}>ID</label>
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
                          <label htmlFor={`scopeItems.${index}.minScore`}>
                            Min Score
                          </label>
                          <Field
                            name={`scopeItems.${index}.minScore`}
                            placeholder="scope"
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
                          <label htmlFor={`scopeItems.${index}.maxScore`}>
                            Max Score
                          </label>
                          <Field
                            name={`scopeItems.${index}.maxScore`}
                            placeholder="scope"
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
                          <label htmlFor={`scopeItems.${index}.category`}>
                            Category
                          </label>
                          <Field
                            name={`scopeItems.${index}.category`}
                            placeholder="scope"
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
                          <label htmlFor={`scopeItems.${index}.title`}>
                            Title
                          </label>
                          <Field
                            name={`scopeItems.${index}.title`}
                            placeholder="scope"
                            type="text"
                            className="ant-input"
                          />
                          <ErrorMessage
                            name={`scopeItems.${index}.title`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <h3 />
                        <div className="col">
                          <label htmlFor={`scopeItems.${index}.description`}>
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
                        <Divider orientation="left">Next requirement</Divider>

                        <div className="col">
                          <Button
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  <Button
                    className="secondary"
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
            <button type="submit">Submit</button>
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

      {/* <AddNewTask task={selectedTask} /> */}
      {selectedTask &&
        selectedTask.items.map((item) => (
          <>
            <AddNewTask task={selectedTask} />
          </>
        ))}
    </Layout>
  );
};

export default TaskRequirementForm;
