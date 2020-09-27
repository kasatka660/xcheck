import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AssessmentForm from "../../components/AssessmentForm";
import { Col, Input, Row, Form } from "antd";
import TaskModel from "../../models/Task.model";
import { serverBaseUrl } from "../../constants/config";
import { useRouter } from "next/router";
import Link from "next/link";
import CrossCheckModel from "../../models/CrossCheck.model";
import ReviewRequestModel from "../../models/ReviewRequest.model";

const page: React.FC = () => {
  const [selectedTask, setTask] = useState<TaskModel>(null);
  const [reviewRequest, setReviewRequest] = useState<ReviewRequestModel>(null);
  const router = useRouter();
  const selectOptions = [];

  useEffect(() => {
    if (router.query.id) {
      fetch(serverBaseUrl + "/review-requests/" + router.query.id)
        .then((res) => res.json())
        .then((res) => {
          setReviewRequest(res);
          fetch(serverBaseUrl + `/tasks/${res.task}`)
            .then((taskJson) => taskJson.json())
            .then((task) => setTask(task));
        });
    }
  }, [router.query]);

  const submitForm = (values) => {
    const crossCheck: CrossCheckModel = {
      reviewer: localStorage.getItem("user"),
      gradeItems: [],
      task: selectedTask.id,
      student: reviewRequest.author,
    };

    fetch(serverBaseUrl + `/cross-checks`, {
      method: "POST",
      body: JSON.stringify(crossCheck),
      headers: { "Content-Type": "application/json" },
    }).then((res) => router.push("/reviews"));
  };

  return (
    <Layout withHeader={true}>
      {/*<Row className="AlignCenter">
        <Col span={24}>
          <SelectMenu
            selectOptions={selectOptions}
            placeholder={"Choose task"}
            onSelect={(taskId) => onTaskSelect(taskId)}
          />
        </Col>
      </Row>*/}
      {selectedTask && (
        <>
          <Row>
            <Link href="/review-request">
              <a>{"<"} Back to review requests</a>
            </Link>
          </Row>
          <Row className="AlignCenter">
            <Col span={24}>
              <div>
                <a>Link to student's demo</a>
              </div>
              <div>
                <a>Link to student's PR</a>
              </div>
            </Col>
          </Row>
          <AssessmentForm
            task={selectedTask}
            handleSubmit={(values) => submitForm(values)}
            isCrossCheck={true}
          />
        </>
      )}
    </Layout>
  );
};

export default page;
