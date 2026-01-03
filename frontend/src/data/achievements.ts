export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: UserStats) => boolean;
  category: 'tasks' | 'lessons' | 'streak' | 'special';
};

export type UserStats = {
  tasksCompleted: number;
  lessonsCompleted: number;
  easyTasksCompleted: number;
  mediumTasksCompleted: number;
  hardTasksCompleted: number;
  currentStreak: number;
  maxStreak: number;
  totalHintsUsed: number;
  perfectSolutions: number; // задачи решенные с первого раза
};

export const achievements: Achievement[] = [
  {
    id: 'first_steps',
    title: 'Первые шаги',
    description: 'Решите первую задачу',
    icon: '🎯',
    condition: (stats) => stats.tasksCompleted >= 1,
    category: 'tasks',
  },
  {
    id: 'beginner',
    title: 'Новичок',
    description: 'Решите 5 задач',
    icon: '📚',
    condition: (stats) => stats.tasksCompleted >= 5,
    category: 'tasks',
  },
  {
    id: 'intermediate',
    title: 'Практикант',
    description: 'Решите 10 задач',
    icon: '💪',
    condition: (stats) => stats.tasksCompleted >= 10,
    category: 'tasks',
  },
  {
    id: 'advanced',
    title: 'Эксперт',
    description: 'Решите 15 задач',
    icon: '🏆',
    condition: (stats) => stats.tasksCompleted >= 15,
    category: 'tasks',
  },
  {
    id: 'master',
    title: 'Мастер',
    description: 'Решите все задачи',
    icon: '👑',
    condition: (stats) => stats.tasksCompleted >= 19,
    category: 'tasks',
  },
  {
    id: 'easy_master',
    title: 'Легкий старт',
    description: 'Решите 5 легких задач',
    icon: '🌟',
    condition: (stats) => stats.easyTasksCompleted >= 5,
    category: 'tasks',
  },
  {
    id: 'medium_master',
    title: 'Средний уровень',
    description: 'Решите 5 средних задач',
    icon: '⭐',
    condition: (stats) => stats.mediumTasksCompleted >= 5,
    category: 'tasks',
  },
  {
    id: 'hard_master',
    title: 'Покоритель сложности',
    description: 'Решите 5 сложных задач',
    icon: '💎',
    condition: (stats) => stats.hardTasksCompleted >= 5,
    category: 'tasks',
  },
  {
    id: 'lesson_starter',
    title: 'Ученик',
    description: 'Завершите первый урок',
    icon: '📖',
    condition: (stats) => stats.lessonsCompleted >= 1,
    category: 'lessons',
  },
  {
    id: 'lesson_enthusiast',
    title: 'Энтузиаст',
    description: 'Завершите 5 уроков',
    icon: '📗',
    condition: (stats) => stats.lessonsCompleted >= 5,
    category: 'lessons',
  },
  {
    id: 'lesson_master',
    title: 'Знаток теории',
    description: 'Завершите все уроки',
    icon: '🎓',
    condition: (stats) => stats.lessonsCompleted >= 10,
    category: 'lessons',
  },
  {
    id: 'streak_3',
    title: 'Постоянство',
    description: 'Решайте задачи 3 дня подряд',
    icon: '🔥',
    condition: (stats) => stats.currentStreak >= 3,
    category: 'streak',
  },
  {
    id: 'streak_7',
    title: 'Неделя успеха',
    description: 'Решайте задачи 7 дней подряд',
    icon: '🔥🔥',
    condition: (stats) => stats.currentStreak >= 7,
    category: 'streak',
  },
  {
    id: 'streak_30',
    title: 'Месяц упорства',
    description: 'Решайте задачи 30 дней подряд',
    icon: '🔥🔥🔥',
    condition: (stats) => stats.currentStreak >= 30,
    category: 'streak',
  },
  {
    id: 'no_hints',
    title: 'Самостоятельный',
    description: 'Решите 5 задач без подсказок',
    icon: '🧠',
    condition: (stats) => stats.perfectSolutions >= 5,
    category: 'special',
  },
  {
    id: 'perfectionist',
    title: 'Перфекционист',
    description: 'Решите 10 задач с первого раза',
    icon: '✨',
    condition: (stats) => stats.perfectSolutions >= 10,
    category: 'special',
  },
];

export function calculateUserStats(progress: Record<string, number>): UserStats {
  const tasksCompleted = Object.keys(progress).filter(k => !k.startsWith('lesson:') && progress[k] > 0).length;
  const lessonsCompleted = Object.keys(progress).filter(k => k.startsWith('lesson:') && progress[k] > 0).length;
  
  // Для демонстрации - в реальности нужно хранить больше данных
  return {
    tasksCompleted,
    lessonsCompleted,
    easyTasksCompleted: Math.floor(tasksCompleted * 0.4),
    mediumTasksCompleted: Math.floor(tasksCompleted * 0.35),
    hardTasksCompleted: Math.floor(tasksCompleted * 0.25),
    currentStreak: 0, // TODO: реализовать отслеживание
    maxStreak: 0,
    totalHintsUsed: 0,
    perfectSolutions: 0,
  };
}

export function getUnlockedAchievements(stats: UserStats): Achievement[] {
  return achievements.filter(a => a.condition(stats));
}
