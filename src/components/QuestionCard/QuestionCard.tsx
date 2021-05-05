import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Answer } from '../../interfaces';
import { decode } from 'html-entities';

const QuestionCard = () => {
  const {
    state: { questionsList, currentQuestion },
    dispatch,
  } = useAppContext();
  const { category, question, correct_answer } = questionsList[currentQuestion];

  const nextQuestion = (answer: boolean) => {
    const parsedAnswer = correct_answer === 'True' ? true : false;
    const result = parsedAnswer === answer;
    const newAnswer: Answer = { question, result };

    dispatch({
      type: 'setAnswersList',
      payload: newAnswer,
    });
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      item
      xs={11}
      sm={6}
      data-test="questionCard"
    >
      <Typography variant="h4" data-test="categoryText">
        {category}
      </Typography>

      <Grid container justify="center" item>
        <Typography variant="h5" data-test="questionText">
          {decode(question, { level: 'html5' })}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" data-test="questionCounter">
          {currentQuestion + 1} of 10
        </Typography>
      </Grid>

      <Grid container justify="center" data-test="anwserButtonGroup">
        <Grid>
          <Button variant="contained" onClick={() => nextQuestion(false)}>
            False
          </Button>
          {'   '}
          <Button variant="contained" onClick={() => nextQuestion(true)}>
            True
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionCard;
