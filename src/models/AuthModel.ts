export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface RegisterRequestModel {
  email: string;
  password: string;
  fullName: string;
  pictureUrl: string;
  targetId: number;
  gender: string;
  birthday: Date;
  phoneNumber: string;
}

export interface AuthResponseModel {
  accessToken: string;
  refreshToken: string;
}
