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

  return (
    <Layout withHeader={true}>
      {!reviewRequestFormAdded && (
        <Button className="secondary" onClick={addReviewRequestForm}>
          Add Review Request
        </Button>
      )}
      {reviewRequestFormAdded && <ReviewRequestForm />}
      {!reviewRequestFormAdded && <ReviewRequestList />}
    </Layout>
  );
};

export default ReviewRequestPage;
