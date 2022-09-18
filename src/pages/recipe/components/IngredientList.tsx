import React from "react";
import { Box, styled } from "@mui/material";

const IngredientListStyle = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[800],
}));

const IngredientList: React.FC<{ ingredients: string[] }> = ({
  ingredients,
}) => {
  return (
    <IngredientListStyle sx={{ marginLeft: "20px" }}>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={i}>{ingredient}</li>
        ))}
      </ul>
    </IngredientListStyle>
  );
};

export default React.memo(IngredientList);
