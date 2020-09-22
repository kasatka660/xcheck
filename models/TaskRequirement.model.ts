interface TaskRequirementModel {
  id: string;
  minScore: number;
  maxScore: number;
  category: string;
  title: string;
  description: string;
}

export default TaskRequirementModel;
