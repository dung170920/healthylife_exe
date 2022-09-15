class RecipePreview {
  id: number;
  image: string;
  name: string;
  level: string;
  time: number;
  kcal: number;

  constructor(
    id: number,
    image: string,
    name: string,
    level: string,
    time: number,
    kcal: number
  ) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.level = level;
    this.time = time;
    this.kcal = kcal;
  }
}

export default RecipePreview;
