export enum ExperienceLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert'
}

export enum CohortOption {
  WEEKEND_MORNING = 'Weekend (Sat/Sun 10am - 12pm)',
  WEEKDAY_EVENING = 'Weekday (Tue/Thu 7pm - 9pm)'
}

export enum PaymentMethod {
  UPI = 'UPI / GPay',
  CARD = 'Card',
  NET_BANKING = 'Net Banking'
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  experience: ExperienceLevel;
  cohort: CohortOption;
  paymentMethod: PaymentMethod;
}

export interface SyllabusWeek {
  weekNumber: number;
  title: string;
  description: string;
  topics: string[];
}

export interface GeneratedCoursePlan {
  welcomeMessage: string;
  weeks: SyllabusWeek[];
}

export enum AppState {
  LANDING = 'LANDING',
  ENROLLING = 'ENROLLING',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
