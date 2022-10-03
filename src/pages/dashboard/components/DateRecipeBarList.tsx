import { RecipeModel } from "models";
import { Stack, styled, Typography } from "@mui/material";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";
import moment from "moment";
import { Bowl } from "components";

const DateRecipeMenuItem = styled(Stack)(({ theme }) => ({
  padding: "20px",
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  position: "relative",

  ":last-child": {
    borderBottom: "none",
    paddingBottom: 0,
  },

  "& .date-recipe-name": { fontSize: "16px", fontWeight: 600 },

  "& .date-recipe-detail": {
    fontSize: "12px",
    marginTop: "6px",
    alignItems: "center",
    color: theme.palette.grey[600],
  },

  "& .date-recipe-detail-icon": { fontSize: "16px", marginRight: "8px" },

  "& .date-recipe-image": {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
}));

type Props = {
  recipes: RecipeModel[];
};

const DateRecipeBarList = ({ recipes }: any) => {
  return (
    <Stack>
      {recipes.map((recipe: any) => (
        <DateRecipeMenuItem direction="row" key={recipe.food.id}>
          <Stack className="date-recipe-info">
            <Typography className="date-recipe-name">
              {recipe.food.name}
            </Typography>
            <Stack className="date-recipe-detail" direction="row">
              <BiTimeFive className="date-recipe-detail-icon" />{" "}
              {recipe.food.timeCost} phút
            </Stack>
            <Stack className="date-recipe-detail" direction="row">
              <AiOutlineFire className="date-recipe-detail-icon" />
              {recipe.food.calorie} calories
            </Stack>
          </Stack>
          <Bowl size={60} sx={{ right: 5, bottom: "20px" }}>
            <img
              className="date-recipe-image"
              src={recipe.food.pictureUrl}
              alt=""
            ></img>
          </Bowl>
        </DateRecipeMenuItem>
      ))}
    </Stack>
  );
};

export default DateRecipeBarList;
