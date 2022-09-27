import { Grid } from "@mui/material";
import FoodItem from "pages/profile/components/FoodItem";
import { RecipeModel } from "models";

type Props = {
  items: RecipeModel[];
};

const FoodList = ({ items }: Props) => {
  return (
    <>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={4} key={item.id}>
            <FoodItem item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FoodList;
