interface CrossCheckModel {
  id?: string;
  student: string;
  reviewer: string;
  task: string;
  gradeItems: {
    requirementId: string;
    estimate: string;
  }[];
}

export default CrossCheckModel;
