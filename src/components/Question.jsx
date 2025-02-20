import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ question, questionIndex, totalQuestions, selectedAnswer, onAnswer }) => {
  return (
    <div>
      <h3>Question {questionIndex + 1} of {totalQuestions}</h3>
      <p>{question.question}</p>
      <ul>
        {question.options.map((option, index) => (
          <li key={index} onClick={() => onAnswer(index)} style={{ cursor: 'pointer', backgroundColor: selectedAnswer === index ? 'black' : 'white' }}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.number.isRequired
  }).isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  selectedAnswer: PropTypes.number,
  onAnswer: PropTypes.func.isRequired
};

export default Question;