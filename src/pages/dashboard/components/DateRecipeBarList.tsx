import { RecipePreviewModel } from "../../../models/index";
import { Stack, Box, styled, Typography } from "@mui/material";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";

const DateRecipeMenuItem = styled(Stack)(({ theme }) => ({
  marginTop: "15px",
  justifyContent: "space-between",

  "& .date-recipe-name": { fontSize: "15px", fontWeight: "bold" },

  "& .date-recipe-detail": {
    frontSize: "10px",
    frontWeight: "light",
    marginTop: "10px",
    alignItems: "center",
    color: "#92929D",
  },

  "& .date-recipe-detail-icon": { frontSize: "13px", marginRight: "13px" },

  "& .date-recipe-image": {
    width: "75px",
    height: "75px",
    borderRadius: "50px",
    marginTop: "20px",
  },
}));

type Props = {
  recipes: RecipePreviewModel[];
};

const DateRecipeBarList = ({ recipes }: Props) => {
  return (
    <Stack gap={4}>
      {recipes.map((recipe) => (
        <DateRecipeMenuItem direction="row" key={recipe.id}>
          <Stack className="date-recipe-info">
            <Typography className="date-recipe-name">{recipe.name}</Typography>
            <Stack className="date-recipe-detail" direction="row">
              <BiTimeFive className="date-recipe-detail-icon" /> {recipe.time}{" "}
              phút
            </Stack>
            <Stack className="date-recipe-detail" direction="row">
              <AiOutlineFire className="date-recipe-detail-icon" />
              {recipe.kcal} calories
            </Stack>
          </Stack>
          <img className="date-recipe-image" src={recipe.image}></img>
        </DateRecipeMenuItem>
      ))}
    </Stack>
  );
};

export default DateRecipeBarList;
