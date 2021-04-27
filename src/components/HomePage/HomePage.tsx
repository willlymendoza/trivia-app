import React from 'react';
import { useAppContext } from '../../context/AppContext';

const HomePage = () => {
  const {
    state: { isLoading },
    dispatch,
  } = useAppContext();

  return (
    <div data-test="mainPage">
      <h1>Welcome to the Trivia Challenge!</h1>

      <h2>You will be presented with 10 True of False questions.</h2>

      <h2>Can you score 100%?</h2>

      <button
        disabled={isLoading}
        onClick={() => dispatch({ type: 'setShowQuestionCard' })}
      >
        {isLoading ? 'Loading questions...' : 'BEGIN'}
      </button>
    </div>
  );
};

export default HomePage;
