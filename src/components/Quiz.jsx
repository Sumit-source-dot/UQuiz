import React from 'react';

const Quiz = ({ question, questionIndex, totalQuestions, onNext, onPrevious, onAnswer, answers, questionTimer, handleQuizCompletion }) => {
  const isCorrect = answers[questionIndex] === question.answer;
  const isAnswered = answers[questionIndex] !== null;

  return (
    <div>
      <h2>{question.question}</h2>
      <div>Time Remaining: {questionTimer} seconds</div>
      <ul>
        {question.options.map((option, index) => (
          <li 
            key={index} 
            onClick={() => onAnswer(index)} 
            style={{ 
              backgroundColor: answers[questionIndex] === index ? (isCorrect ? 'lightgreen' : 'lightcoral') : 'white',
              pointerEvents: isAnswered ? 'none' : 'auto',
              display: isAnswered && answers[questionIndex] !== index ? 'none' : 'block'
            }}
          >
            {option}
          </li>
        ))}
      </ul>
      {isAnswered && (
        <div>
          {isCorrect ? 'Correct!' : `Wrong! The correct answer is ${question.options[question.answer]}`}
        </div>
      )}
      <div>
        {questionIndex > 0 && <button onClick={onPrevious}>Previous</button>}
        {questionIndex < totalQuestions - 1 && <button onClick={onNext}>Next</button>}
        {questionIndex === totalQuestions - 1 && <button onClick={handleQuizCompletion}>Complete</button>}
      </div>
    </div>
  );
};

export default Quiz;