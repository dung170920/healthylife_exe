export interface UsersRequestModel {
  email?: string;
  mode: number;
  searchKey?: string;
  page?: number;
  pageSize?: number;
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
}
