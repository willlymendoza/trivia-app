import React from 'react';
import { useAppContext } from '../../context/AppContext';

const ResultsCard = () => {
  const {
    state: { answersList },
    dispatch,
  } = useAppContext();

  return (
    <div data-test="resultsCard">
      <h1>You scored</h1>
      <h1>
        {answersList.filter((answer) => answer.result).length} /{' '}
        {answersList.length}
      </h1>

      <div data-test="resultsList">
        {answersList.map((answer, index) => (
          <div data-test="resultItem" key={index}>
            <span>{answer.result ? '+' : '-'}</span>
            <p>{answer.question}</p>
          </div>
        ))}
      </div>

      <button onClick={() => dispatch({ type: 'setShowHomePage' })}>
        PLAY AGAIN?
      </button>
    </div>
  );
};

export default ResultsCard;
