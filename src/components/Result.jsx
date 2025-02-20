import React from 'react';
import PropTypes from 'prop-types';

const Result = ({ score, total, answers, questions, attempted, notAttempted }) => {
  return (
    <div>
      <h2>Quiz Results</h2>
      <p>
        You scored {score} out of {total}
      </p>
      <p>Attempted Questions: {attempted}</p>
      <p>Not Attempted Questions: {notAttempted}</p>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <p>{question.question}</p>
            <p>
              Your answer: {answers[index] !== null ? question.options[answers[index]] : 'Not Answered'} <br />
              Correct answer: {question.options[question.answer]}
            </p>
          </li>
        ))}
      </ul>
      <p>Thank you for participating!</p>
    </div>
  );
};

Result.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  answers: PropTypes.arrayOf(PropTypes.number).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.number.isRequired
  })).isRequired,
  attempted: PropTypes.number.isRequired,
  notAttempted: PropTypes.number.isRequired
};

export default Result;