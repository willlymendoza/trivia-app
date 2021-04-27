import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { QuestionsResponse } from '../../interfaces';
import { request } from '../../utils/request';
import { HomePage } from '../HomePage';
import { QuestionCard } from '../QuestionCard';
import { ResultsCard } from '../ResultsCard';

import './App.css';

function App() {
  const { state, dispatch } = useAppContext();
  const { showHomePage, showQuestionCard, showResultsCard } = state;

  useEffect(() => {
    const dispatchLoader = (value: boolean) => {
      dispatch({
        type: 'setIsLoading',
        payload: value,
      });
    };

    const fetchQuestionsList = async () => {
      dispatchLoader(true);

      try {
        const questionsResponse = await request<QuestionsResponse>(
          'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'
        );

        dispatch({
          type: 'setQuestionsList',
          payload: questionsResponse.results,
        });
      } catch (err) {
        throw new Error(err);
      } finally {
        dispatchLoader(false);
      }
    };

    if (showHomePage) fetchQuestionsList();
  }, [dispatch, showHomePage]);

  return (
    <div className="App">
      {showHomePage && <HomePage />}

      {showQuestionCard && <QuestionCard />}

      {showResultsCard && <ResultsCard />}
    </div>
  );
}

export default App;
