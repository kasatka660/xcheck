import RequirementScoreModel from "./RequirementScore.model";

interface TaskScoreModel {
  id: string;
  task: string;
  items: RequirementScoreModel[];
}

export default TaskScoreModel;
