import styled from "styled-components";

type ProgressBarType = {
    percentage: number;
  };

export const PollWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 5px 10px 3px #ccc;
  padding: 2rem;
  border-radius:5px;
`;

export const SinglePoll = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
`;

export const QuestionText = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
`;

export const AnswerList = styled.div`
  user-select: none;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 0.2rem;
  margin: .7rem 0;
  position: relative;
  height: 35px;
  border-radius:5px;
`;

export const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: 20;
  width: 95%;
  padding: 0 .5rem;
`;

export const ProgressBar = styled.div<ProgressBarType>`
  background-color: ${(props: ProgressBarType) =>
    props.percentage >= 50 ? '#06f9f9' : '#8080804f'};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: ${(props: ProgressBarType) => props.percentage<=100?props.percentage:100}%;
  min-height: 35px !important;
  padding: 0.2rem;
  z-index: 10;
  transition: width 1s ease-in-out;
  border-top-left-radius:${(props: ProgressBarType) => props.percentage >= 100 ? '0px' : '5px'};
  border-bottom-left-radius:${(props: ProgressBarType) => props.percentage >= 100 ? '0px' : '5px'};
  border-top-right-radius:${(props: ProgressBarType) => props.percentage !== 100 ? '0px' : '5px'};
  border-bottom-right-radius:${(props: ProgressBarType) => props.percentage !== 100 ? '0px' : '5px'};

`;

export const Text = styled.span<ProgressBarType>`
  font-weight: ${(props: ProgressBarType) =>
    props.percentage >= 50 ? 'bold' : 'normal'};
`;

export const CountVotes = styled.div`
  color: #ccc;
  margin-bottom:1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.div`
  border: 1px solid #030c30;
  width: max-content;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
`;
