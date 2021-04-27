import { State } from '../../../interfaces';

export const initialState: State = {
  questionsList: [],
  answersList: [],
  showHomePage: true,
  showQuestionCard: false,
  showResultsCard: false,
  currentQuestion: 0,
  isLoading: false,
};
