import { Answer } from '../interfaces/Answer.interface';
import { QuestionData } from '../interfaces/QuestionData.interface';

export type Action =
  | { type: 'setQuestionsList'; payload: QuestionData[] }
  | { type: 'setAnswersList'; payload: Answer }
  | { type: 'setShowHomePage' }
  | { type: 'setShowQuestionCard' }
  | { type: 'setShowResultsCard' }
  | { type: 'setIsLoading'; payload: boolean }
  | { type: undefined };
