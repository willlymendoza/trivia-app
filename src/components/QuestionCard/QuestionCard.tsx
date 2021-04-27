import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Answer } from '../../interfaces';

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
    <div data-test="questionCard">
      <h1 data-test="categoryText">{category}</h1>

      <div data-test="questionText">
        <p>{question}</p>
      </div>

      <span data-test="questionCounter">{currentQuestion + 1} of 10</span>

      <div data-test="anwserButtonGroup">
        <button onClick={() => nextQuestion(true)}>True</button>
        <button onClick={() => nextQuestion(false)}>False</button>
      </div>
    </div>
  );
};

export default QuestionCard;
