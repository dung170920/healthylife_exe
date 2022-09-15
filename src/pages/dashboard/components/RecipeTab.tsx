import { Stack, Box, styled, Typography } from "@mui/material";
import { RecipePreview } from "models";
import { GiKnifeFork } from "react-icons/gi";
import { BiTimeFive } from "react-icons/bi";
import React from "react";

const RecipeTabStyle = styled(Stack)(({ theme }) => ({
  backgroundColor: "#E6EEFB",
  borderRadius: "10px",
  position: "relative",
  padding: "60px 15px 15px",
  width: "210px",
  height: "130px",
  cursor: "pointer",

  "& img": {
    width: "160px",
    height: "160px",
    borderRadius: "100px",
    position: "absolute",
    top: "-40%",
    right: "50%",
    transform: "translate(50%)",
  },

  "& .recipe-info": { marginTop: "auto" },

  "& .recipe-name": {
    marginBottom: "3px",
    fontSize: "17px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  "& .recipe-info-detail": {
    alignItems: "center",
    marginTop: "15px",
    fontSize: "15px",
  },
  "& .recipe-info-detail__icon": { marginRight: "5px" },

  "& .recipe-info-kcal": {
    fontSize: "15px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "33px",
  },
}));

const KcalTextStyle = styled("span")(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "bold",
  color: theme.palette.primary.main,
}));

const RecipeTab: React.FC<{ recipe: RecipePreview }> = ({ recipe }) => {
  return (
    <RecipeTabStyle direction="column" key={recipe.id}>
      <img src={recipe.image}></img>
      <Stack className="recipe-info" direction="column">
        <Typography className="recipe-name" fontWeight="bold">
          {recipe.name}
        </Typography>

        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Stack direction="column">
            <Stack className="recipe-info-detail" direction="row">
              <GiKnifeFork className="recipe-info-detail__icon" />
              {recipe.level} Level
            </Stack>
            <Stack className="recipe-info-detail" direction="row">
              <BiTimeFive className="recipe-info-detail__icon" />
              {recipe.time} min
            </Stack>
          </Stack>

          <Box className="recipe-info-kcal">
            <Box>
              <KcalTextStyle>{recipe.kcal}</KcalTextStyle> Kcal
            </Box>
          </Box>
        </Stack>
      </Stack>
    </RecipeTabStyle>
  );
};

export default RecipeTab;
