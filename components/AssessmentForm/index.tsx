import React, { Fragment } from "react";
import { Formik } from "formik";
import { Row, Col, Button } from "antd";
import styles from "./AssessmentForm.module.css";
import TaskRequirementModel from "../../models/TaskRequirement.model";
import TaskRequirement from "./TaskRequirement/index";
import RequirementImplementationOptions from "../../constants/requirement-implementation-options";
import PointsBadge from "./PointsBadge";
import TaskModel from "../../models/Task.model";

export interface TaskRequirementValues {
  implementationPercentage?: number;
  applyFine?: boolean;
  estimate: number;
  comment: string;
}

interface FormValues {
  items: {
    [key: string]: TaskRequirementValues;
  };
}

const AssessmentForm: React.FC<{
  task: TaskModel;
  handleSubmit;
  isCrossCheck?: boolean;
}> = ({ task, handleSubmit, isCrossCheck }) => {
  const initialValues: FormValues = { items: {} };
  task.items.forEach((item) => {
    initialValues.items[item.id] = {
      implementationPercentage:
        RequirementImplementationOptions.fullyImplemented.value,
      estimate: item.maxScore,
      comment: "",
      applyFine: false,
    };
  });
  const countTotal = (items: Object, param: string): number => {
    return Object.values(items).reduce((prev: any, cur: any) => {
      return prev + cur[param];
    }, 0);
  };

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
          handleSubmit(values);
        }}
        enableReinitialize={true}
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
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              {task.categoriesOrder.map((scope, key) => (
                <Fragment key={key}>
                  <Row>
                    <Col span={12}>
                      <h3 className={styles.TaskScope}>{scope}</h3>
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
                        isCrossCheck={isCrossCheck}
                      />
                    ))}
                </Fragment>
              ))}
              <hr />
              <Row className={styles.TotalRow}>
                <Col span={2}>
                  <PointsBadge score={countTotal(task.items, "maxScore")} />
                </Col>
                <Col span={18}>
                  <h2 className={styles.TotalPoints}>TOTAL</h2>
                </Col>
                <Col span={2}>
                  {isCrossCheck && (
                    <>
                      <span style={{}}>Student's estimate</span>
                      <h2>100</h2>
                    </>
                  )}
                </Col>

                <Col span={2}>
                  <span>Your estimate</span>
                  <h2>{countTotal(values.items, "estimate")}</h2>
                </Col>
              </Row>
              <Row className={styles.ButtonsRow}>
                <Col span={12}>
                  <Button
                    size={"large"}
                    shape={"round"}
                    onClick={() => resetForm()}
                  >
                    Reset
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size={"large"}
                    shape={"round"}
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AssessmentForm;
