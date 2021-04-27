import { initialState } from '../initialState';
import { State } from '../../../interfaces';
import { Action } from '../../../types';

export const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setQuestionsList':
      return {
        ...state,
        questionsList: action.payload,
      };

    case 'setAnswersList': {
      const stateCopy: State = { ...state };
      const currentQuestion = stateCopy.currentQuestion + 1;
      let newState: Partial<State> = {};

      const questionNumber =
        currentQuestion < stateCopy.questionsList.length
          ? currentQuestion
          : stateCopy.currentQuestion;

      newState = {
        ...stateCopy,
        answersList: [...stateCopy.answersList, action.payload],
        currentQuestion: questionNumber,
        showQuestionCard: currentQuestion < stateCopy.questionsList.length,
        showResultsCard: currentQuestion === stateCopy.questionsList.length,
      };

      return newState as State;
    }

    case 'setShowHomePage':
      return initialState;

    case 'setShowQuestionCard':
      return {
        ...state,
        showHomePage: false,
        showQuestionCard: true,
        showResultsCard: false,
      };

    case 'setShowResultsCard':
      return {
        ...state,
        showHomePage: false,
        showQuestionCard: false,
        showResultsCard: true,
      };

    case 'setIsLoading': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
