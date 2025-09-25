export interface coursesInfo{

}
export interface courseDetails{

}
export interface courseBody{

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