import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../data/courses';
import { Clock, User, Star, CheckCircle } from 'lucide-react';
import { useProgress } from '../../contexts/ProgressContext';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { getCourseProgress } = useProgress();
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {course.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
        {progress?.completed && (
          <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
            <CheckCircle className="h-4 w-4" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
            <span>4.8</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <User className="h-4 w-4 mr-1" />
          <span className="mr-4">{course.instructor}</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration}</span>
        </div>

        {progress && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
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
        
        <Link
          to={`/course/${course.id}`}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
        >
          {progress?.completed ? 'Review Course' : 'Start Learning'}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;