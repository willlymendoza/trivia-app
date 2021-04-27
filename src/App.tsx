import React, { useEffect } from 'react';
import { useAppContext } from './context/AppContext';
import { HomePage } from './components/HomePage';
import { QuestionCard } from './components/QuestionCard';
import { ResultsCard } from './components/ResultsCard';
import { request } from './utils/request';
import { QuestionsResponse } from './interfaces/QuestionsResponse.interface';
import './App.css';
import { Box, Grid } from '@material-ui/core';

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
        throw new Error(
          `There was an error trying to get the questions data: ${err}`
        );
      } finally {
        dispatchLoader(false);
      }
    };

    if (showHomePage) fetchQuestionsList();
  }, [dispatch, showHomePage]);

  return (
    <Grid container justify="center" className="App">
      {showHomePage && <HomePage />}

      {showQuestionCard && <QuestionCard />}

      {showResultsCard && <ResultsCard />}
    </Grid>
  );
}

export default App;
