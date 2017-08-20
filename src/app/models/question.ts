export class Question {
  type: number;
  question: string;
  options: Array<string>;
  answer: string;
  image: boolean;
  imageUrl: Array<string>;
  points: number;
  answers: Array<string>;
  answerSelected: string; //answer selected by student
  partialAnswer: Array<string>;
  fullPoints: boolean;
  statements: Array<string>;
  statementsFormatted: Array<Array<string>>;
  partialAnswerFormatted: Array<Array<string>>;
  answersPartials: Array<Array<string>>;
  selectedClass: Array<string>;
}
