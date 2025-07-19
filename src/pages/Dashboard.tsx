import React from 'react';
import { courses } from '../data/courses';
import CourseCard from '../components/Course/CourseCard';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, TrendingUp, Award, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { getOverallProgress } = useProgress();
  const progress = getOverallProgress();

  const stats = [
    {
      icon: BookOpen,
      label: 'Total Courses',
      value: courses.length,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: TrendingUp,
      label: 'Completed',
      value: progress.completed,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Award,
      label: 'Average Score',
      value: `${Math.round(progress.averageScore)}%`,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Clock,
      label: 'In Progress',
      value: progress.total - progress.completed,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser?.email?.split('@')[0] || 'Learner'}!
          </h1>
          <p className="text-gray-600">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Overview */}
        {progress.total > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Progress
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Overall Completion</span>
              <span className="text-sm font-medium text-gray-900">
                {progress.completed}/{progress.total} courses
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress.total > 0 ? (progress.completed / progress.total) * 100 : 0}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0}% complete
            </p>
          </div>
        )}

        {/* Course Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;