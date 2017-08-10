import { Question } from '../models/question';
import { QuestionContainer } from '../models/questionContainer';

export class Exam {
  university: string;
  period: string;
  course: string;
  type: string;
  questions: Array<Question>;
  new: boolean;
  questionContainer: Array<QuestionContainer>;
}
