export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  title: string;
  grade: string;
  subject: string;
  unit?: string;
  subtopic?: string;
  questions: Question[];
  isFallback?: boolean;
}

export interface SubtopicNode {
  id: string;
  name: string;
}

export interface UnitNode {
  id: string;
  name: string;
  subtopics: SubtopicNode[];
}

export interface SubjectNode {
  id: string;
  name: string;
  icon?: string;
  units: UnitNode[];
}

export interface GradeNode {
  id: string;
  name: string;
  subjects: SubjectNode[];
}

export interface EntranceExamNode {
  id: string;
  subject: string;
  years: string[];
  stream?: "natural" | "social" | "both";
}

export interface QuizAttempt {
  id: string;
  quizTitle: string;
  grade: string;
  subject: string;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  date: string;
}
