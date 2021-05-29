import * as React from 'react';
import { QandAsDocument } from '../types';
import { AnswerList, PollWrapper, ProgressBar, QuestionText, Row, SinglePoll, TextWrapper,Text,CountVotes,ButtonGroup,Button } from './CustomComponents';

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

  React.useEffect(() => {
    calculateTotals();
  }, []);

  const calculateTotals = () => {
    const totals: number[] = [];
    questions.qandas.questions.map(({ answers }) => {
      let sum = 0;
      answers.map(({ votes }) => (sum += votes));
      totals.push(sum);
    });
    setVotesTotals(totals);
  };

  return (
    <PollWrapper>
      {questions.qandas.questions.length
        ? questions.qandas.questions.map(
            ({ question, answers }, question_index, questionArray) => {
              return (
                index === question_index && (
                  <SinglePoll key={question_index}>
                    <QuestionText>{question.text}</QuestionText>
                    <AnswerList>
                      {answers.map(({ text, votes }, answer_index) => {
                        const perc_votes = Math.ceil(
                          (votes / votesTotals[question_index]) * 100
                        );
                        const calculateNewTotals = () => {
                          let votes = [...votesTotals];
                          votes[question_index] += 1;
                          setVotesTotals(votes);
                          questions.qandas.questions[question_index].answers[
                            answer_index
                          ]['votes'] += 1;
                          setQuestions({ ...questions });
                          setClickedAnswerIndex(answer_index);
                          setClickedQuestionIndex(question_index);
                        };

                        return (
                          <Row key={answer_index} onClick={calculateNewTotals}>
                            <ProgressBar percentage={perc_votes} />
                            <TextWrapper>
                              <Text percentage={perc_votes}>{text}</Text>
                              {clickedAnswerIndex === answer_index &&
                              question_index === clickedQuestionIndex ? (
                                <img
                                  src={require('../static/check-circle.svg')}
                                  width={20}
                                />
                              ) : null}
                              <Text percentage={perc_votes}>{perc_votes}%</Text>
                            </TextWrapper>
                          </Row>
                        );
                      })}
                    </AnswerList>
                    <CountVotes>{votesTotals[question_index]} votes</CountVotes>
                    <ButtonGroup>
                      {question_index !== 0 ? (
                        <Button onClick={() => setIndex((prev) => (prev -= 1))}>
                          Previous
                        </Button>
                      ) : null}
                      {index !== questionArray.length - 1 ? (
                        <Button onClick={() => setIndex((prev) => (prev += 1))}>
                          Next
                        </Button>
                      ) : null}
                    </ButtonGroup>
                  </SinglePoll>
                )
              );
            }
          )
        : null}
    </PollWrapper>
  );
}
