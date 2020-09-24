interface SelfEsteemModel {
  id?: string;
  student: string;
  task: string;
  gradeItems: {
    requirementId: string;
    estimate: string;
    comment: string;
  }[];
}

export default SelfEsteemModel;
