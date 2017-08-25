import { Question } from '../models/question';
import { QuestionContainer } from '../models/questionContainer';

export class Exam {
  id: string;
  university: string;
  period: string;
  course: string;
  code: string;
  type: string;
  questions: Array<Question>;
  new: boolean;
  questionContainer: Array<QuestionContainer>;
}
