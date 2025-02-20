import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './styles.css';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    answer: 2
  },
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    answer: 1
  },
  // Add more questions as needed
  {
    question: 'What is the capital of Germany?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    answer: 0
  },
  {
    question: 'What is the capital of Spain?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    answer: 1
  },
  {
    question: 'What is the capital of Portugal?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    answer: 3
  },
  {
    question: 'What is 5 + 5?',
    options: ['10', '11', '12', '13'],
    answer: 0
  },
  {
    question: 'What is 3 + 3?',
    options: ['5', '6', '7', '8'],
    answer: 1
  },
  {
    question: 'What is 4 + 4?',
    options: ['7', '8', '9', '10'],
    answer: 1
  },
  {
    question: 'What is 6 + 6?',
    options: ['11', '12', '13', '14'],
    answer: 1
  },
  {
    question: 'What is 7 + 7?',
    options: ['13', '14', '15', '16'],
    answer: 1
  },
  {
    question: 'What is 8 + 8?',
    options: ['15', '16', '17', '18'],
    answer: 1
  },
  {
    question: 'What is 9 + 9?',
    options: ['17', '18', '19', '20'],
    answer: 1
  },
  {
    question: 'What is 10 + 10?',
    options: ['19', '20', '21', '22'],
    answer: 1
  },
  {
    question: 'What is 11 + 11?',
    options: ['21', '22', '23', '24'],
    answer: 1
  },
  {
    question: 'What is 12 + 12?',
    options: ['23', '24', '25', '26'],
    answer: 1
  },
  {
    question: 'What is 13 + 13?',
    options: ['25', '26', '27', '28'],
    answer: 1
  },
  {
    question: 'What is 14 + 14?',
    options: ['27', '28', '29', '30'],
    answer: 1
  }
];

const App = () => {
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(15);
  const [quizTimer, setQuizTimer] = useState(600);

  useEffect(() => {
    if (questionTimer > 0) {
      const timerId = setTimeout(() => setQuestionTimer(questionTimer - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      handleNextQuestion();
    }
  }, [questionTimer]);

  useEffect(() => {
    if (quizTimer > 0) {
      const timerId = setTimeout(() => setQuizTimer(quizTimer - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      handleQuizCompletion();
    }
  }, [quizTimer]);

  const handleQuizCompletion = () => {
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionTimer(15);
    } else {
      handleQuizCompletion();
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setAnswers(Array(questions.length).fill(null));
    setShowResult(false);
    setCurrentQuestion(0);
    setQuestionTimer(15);
    setQuizTimer(600);
  };

  const handleAnswerSelection = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const attemptedQuestions = answers.filter(answer => answer !== null).length;
  const notAttemptedQuestions = questions.length - attemptedQuestions;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Quiz App</h1>
      </header>
      <main className="app-main">
        <div className="timer">
          Time Remaining: {Math.floor(quizTimer / 60)}:{quizTimer % 60}
        </div>
        {showResult ? (
          <>
            <Result 
              score={score} 
              total={questions.length} 
              answers={answers} 
              questions={questions} 
              attempted={attemptedQuestions} 
              notAttempted={notAttemptedQuestions} 
            />
            <button className="restart-button" onClick={handleRestartQuiz}>Restart Quiz</button>
          </>
        ) : (
          <Quiz 
            question={questions[currentQuestion]} 
            questionIndex={currentQuestion} 
            totalQuestions={questions.length} 
            onNext={handleNextQuestion} 
            onPrevious={handlePreviousQuestion}
            onAnswer={handleAnswerSelection}
            answers={answers}
            questionTimer={questionTimer}
          />
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Quiz App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;