import React, { useState } from "react";
import TaskRequirementModel from "./../../../models/TaskRequirement.model";
import { Col, InputNumber, Radio, Row, Input } from "antd";
import RequirementImplementationOptions from "../../../constants/requirement-implementation-options";
import styles from "./TaskRequirement.module.css";
import { TaskRequirementValues } from "../index";
import FineOptions from "../../../constants/fine-options";

const TaskRequirement: React.FC<{
  requirement: TaskRequirementModel;
  value: TaskRequirementValues;
  onChange: any;
  setFieldValue: any;
}> = ({ requirement, value, onChange, setFieldValue }) => {
  const toggleComment = (value) => {
    setCommentState(!openComment);
  };
  const [openComment, setCommentState] = useState<boolean>(false);
  const isRequirementInFineScope: boolean = requirement.minScore < 0;
  return (
    <Row>
      <Col span={2}>
        <div className={styles.maxPointBadge}>
          <span className={styles.maxPoint}>
            {isRequirementInFineScope ? "min point" : "max point"}
          </span>
          <span className={styles.maxPointValue}>
            {isRequirementInFineScope
              ? requirement.minScore
              : requirement.maxScore}
          </span>
        </div>
      </Col>
      <Col span={12}>
        <h4>{requirement.title}</h4>
        <p>{requirement.description}</p>
        <a className={styles.CommentBtn} onClick={toggleComment}>
          {openComment ? "Remove comment" : "Add comment"}
        </a>
        {openComment && (
          <Input.TextArea
            className={styles.CommentArea}
            maxLength={50}
            placeholder={"Add your comment here"}
            cols={2}
            value={value.comment}
            onChange={onChange}
            name={`items.${requirement.id}.comment`}
          />
        )}
      </Col>
      <Col span={6}>
        <div className={styles.radioButtonsBlock}>
          {!isRequirementInFineScope && (
            <Radio.Group
              onChange={(e) => {
                const newValue = e.target.value * requirement.maxScore;
                setFieldValue(`items.${requirement.id}.estimate`, newValue);
                onChange(e);
              }}
              name={`items.${requirement.id}.implementationPercentage`}
              value={value.implementationPercentage}
            >
              {Object.keys(RequirementImplementationOptions).map((key) => (
                <Radio
                  key={key}
                  name={`implementation-percentage-${requirement.id}`}
                  value={RequirementImplementationOptions[key].value}
                >
                  {RequirementImplementationOptions[key].name}
                </Radio>
              ))}
            </Radio.Group>
          )}
          {isRequirementInFineScope && (
            <Radio.Group
              onChange={(e) => {
                const newValue = e.target.value * requirement.minScore;
                setFieldValue(`items.${requirement.id}.estimate`, newValue);
                onChange(e);
              }}
              name={`items.${requirement.id}.applyFine`}
              value={value.applyFine}
            >
              {Object.keys(FineOptions).map((key) => (
                <Radio
                  key={key}
                  name={`implementation-percentage-${requirement.id}`}
                  value={!!FineOptions[key].value}
                >
                  {FineOptions[key].name}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </div>
      </Col>
      <Col span={4}>
        <div className={styles.estimateInput}>
          <label htmlFor="estimate">Your estimate</label>
          <InputNumber
            id="estimate"
            min={requirement.minScore}
            max={requirement.maxScore}
            value={value.estimate}
            onChange={(value) =>
              setFieldValue(`items.${requirement.id}.estimate`, value)
            }
            name={`items.${requirement.id}.estimate`}
          />
        </div>
      </Col>
    </Row>
  );
};

export default TaskRequirement;
