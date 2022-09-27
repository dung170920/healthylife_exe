import React from "react";
import { Box, styled } from "@mui/material";

const IngredientListStyle = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[800],
}));

const IngredientList: React.FC<any> = ({ ingredients }) => {
  return (
    <IngredientListStyle sx={{ marginLeft: "20px" }}>
      <ul>
        {ingredients.map((ingredient: any, i: number) => (
          <li key={i}>
            {ingredient.amount} {ingredient.recipeName}
          </li>
        ))}
      </ul>
    </IngredientListStyle>
  );
};

export default React.memo(IngredientList);
