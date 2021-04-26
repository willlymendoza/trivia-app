import React, { useEffect, useState } from 'react';
import { useAppContext } from './appContext';
import './App.css';

export interface QuestionData {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionsResponse {
  response_code: number;
  results: QuestionData[];
}

export interface QuestionCardProps {
  questionsList: QuestionData[];
}

export interface Answer {
  question: string;
  result: boolean;
}

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const body = await response.json();
  return body;
}

function App() {
  const { state, dispatch } = useAppContext();
  const { questionsList, answerList } = state;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestionsList = async () => {
      setIsLoading(true);

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
        setIsLoading(false);
      }
    };

    fetchQuestionsList();
  }, [dispatch]);

  const WelcomePage = () => {
    return (
      <div data-test="mainPage">
        <h1>Welcome to the Trivia Challenge!</h1>

        <h2>You will be presented with 10 True of False questions.</h2>

        <h2>Can you score 100%?</h2>

        <button>BEGIN</button>
      </div>
    );
  };

  const QuestionCard = ({ questionsList }: QuestionCardProps) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const { category, question, correct_answer } = questionsList[
      currentQuestion
    ];
    const [answersList, setAnswersList] = useState<Answer[]>([]);

    const nextQuestion = (answer: boolean) => {
      const parsedAnswer = correct_answer === 'True' ? true : false;
      const result = parsedAnswer === answer;
      const newAnswer: Answer = { question, result };
      setAnswersList([...answersList, newAnswer]);

      if (currentQuestion < questionsList.length - 1)
        setCurrentQuestion(currentQuestion + 1);
    };

    return (
      <div data-test="questionCard">
        <h1>{category}</h1>

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

  const ResultsCard = (answersList: Answer[]) => {
    return (
      <div data-test="resultsCard">
        <h1>You scored</h1>
        <h1>3 / 10</h1>

        <div data-test="resultsList">
          {answersList.map((answer) => (
            <div>
              <span>{answer.result}</span>
              <p>{answer.question}</p>
            </div>
          ))}
        </div>

        <button>PLAY AGAIN?</button>
      </div>
    );
  };

  return (
    <div className="App">
      <WelcomePage />

      {questionsList.length && <QuestionCard questionsList={questionsList} />}

      {/* <ResultsCard /> */}
    </div>
  );
}

export default App;
