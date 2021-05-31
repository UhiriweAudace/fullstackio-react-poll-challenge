import * as React from 'react';
import { QandAsDocument } from '../types';
import {
  PollWrapper,
  QuestionText,
  SinglePoll,
  CountVotes,
  ButtonGroup,
  Button,
} from './CustomComponents';
import PollAnswerList from './PollAnswerList';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

export default function Poll({ qandas }: Props) {
  const [index, setIndex] = React.useState<number>(0);
  const [clickedAnswerIndex, setClickedAnswerIndex] =
    React.useState<number>(-1);
  const [clickedQuestionIndex, setClickedQuestionIndex] =
    React.useState<number>(0);
  const [questions, setQuestions] = React.useState<Props>({ qandas });
  const [votesTotals, setVotesTotals] = React.useState<number[]>([]);
  const [mostPopularAnswer, setMostPopularAnswer] = React.useState<number>(-1);

  React.useEffect(() => {
    calculateVotesTotals();
  }, []);

  const calcuteMostPopularAnswerVotes = (questionIndex: number) => {
    const popularVotes =
      questions.qandas.questions[questionIndex].answers
        .map((ans) => ans.votes)
        .sort((a, b) => a - b)
        .pop() || -1;
    setMostPopularAnswer(popularVotes);
  };
  const calculateVotesTotals = () => {
    const totals: number[] = [];
    questions.qandas.questions.map(({ answers }) => {
      let sum = 0;
      answers.map(({ votes }) => (sum += votes));
      totals.push(sum);
    });
    setVotesTotals(totals);
    calcuteMostPopularAnswerVotes(index);
  };

  const calculateUpdatedVotes = (
    answerIndex: number,
    questionIndex: number
  ) => {
    let votes = [...votesTotals];
    votes[questionIndex] += 1;
    questions.qandas.questions[questionIndex].answers[answerIndex][
      'votes'
    ] += 1;
    setVotesTotals(votes);
    setQuestions({ ...questions });
    setClickedAnswerIndex(answerIndex);
    setClickedQuestionIndex(questionIndex);
    calcuteMostPopularAnswerVotes(index);
  };

  const nextPreviousHandler = (action: string) => {
    const questionIndex = action === 'next' ? index + 1 : index - 1;
    setIndex(questionIndex);
    calcuteMostPopularAnswerVotes(questionIndex);
  };

  const { qandas: Qandas } = questions;
  return (
    <PollWrapper>
      {Qandas.questions.map(
        ({ question, answers }, questionIndex, qandasArray) =>
          index === questionIndex && (
            <SinglePoll key={questionIndex}>
              <QuestionText>{question.text}</QuestionText>
              <PollAnswerList
                answers={answers}
                questions={questions}
                votesTotals={votesTotals}
                questionIndex={questionIndex}
                clickedAnswerIndex={clickedAnswerIndex}
                clickedQuestionIndex={clickedQuestionIndex}
                calculateUpdatedVotes={calculateUpdatedVotes}
                mostPopularAnswer={mostPopularAnswer}
              />
              <CountVotes>{votesTotals[questionIndex]} votes</CountVotes>
              <ButtonGroup>
                {questionIndex !== 0 && (
                  <Button onClick={() => nextPreviousHandler('previous')}>
                    Previous
                  </Button>
                )}
                {index !== qandasArray.length - 1 && (
                  <Button onClick={() => nextPreviousHandler('next')}>
                    Next
                  </Button>
                )}
              </ButtonGroup>
            </SinglePoll>
          )
      )}
    </PollWrapper>
  );
}
