import { PagingModel } from "./PagingModel";

export interface UsersRequestModel extends PagingModel {
  Email?: string;
  Mode: number;
  SearchKey?: string;
}

export interface UserRequestModel {
  mode: string;
  userId: string;
}

export interface UserModel {
  balance?: number;
  birthday?: Date;
  email: string;
  fullName: string;
  gender?: string;
  height?: number;
  id: string;
  pictureUrl: string;
  targetId?: number;
  targetName?: string;
  weight?: number;
  foodCount?: number;
  role?: string;
}
