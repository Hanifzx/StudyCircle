// ==========================================
// Auth & User Types
// ==========================================

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  semester?: number;
  bio?: string;
  role: 'USER' | 'ADMIN';
  level: number;
  points: number;
  learningStyle?: LearningStyle;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  semester: number | null;
  bio?: string;
  role: 'USER' | 'ADMIN';
  level: number;
  points: number;
  learningStyle?: {
    primaryStyle: string;
  };
}

export interface LearningStyle {
  id: string;
  primaryStyle: string;
  secondaryStyle?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ==========================================
// Group Types
// ==========================================

export interface Group {
  id: string;
  name: string;
  description?: string;
  subjectId: string;
  maxMembers: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  subject?: Subject;
  _count?: { members: number };
  members?: Member[];
}

export interface Member {
  id: string;
  studyGroupId: string;
  userId: string;
  role: 'admin' | 'member';
  joinedAt: string;
  user: {
    id: string;
    fullName: string;
    username: string;
    email?: string;
  };
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  description?: string | null;
}

export interface CreateGroupPayload {
  name: string;
  description?: string;
  subjectName: string;
  maxMembers?: number;
}

// ==========================================
// Session Types
// ==========================================

export type SessionStatus = 'scheduled' | 'active' | 'completed' | 'cancelled';
export type AttendanceStatus = 'active' | 'completed' | 'left_early';

export interface Session {
  id: string;
  studyGroupId: string;
  createdBy: string;
  title: string;
  description?: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
  studyGroup?: Group;
  attendances?: SessionAttendance[];
  creator?: { id: string; fullName: string; username: string };
}

export interface SessionAttendance {
  id: string;
  sessionId: string;
  userId: string;
  joinedAt: string;
  leftAt?: string;
  durationMinutes?: number;
  status: AttendanceStatus;
  user?: { id: string; fullName: string; username: string };
}

export interface CreateSessionPayload {
  title: string;
  description?: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
}

// ==========================================
// Material Types
// ==========================================

export interface Material {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType?: string;
  fileSize?: number;
  uploadedAt: string;
  uploaderName: string;
  uploaderId: string;
}

export interface UploadMaterialPayload {
  title: string;
  description?: string;
  file: File;
}

// ==========================================
// Progress Types
// ==========================================

export type MasteryLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface Progress {
  id: string;
  subjectId: string;
  subjectName: string;
  masteryLevel: MasteryLevel;
  totalStudyHours: number;
  sessionsAttended: number;
  lastStudiedAt?: string;
}

export interface ProgressSummary {
  subjectsTracked: number;
  totalStudyHours: number;
  completedSessions: number;
  advancedSubjects: number;
  intermediateSubjects: number;
  beginnerSubjects: number;
}

// ==========================================
// API Response Types
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Array<{ path: string; message: string }>;
}
