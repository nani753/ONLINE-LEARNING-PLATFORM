import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { courses } from '../data/courses';
import { User, Mail, Calendar, Trophy, BookOpen, Target, TrendingUp } from 'lucide-react';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const { progress, getOverallProgress } = useProgress();
  const overallProgress = getOverallProgress();

  const completedCourses = progress.filter(p => p.completed);
  const inProgressCourses = progress.filter(p => !p.completed && p.score > 0);

  const getCourseName = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  const achievements = [
    {
      icon: BookOpen,
      title: 'First Course',
      description: 'Completed your first course',
      earned: completedCourses.length > 0,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Trophy,
      title: 'High Achiever',
      description: 'Scored 90% or higher on a quiz',
      earned: progress.some(p => p.score >= 90),
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Target,
      title: 'Course Master',
      description: 'Completed 3 courses',
      earned: completedCourses.length >= 3,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Learning Streak',
      description: 'Maintained consistent learning',
      earned: progress.length >= 5,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-6">
              <User className="h-16 w-16 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentUser?.email?.split('@')[0] || 'User'}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{currentUser?.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {new Date(currentUser?.metadata.creationTime || '').toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Courses Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedCourses.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{inProgressCourses.length}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(overallProgress.averageScore)}%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <p className="text-2xl font-bold text-gray-900">{achievements.filter(a => a.earned).length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Progress */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Progress</h2>
            <div className="space-y-4">
              {progress.length > 0 ? (
                progress.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{getCourseName(item.courseId)}</h3>
                      <p className="text-sm text-gray-600">
                        {item.completed ? 'Completed' : `Progress: ${item.score}%`}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.completed ? 'Done' : `${item.score}%`}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No progress yet. Start learning to see your progress here!
                </p>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${
                  achievement.earned 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      achievement.earned ? achievement.color : 'bg-gray-100 text-gray-400'
                    }`}>
                      <achievement.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <div className="ml-auto">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;