import { ChefModel } from "models/index";

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
