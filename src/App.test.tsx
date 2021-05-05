import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AppStateContext } from './context/AppContext';
import { initialState } from './context/AppContext/initialState';
import { QuestionData, State } from './interfaces';
import App from './App';

const dispatch = jest.fn();
const questionsList: QuestionData[] = [
  {
    category: 'Category 1',
    difficulty: 'hard',
    type: 'boolean',
    question: 'Question 1?',
    correct_answer: 'True',
    incorrect_answers: ['False'],
  },
  {
    category: 'Category 2',
    difficulty: 'hard',
    type: 'boolean',
    question: 'Question 2?',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
];

const state = { ...initialState, questionsList };
const setup = (props?: State) => {
  const setupState = { ...state, ...props };
  return mount(
    <AppStateContext.Provider value={{ state: setupState, dispatch }}>
      <App />
    </AppStateContext.Provider>
  );
};

describe('App component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('Should render properly', () => {
    const mainPageComponent = wrapper.find('HomePage');
    expect(mainPageComponent).toHaveLength(1);
  });

  test('Should call disptach when component is loaded', () => {
    expect(dispatch.mock.calls.length).toEqual(1);
  });

  test('Should only render QuestionCard component when showQuestionCard = true', () => {
    const wrapper = setup({
      ...state,
      showQuestionCard: true,
      showHomePage: false,
      showResultsCard: false,
    });

    expect(wrapper.find('HomePage').length).toEqual(0);
    expect(wrapper.find('QuestionCard').length).toEqual(1);
    expect(wrapper.find('ResultsCard').length).toEqual(0);
  });

  test('Should only render ResultsCard component when showResultsCard = true', () => {
    const wrapper = setup({
      ...state,
      showQuestionCard: false,
      showHomePage: false,
      showResultsCard: true,
    });

    expect(wrapper.find('HomePage').length).toEqual(0);
    expect(wrapper.find('QuestionCard').length).toEqual(0);
    expect(wrapper.find('ResultsCard').length).toEqual(1);
  });
});
