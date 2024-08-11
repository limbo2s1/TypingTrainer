import React, { useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/store';
import {
    setUserInput,
    incrementErrors,
    startTimer,
    calculateWPM,
    reset,
  } from '../store/textSlice';
  


function TypingTrainer() {
  const dispatch = useDispatch();
  
  const { originalText, userInput, errors, wpm } = useSelector(
    (state: RootState) => state.text
  );

  useEffect(() => {
    const handleInputChange = () => {
      if (userInput.length === originalText.length) {
        dispatch(calculateWPM());
      }
    };

    handleInputChange();
  }, [userInput, originalText, dispatch]);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    dispatch(setUserInput(input));

    if (input.length <= originalText.length) {
      dispatch(startTimer());

      if (input[input.length - 1] !== originalText[input.length - 1]) {
        dispatch(incrementErrors());
      }
    }
  };

  const handleRestart = () => {
    dispatch(reset());
  };

  return (
    <Container>
      <Title>Typing Speed Trainer</Title>
      <TextDisplay>
        {originalText.split('').map((char, index) => {
          let color;
          if (index < userInput.length) {
            color = userInput[index] === char ? 'green' : 'red';
          }
          return (
            <span key={index} style={{ color: color }}>
              {char}
            </span>
          );
        })}
      </TextDisplay>
      <UserInput
        value={userInput}
        onChange={handleInput}
        placeholder="Начните печатать..."
      />
      <Results>
        <ResultItem>Ошибок: {errors}</ResultItem>
        <ResultItem>Скорость: {wpm} WPM</ResultItem>
      </Results>
      <RestartButton onClick={handleRestart}>Начать заново</RestartButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 95vh;
  background-color: #f0f4f8;
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const TextDisplay = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: #444;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserInput = styled.textarea`
  width: 70%;
  height: 120px;
  font-size: 18px;
  padding: 10px;
  margin: 0 auto;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  resize: none;
  outline: none; 
  user-select: none; 
`;

const Results = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #555;
`;

const ResultItem = styled.p`
  margin: 5px 0;
  font-size: 18px;
  color: #333;
`;

const RestartButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
export default TypingTrainer;
