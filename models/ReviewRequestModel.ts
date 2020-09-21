
import TaskScoreModel from './TaskScore.model';
export default class reviewRequest {
    id: string;
    crossCheckSessionId: string; // may be null if this review is not a part of any session
    author: string;
    task: string;
    state: string; // enum [DRAFT, PUBLISHED, COMPLETED]
    selfGrade: TaskScoreModel[]
    ;
    solution: {
        pr: string;
        demo: string
    }
  };