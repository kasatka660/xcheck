import React, { Fragment } from "react";
import { Formik } from "formik";
import { Form, InputNumber, Radio, Checkbox, Row, Col, Button } from "antd";
import styles from "./AssessmentForm.module.css";
import { task } from "../../data/data";
import TaskRequirementModel from "../../models/TaskRequirement.model";
import TaskRequirement from "./TaskRequirement";
import RequirementImplementationOptions from "../../constants/requirement-implementation-options";

export interface TaskRequirementValues {
  implementationPercentage?: number;
  applyFine?: boolean;
  estimate: number;
  comment: string;
}

interface FormValues {
  items: TaskRequirementValues[];
}

const AssessmentForm: React.FC = () => {
  const initialValues = { items: [] };
  task.items.forEach((item) => {
    initialValues.items[item.id] = {
      implementationPercentage:
        RequirementImplementationOptions.fullyImplemented.value,
      estimate: item.maxScore,
      comment: "",
      applyFine: false,
    };
  });
  console.log(initialValues);

  return (
    <div className={styles.container}>
      <Row>
        <Col span={24}>
          <h2>Assess yourself according to the task requirements</h2>
        </Col>
      </Row>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
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
          setFieldValue,
          resetForm,
          submitForm,
        }) => (
          <form onSubmit={handleSubmit}>
            {task.categoriesOrder.map((scope, key) => (
              <Fragment key={key}>
                <Row>
                  <Col span={12}>
                    <h3>{scope}</h3>
                  </Col>
                </Row>
                {task.items
                  .filter(
                    (requirement: TaskRequirementModel) =>
                      requirement.category === scope
                  )
                  .map((requirementByScope, key) => (
                    <TaskRequirement
                      key={key}
                      requirement={requirementByScope}
                      value={values.items[requirementByScope.id]}
                      onChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  ))}
              </Fragment>
            ))}
            <hr />
            <Row>
              <Col span={20}>
                <h2>TOTAL</h2>
              </Col>
              <Col span={2}>
                <h2></h2>
              </Col>
              <Col span={2}>
                <h2></h2>
              </Col>
            </Row>
            <Row>
              <Col span={6} />
              <Col span={6}>
                <Button onClick={() => resetForm()}>Reset</Button>
              </Col>
              <Col span={6} />
              <Col span={6}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AssessmentForm;
