import React from "react";
import TaskRequirementModel from "./../../../models/TaskRequirement.model";
import { Col, InputNumber, Radio, Row } from "antd";
import styles from "../AssessmentForm.module.css";
import TaskImplementationPercentage from "../../../constants/task-implementation-percentage";

const TaskRequirement: React.FC<{ requirement: TaskRequirementModel }> = ({
  requirement,
}) => {
  const onChange = (val) => val;

  return (
    <Row>
      <Col span={2}>
        <div className={styles.maxPointBadge}>
          <span>max point</span>
          <span>{requirement.maxScore}</span>
        </div>
      </Col>
      <Col span={12}>
        <h4>{requirement.title}</h4>
        <p>{requirement.description}</p>
      </Col>
      <Col span={6}>
        <div className={styles.radioButtonsBlock}>
          <Radio.Group onChange={onChange} value={100}>
            {TaskImplementationPercentage.map((item, key) => (
              <Radio key={key} value={item.percentValue}>
                {item.name}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      </Col>
      <Col span={4}>
        <div className={styles.estimateInput}>
          <label htmlFor="estimate">Your estimate</label>
          <InputNumber
            id="estimate"
            name="estimate"
            min={requirement.minScore}
            max={requirement.maxScore}
            defaultValue={requirement.maxScore}
            onChange={onChange}
          />
        </div>
      </Col>
      <hr />
    </Row>
  );
};

export default TaskRequirement;
