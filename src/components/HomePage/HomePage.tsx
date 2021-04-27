import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useAppContext } from '../../context/AppContext';

const HomePage = () => {
  const {
    state: { isLoading },
    dispatch,
  } = useAppContext();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      item
      xs={5}
      className="Home-page"
      data-test="mainPage"
    >
      <h1>Welcome to the Trivia Challenge!</h1>

      <h2>You will be presented with 10 True of False questions.</h2>

      <h2>Can you score 100%?</h2>

      <Grid item xs={12}>
        <Button
          data-test="beginButton"
          variant="contained"
          disabled={isLoading}
          onClick={() => dispatch({ type: 'setShowQuestionCard' })}
        >
          {isLoading ? 'Loading questions...' : 'BEGIN'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default HomePage;
