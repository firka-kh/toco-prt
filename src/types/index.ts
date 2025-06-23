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

export interface Course {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  instructor: string;
  duration: string;
  price: number;
  currency: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  studentsCount: number;
  image?: string;
  featured?: boolean;
}

export interface NewsArticle {
  id: string;
  title: LocalizedText;
  content: LocalizedText;
  excerpt: LocalizedText;
  author: string;
  publishedAt: Date;
  category: string;
  image?: string;
  views: number;
  featured?: boolean;
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
