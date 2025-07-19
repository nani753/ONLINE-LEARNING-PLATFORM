import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { courses } from '../data/courses';
import VideoPlayer from '../components/Course/VideoPlayer';
import Quiz from '../components/Quiz/Quiz';
import { useProgress } from '../contexts/ProgressContext';
import { Clock, User, Star, BookOpen, CheckCircle } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'video' | 'quiz'>('video');
  const { getCourseProgress } = useProgress();

  const course = courses.find(c => c.id === id);
  
  if (!course) {
    return <Navigate to="/dashboard" replace />;
  }

  const progress = getCourseProgress(course.id);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="lg:w-2/3">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                {course.featured && (
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
                {progress?.completed && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              
              <p className="text-gray-600 mb-6">
                {course.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span>4.8 (1,234 reviews)</span>
                </div>
              </div>

              {progress && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Your Progress</span>
                    <span>{progress.completed ? 'Completed' : `${progress.score}%`}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        progress.completed ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${progress.completed ? 100 : progress.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('video')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'video'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Video Lesson</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'quiz'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Quiz ({course.quiz.length} questions)</span>
                </div>
              </button>
            </nav>
          </div>
          
          <div className="p-8">
            {activeTab === 'video' && (
              <div>
                <VideoPlayer videoUrl={course.videoUrl} title={course.title} />
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    About this lesson
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {course.description} This comprehensive lesson will guide you through 
                    the fundamental concepts and practical applications. You'll learn through 
                    real-world examples and hands-on exercises that will help you master 
                    the material effectively.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'quiz' && (
              <div>
                <Quiz course={course} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;