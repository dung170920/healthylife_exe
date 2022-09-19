import { ChefModel } from "models";

export interface RecipeDetailModel {
  id: number;
  image: string;
  name: string;
  description: string;
  chef: ChefModel;
  level: string;
  ingredients: string[];
  time: number;
  kcal: number;
}

export interface RecipePreviewModel {
  id: number;
  image: string;
  name: string;
  level: string;
  time: number;
  kcal: number;
}
