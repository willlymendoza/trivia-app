import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useAppContext } from '../../context/AppContext';
import { decode } from 'html-entities';

const ResultsCard = () => {
  const {
    state: { answersList },
    dispatch,
  } = useAppContext();

  const ResultListDiv = (props: any) => (
    <div {...props} data-test="resultsList" />
  );

  const ResultItemDiv = (props: any) => (
    <div data-test="resultItem" {...props} />
  );

  return (
    <Grid
      container
      justify="center"
      item
      xs={11}
      sm={6}
      data-test="resultsCard"
    >
      <Grid item xs={12}>
        <Typography variant="h5">You scored </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" data-test="scoreResult">
          {answersList.filter((answer) => answer.result).length} /{' '}
          {answersList.length}
        </Typography>
      </Grid>

      <Grid item component={ResultListDiv}>
        {answersList.map((answer, index) => (
          <Grid item container component={ResultItemDiv} key={index}>
            <Grid container item direction="column" justify="center" xs={2}>
              <Grid
                className={answer.result ? 'Correct-answer' : 'Wrong-answer'}
              >
                {answer.result ? '+' : '-'}
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <p className="Score-result-text">
                {decode(answer.question, { level: 'html5' })}
              </p>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: 'setShowHomePage' })}
        >
          PLAY AGAIN?
        </Button>
      </Grid>
    </Grid>
  );
};

export default ResultsCard;
