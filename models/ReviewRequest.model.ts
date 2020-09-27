interface ReviewRequestModel {
  id?: string;
  task: string;
  author: string;
  selfEsteem: string;
  solution: {
    pr: string;
    demo: string;
  };
}

export default ReviewRequestModel;
