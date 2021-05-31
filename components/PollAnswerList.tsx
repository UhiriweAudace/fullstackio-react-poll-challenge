import React from 'react';
import {
  ListWrapper,
  Row,
  ProgressBar,
  TextWrapper,
  Text,
} from './CustomComponents';
import { Answer, QandAsDocument } from '../types';

type QuestionsType = {
  qandas: QandAsDocument;
};

type Props = {
  answers: Answer[];
  questions: QuestionsType;
  votesTotals: number[];
  questionIndex: number;
  clickedQuestionIndex: number;
  clickedAnswerIndex: number;
  calculateUpdatedVotes: (answerIndex: number, questionIndex: number) => void;
  mostPopularAnswer: number;
};

export default function PollAnswerList({
  answers,
  votesTotals,
  questionIndex,
  calculateUpdatedVotes,
  clickedAnswerIndex,
  clickedQuestionIndex,
  mostPopularAnswer,
}: Props) {
  return (
    <ListWrapper>
      {answers.map(({ text, votes }, answerIndex) => {
        const perc_votes = Math.ceil(
          (votes / votesTotals[questionIndex]) * 100
        );
        return (
          <Row
            key={answerIndex}
            onClick={() => calculateUpdatedVotes(answerIndex, questionIndex)}
          >
            <ProgressBar
              percentage={perc_votes}
              votes={votes}
              mostPopularAnswer={mostPopularAnswer}
            />
            <TextWrapper>
              <Text votes={votes} mostPopularAnswer={mostPopularAnswer}>
                {text}
              </Text>
              {clickedAnswerIndex === answerIndex &&
                questionIndex === clickedQuestionIndex && (
                  <img src={require('../static/check-circle.svg')} width={20} />
                )}
              <Text votes={votes} mostPopularAnswer={mostPopularAnswer}>
                {perc_votes}%
              </Text>
            </TextWrapper>
          </Row>
        );
      })}
    </ListWrapper>
  );
}
