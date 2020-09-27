import React, { useState } from "react";
import Layout from "../components/Layout";
import ReviewRequestForm from "../components/ReviewRequest/ReviewRequestForm";
import { Button } from "antd";
import ReviewRequestList from "../components/ReviewRequest/ReviewRequestList";

const ReviewRequestPage: React.FC = () => {
  const [reviewRequestFormAdded, setReviewRequestForm] = useState<boolean>(
    false
  );

  const addReviewRequestForm = () => setReviewRequestForm(true);
  const reviewRequestCallback = () => {
    setReviewRequestForm(false);
  };

  return (
    <Layout withHeader={true}>
      {!reviewRequestFormAdded && (
        <Button className="secondary" onClick={addReviewRequestForm}>
          Add Review Request
        </Button>
      )}
      {reviewRequestFormAdded && (
        <>
          <h1>Add review request</h1>
          <ReviewRequestForm submitCallback={reviewRequestCallback} />
        </>
      )}
      {!reviewRequestFormAdded && (
        <>
          <h1>Review requests</h1>
          <ReviewRequestList />
        </>
      )}
    </Layout>
  );
};

export default ReviewRequestPage;
