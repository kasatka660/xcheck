import React, { Fragment } from "react";
import { Form, InputNumber, Radio, Checkbox, Row, Col } from "antd";
import styles from "./AssessmentForm.module.css";
import { task } from "../../data/data";
import TaskRequirementModel from "../../models/TaskRequirement.model";
import TaskRequirement from "./TaskRequirement";

const AssessmentForm: React.FC = () => {
  return (
    <div className={styles.container}>
      <Row>
        <Col span={24}>
          <h2>Assess yourself according to the task requirements</h2>
        </Col>
      </Row>
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
              <TaskRequirement key={key} requirement={requirementByScope} />
            ))}
        </Fragment>
      ))}
    </div>
  );
};

export default AssessmentForm;
