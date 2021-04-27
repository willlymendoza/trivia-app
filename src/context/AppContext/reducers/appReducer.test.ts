import { Answer, QuestionData, State } from '../../../interfaces';
import { Action } from '../../../types';
import { initialState } from '../initialState';
import { appReducer } from './appReducer';

describe('appReducer', () => {
  const state: State = initialState;

  const questionsList: QuestionData[] = [
    {
      category: 'Category 1',
      correct_answer: 'True',
      difficulty: 'hard',
      incorrect_answers: ['False'],
      question: 'Question 1',
      type: 'boolean',
    },
    {
      category: 'Category 2',
      correct_answer: 'False',
      difficulty: 'hard',
      incorrect_answers: ['True'],
      question: 'Question 2',
      type: 'boolean',
    },
  ];

  test('setQuestionList action type', () => {
    const payload: QuestionData[] = questionsList;

    const action: Action = {
      type: 'setQuestionsList',
      payload,
    };

    const expectedState: State = { ...initialState, questionsList: payload };
    const newState = appReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  describe('setAnswersList action type', () => {
    const newAnswer: Answer = {
      question: 'Answer 1',
      result: true,
    };

    const action: Action = {
      type: 'setAnswersList',
      payload: newAnswer,
    };

    test('should add an answer to answersList state', () => {
      const expectedState: State = {
        ...initialState,
        answersList: [newAnswer],
      };
      const newState = appReducer(state, action);
      expect(newState).toEqual(expectedState);
    });

    test('should return true for showResultsCard field', () => {
      const expectedState: State = {
        ...initialState,
        questionsList,
        answersList: [newAnswer],
        showHomePage: false,
        currentQuestion: 1,
        showQuestionCard: false,
        showResultsCard: true,
      };

      const newState = appReducer(
        { ...state, questionsList, showHomePage: false, currentQuestion: 1 },
        action
      );

      expect(newState).toEqual(expectedState);
    });
  });

  test('setShowHomePage action type', () => {
    const action: Action = { type: 'setShowHomePage' };
    const newState = appReducer(state, action);

    expect(newState).toEqual(initialState);
  });

  test('setShowQuestionCard action type', () => {
    const action: Action = { type: 'setShowQuestionCard' };
    const expectedState: State = {
      ...initialState,
      showQuestionCard: true,
      showHomePage: false,
      showResultsCard: false,
    };
    const newState = appReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  test('setShowResultsCard action type', () => {
    const action: Action = { type: 'setShowResultsCard' };
    const expectedState: State = {
      ...initialState,
      showQuestionCard: false,
      showHomePage: false,
      showResultsCard: true,
    };
    const newState = appReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  test('setIsLoading action type', () => {
    const action: Action = { type: 'setIsLoading', payload: false };
    const expectedState: State = {
      ...initialState,
      isLoading: false,
    };
    const newState = appReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  test('should throw an error when action type is not allowed', () => {
    const action: Action = { type: undefined };

    expect(() => appReducer(state, action)).toThrow();
  });
});
