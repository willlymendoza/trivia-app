import React from 'react';
import { Answer, QuestionData } from './App';

type Action =
  | { type: 'setQuestionsList'; payload: QuestionData[] }
  | { type: 'setAnswersList' };
type Dispatch = (action: Action) => void;
interface State {
  questionsList: QuestionData[];
  answerList: Answer[];
  showHomePage: boolean;
  showQuestionCard: boolean;
  showResultsCard: boolean;
}

type AppProviderProps = { children: React.ReactNode };

export type AppStateContextProps = {
  state: State;
  dispatch: Dispatch;
};

const AppStateContext = React.createContext<AppStateContextProps | undefined>(
  undefined
);

const initialState: State = {
  questionsList: [],
  answerList: [],
  showHomePage: true,
  showQuestionCard: false,
  showResultsCard: false,
};

const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setQuestionsList':
      return {
        ...state,
        questionsList: action.payload,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  const value = { state, dispatch };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

const useAppContext = () => {
  const context = React.useContext(AppStateContext);

  if (context === undefined)
    throw new Error('useAppContext must be used within an AppProvider');

  return context;
};

export { AppProvider, useAppContext };
