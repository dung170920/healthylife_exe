import { ChefModel, RecipeTypeModel } from "models";

export interface RecipeModel {
  id: string;
  difficulty: number;
  addBy: string;
  addDate: Date;
  pictureUrl: string;
  name: string;
  isMembershipOnly: boolean;
  isAvailable: boolean;
  description: string;
  chef: ChefModel;
  foodType: RecipeTypeModel;
  timeCost: number;
  ingredients: string[];
  instruction: string[];
  time?: number;
  calorie?: number;
  type?: string;
}

export interface RecipeRequestModel {
  FilterMode: number;
  FoodTypeId?: number;
  SearchKey?: string;
  RecipeName?: string;
  Page?: number;
  PageSize?: number;
  ChefId?: string;
}
