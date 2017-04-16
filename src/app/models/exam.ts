import { Question } from '../models/question';

export class Exam {
  university: string;
  period: string;
  course: string;
  type: string;
  questions: Array<Question>;
}
