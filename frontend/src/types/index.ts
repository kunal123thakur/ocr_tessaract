export interface DocumentData {
  filename: string;
  extracted_text: string;
  student_name?: string;
  roll_number?: string;
  course?: string;
  institution?: string;
  grade?: string;
  date_of_completion?: string;
  [key: string]: any;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  course: string;
  institution: string;
  grade?: string;
  dateOfCompletion?: string;
  hashKey: string;
  verified: boolean;
  createdAt: string;
}

export interface UploadResponse {
  success: boolean;
  data?: DocumentData;
  message?: string;
}

export interface VerificationResponse {
  verified: boolean;
  match_details?: any;
  message: string;
}