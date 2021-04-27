import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import HomePage from './HomePage';
import { findByTestAttr } from '../../utils/test';
import { AppStateContext } from '../../context/AppContext';
import { initialState } from '../../context/AppContext/initialState';
import { State } from '../../interfaces';

const dispatch = jest.fn();
const setup = (props?: State) => {
  const state = { ...initialState, ...props };
  return mount(
    <AppStateContext.Provider value={{ state, dispatch }}>
      <HomePage />
    </AppStateContext.Provider>
  );
};

describe('HomePage component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('Should render properly', () => {
    const mainPageComponent = findByTestAttr(wrapper, 'mainPage');
    expect(mainPageComponent).toHaveLength(1);
  });

  test('should render Loading questions text when isLoading = true', () => {
    const wrapper = setup({ ...initialState, isLoading: true });
    const beginButton = findByTestAttr(wrapper, 'beginButton');
    expect(beginButton.text()).toEqual('Loading questions...');
  });

  test('should render "BEGIN" text when isLoading = false', () => {
    const beginButton = findByTestAttr(wrapper, 'beginButton');
    expect(beginButton.text()).toEqual('BEGIN');
  });

  test('should call disptach when beginButton is clicked', () => {
    const beginButton = findByTestAttr(wrapper, 'beginButton');
    beginButton.simulate('click');
    expect(dispatch.mock.calls.length).toEqual(1);
  });
});
