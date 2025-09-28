// coursesInfo.ts
export interface CoursesInfo {
description: any;
  id: number;
  status: string;
  label: string;
  title: string;
  type: string;
  link: string;
  price: number;
  price_string?: string; // Optional, as it might not always be present
  duration: number; // In seconds
  teacher: Teacher;
  students_count: number;
  category: string;
  image?: string; // Renamed from image_url to match API
  created_at: number; // Unix timestamp
  // Optional fields that may not be present in all responses
  sales?: Sales;
  rate?: number;
  rate_type?: RateType;
  start_date?: number;
  capacity?: number;
  isPrivate?: number;
}

export interface Teacher {
  id: number;
  full_name: string;
  role_name: string;
  bio: string;
  email: string;
  mobile: string;
  offline: number;
  offline_message?: string;
  verified: number;
  rate?: number;
  avatar?: string;
  meeting_status: string;
  user_group?: UserGroup;
  address?: string;
  status: string;
}

export interface UserGroup {
  id: number;
  name: string;
  status: string;
  commission?: number;
  discount?: number;
}

export interface Sales {
  count: number;
  amount: number;
}

export interface CourseParams {
  offset: number;
  limit: number;
}
export interface RateType {
  content_quality: number;
  instructor_skills: number;
  purchase_worth: number;
  support_quality: number;
}
export interface ApiResponse {
  success: boolean;
  status: string;
  message: string;
  data: ResponseData;
}

export interface ResponseData {
  status: string;
  user_id: number;
  [key: string]: any; // Optional: Allows for additional dynamic properties in data
}