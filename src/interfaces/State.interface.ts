import { Answer } from './Answer.interface';
import { QuestionData } from './QuestionData.interface';

export interface State {
  questionsList: QuestionData[];
  answersList: Answer[];
  showHomePage: boolean;
  showQuestionCard: boolean;
  showResultsCard: boolean;
  currentQuestion: number;
  isLoading: boolean;
}
