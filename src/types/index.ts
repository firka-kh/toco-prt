export type Language = 'taj' | 'rus';

export interface LocalizedText {
  taj: string;
  rus: string;
}

export interface Job {
  id: string;
  title: LocalizedText;
  company: string;
  logo?: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  type: 'full-time' | 'part-time' | 'remote' | 'contract';
  category: string;
  description: LocalizedText;
  requirements: {
    taj: string[];
    rus: string[];
  };
  benefits: {
    taj: string[];
    rus: string[];
  };
  createdAt: Date;
  views: number;
  applications: number;
  featured?: boolean;
  urgent?: boolean;
}

export interface Resume {
  id: string;
  name: string;
  avatar?: string;
  position: LocalizedText;
  location: string;
  experience: number;
  education: string;
  skills: string[];
  languages: {
    name: string;
    level: string;
  }[];
  expectedSalary: {
    min: number;
    max: number;
    currency: string;
  };
  summary: LocalizedText;
  createdAt: Date;
  views: number;
  verified?: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: LocalizedText;
  industry: string;
  size: string;
  website?: string;
  location: string;
  jobsCount: number;
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseType = 'online' | 'offline' | 'hybrid';
export type NewsCategory = 'job_market' | 'career_tips' | 'industry_news' | 'education' | 'government';

export interface Course {
  id: string;
  title: string;
  description: string;
  provider: string;
  duration: number; // in hours
  price: number;
  level: CourseLevel;
  type: CourseType;
  rating: number;
  studentsCount: number;
  startDate: string;
  location?: string;
  image: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: NewsCategory;
  imageUrl: string;
  views: number;
  featured?: boolean;
  tags?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  type: 'jobseeker' | 'employer';
  verified: boolean;
  createdAt: Date;
}

export interface JobFilter {
  keywords?: string;
  location?: string;
  category?: string;
  type?: string;
  salaryMin?: number;
  salaryMax?: number;
  experience?: string;
}

export interface ResumeFilter {
  keywords?: string;
  location?: string;
  category?: string;
  experience?: string;
  salaryMin?: number;
  salaryMax?: number;
}

export interface Statistics {
  totalJobs: number;
  totalResumes: number;
  totalCompanies: number;
  totalUsers: number;
  newJobsThisMonth: number;
  newResumesThisMonth: number;
}
