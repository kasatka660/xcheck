interface ReviewRequestModel {
<<<<<<< HEAD
  id?: string;
  task: string;
=======
  id: string;
>>>>>>> origin/feature/Login
  author: string;
  selfEsteem: string;
  solution: {
    pr: string;
    demo: string;
  };
}

export default ReviewRequestModel;
