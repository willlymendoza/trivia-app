import React from 'react';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../../utils/test';
import { AppStateContext } from '../../context/AppContext';
import { initialState } from '../../context/AppContext/initialState';
import { Answer, State } from '../../interfaces';
import ResultsCard from './ResultCard';

const dispatch = jest.fn();
const answersList: Answer[] = [
  {
    question: 'Question 1',
    result: true,
  },
  {
    question: 'Question 2',
    result: false,
  },
];
const setup = (props?: State) => {
  const state = { ...initialState, answersList, ...props };

  /*   console.log('STATE: ', state); */
  return mount(
    <AppStateContext.Provider value={{ state, dispatch }}>
      <ResultsCard />
    </AppStateContext.Provider>
  );
};

describe('ResultCard component', () => {
  let wrapper: ReactWrapper | ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  afterEach(() => wrapper.unmount());

  test('Should render properly', () => {
    const mainComponent = findByTestAttr(wrapper, 'resultsCard', 'div');
    expect(mainComponent).toHaveLength(1);
  });

  test('should show final score', () => {
    const scoreResult = findByTestAttr(wrapper, 'scoreResult', 'h5');
    const result = answersList.filter((answer) => answer.result).length;
    const totalAnswers = answersList.length;
    const scoreText = `${result} / ${totalAnswers}`;

    expect(scoreResult.text()).toEqual(scoreText);
  });

  test('should render resultsList', () => {
    wrapper.unmount();
    wrapper = setup();
    const resultsList = findByTestAttr(wrapper, 'resultsList', 'div').at(0);
    const resultItem = findByTestAttr(wrapper, 'resultItem', 'div');

    expect(resultsList).toHaveLength(1);
    expect(resultItem).toHaveLength(answersList.length);
  });

  test('should call dispatch when play again button is clicked', () => {
    const button = wrapper.find('button').at(0);
    button.simulate('click');
    expect(dispatch.mock.calls.length).toEqual(1);
  });
});
