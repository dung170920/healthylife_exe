import { Stack, styled, Grid } from "@mui/material";
import FoodItem from "pages/chef/components/FoodItem";
import { RecipePreviewModel } from "models";

const ChefDetailFoodListStyles = styled(Stack)(({ theme }) => ({}));

type Props = {
  items: RecipePreviewModel[];
};

const FoodList = ({ items }: Props) => {
  return (
    <>
      <Grid container spacing={6}>
        {items.map((item: any) => (
          <Grid item xs={4} key={item.Id}>
            <FoodItem item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FoodList;
