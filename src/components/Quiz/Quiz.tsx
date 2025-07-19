import React, { useState } from 'react';
import { Quiz as QuizType, Course } from '../../data/courses';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useProgress } from '../../contexts/ProgressContext';

interface QuizProps {
  course: Course;
}

const Quiz: React.FC<QuizProps> = ({ course }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizCompleted) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < course.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === course.quiz[index].correctAnswer
    ).length;
    
    const score = Math.round((correctAnswers / course.quiz.length) * 100);
    
    updateProgress(course.id, score);
    setQuizCompleted(true);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const getScore = () => {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === course.quiz[index].correctAnswer
    ).length;
    return Math.round((correctAnswers / course.quiz.length) * 100);
  };

  const currentQuiz = course.quiz[currentQuestion];

  if (showResults) {
    const score = getScore();
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === course.quiz[index].correctAnswer
    ).length;

    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            score >= 70 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {score >= 70 ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz Complete!
          </h3>
          <p className="text-gray-600 mb-4">
            You scored {correctAnswers} out of {course.quiz.length} questions correctly
          </p>
          <div className="text-4xl font-bold mb-4">
            <span className={score >= 70 ? 'text-green-600' : 'text-red-600'}>
              {score}%
            </span>
          </div>
          <p className={`text-lg font-semibold ${
            score >= 70 ? 'text-green-600' : 'text-red-600'
          }`}>
            {score >= 70 ? 'Congratulations! You passed!' : 'Keep practicing!'}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {course.quiz.map((question, index) => {
            const isCorrect = selectedAnswers[index] === question.correctAnswer;
            return (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Question {index + 1}: {question.question}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Your answer: {question.options[selectedAnswers[index]]}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-green-600 mb-2">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={resetQuiz}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Retake Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Quiz: {course.title}
          </h3>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {course.quiz.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / course.quiz.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">
          {currentQuiz.question}
        </h4>
        
        <div className="space-y-3">
          {currentQuiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        <button
          onClick={nextQuestion}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {currentQuestion === course.quiz.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;