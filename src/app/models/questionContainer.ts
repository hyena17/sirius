import { Question } from '../models/question';
export class QuestionContainer {
  description: string;
  imageUrl: Array<string>;
  questions: Array<Question>;
}
