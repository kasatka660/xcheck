import TaskRequirementModel from "./TaskRequirement.model";

class TaskModel {
  id: string;
  author: string;
  state: string; // enum [DRAFT, PUBLISHED, ARCHIVED]
  categoriesOrder: string[];
  items: TaskRequirementModel[];
}

export default TaskModel;
