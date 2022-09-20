import { ChefModel } from "models";

export interface RecipeModel {
  id: number;
  image: string;
  name: string;
  description?: string;
  chef?: ChefModel;
  level?: string;
  ingredients?: string[];
  time?: number;
  kcal?: number;
  type?: string;
}

export interface RecipePreviewModel {
  id: number;
  image: string;
  name: string;
  level: string;
  time: number;
  kcal: number;
}
