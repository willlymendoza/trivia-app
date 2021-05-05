import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { findByTestAttr } from '../../utils/test';
import { AppStateContext } from '../../context/AppContext';
import { initialState } from '../../context/AppContext/initialState';
import { QuestionData, State } from '../../interfaces';
import QuestionsCard from './QuestionCard';

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

const setup = (props?: State) => {
  const state = { ...initialState, questionsList, ...props };
  return mount(
    <AppStateContext.Provider value={{ state, dispatch }}>
      <QuestionsCard />
    </AppStateContext.Provider>
  );
};

describe('HomePage component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('Should render properly', () => {
    const Component = findByTestAttr(wrapper, 'questionCard', 'div');
    expect(Component).toHaveLength(1);
  });

  test('Should render properly categoryText when currentQuestions = 0', () => {
    const questionText = findByTestAttr(wrapper, 'categoryText', 'h4');
    expect(questionText.text()).toEqual(questionsList[0].category);
  });

  test('Should render properly questionText when currentQuestions = 0', () => {
    const questionText = findByTestAttr(wrapper, 'questionText', 'h5');
    expect(questionText.text()).toEqual(questionsList[0].question);
  });

  test('Should call dispatch when button is clicked', () => {
    const button1 = wrapper.find('button').at(0);
    button1.simulate('click');
    wrapper.update();
    expect(dispatch.mock.calls.length).toEqual(1);

    const button2 = wrapper.find('button').at(1);
    button2.simulate('click');
    expect(dispatch.mock.calls.length).toEqual(2);
  });
});
