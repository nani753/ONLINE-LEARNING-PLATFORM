import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface CourseProgress {
  courseId: string;
  completed: boolean;
  score: number;
  completedAt?: Date;
}

interface ProgressContextType {
  progress: CourseProgress[];
  updateProgress: (courseId: string, score: number) => void;
  getCourseProgress: (courseId: string) => CourseProgress | undefined;
  getOverallProgress: () => { completed: number; total: number; averageScore: number };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const savedProgress = localStorage.getItem(`progress_${currentUser.uid}`);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    }
  }, [currentUser]);

  const updateProgress = (courseId: string, score: number) => {
    if (!currentUser) return;

    const newProgress: CourseProgress = {
      courseId,
      completed: score >= 70, // 70% passing grade
      score,
      completedAt: new Date()
    };

    setProgress(prev => {
      const updated = prev.filter(p => p.courseId !== courseId);
      updated.push(newProgress);
      localStorage.setItem(`progress_${currentUser.uid}`, JSON.stringify(updated));
      return updated;
    });
  };

  const getCourseProgress = (courseId: string) => {
    return progress.find(p => p.courseId === courseId);
  };

  const getOverallProgress = () => {
    const completed = progress.filter(p => p.completed).length;
    const total = progress.length;
    const averageScore = total > 0 ? progress.reduce((acc, p) => acc + p.score, 0) / total : 0;
    return { completed, total, averageScore };
  };

  const value = {
    progress,
    updateProgress,
    getCourseProgress,
    getOverallProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};