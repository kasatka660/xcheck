interface ReviewRequestModel {
  id: string;
  author: string;
  selfEsteem: string;
  solution: {
    pr: string;
    demo: string;
  };
}

export default ReviewRequestModel;
