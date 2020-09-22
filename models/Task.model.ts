import TaskRequirementModel from "./TaskRequirement.model";

interface TaskModel {
  id: string;
  name: string;
  author: string;
  state: string; // enum [DRAFT, PUBLISHED, ARCHIVED]
  categoriesOrder: string[];
  items: TaskRequirementModel[];
}

export default TaskModel;
