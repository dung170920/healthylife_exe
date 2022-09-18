import { NutritionModel } from "models/NutritionModel";
import { Stack, Typography, styled } from "@mui/material";
import React from "react";

type Props = {
  nutrition: NutritionModel;
};

const NutritionStyle = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  width: "110px",
  padding: "10px",
  background: "rgba(26, 192, 115, 0.1)",
  borderRadius: "7.03394px",
  fontSize: "50px",
  border: "1.5px solid #ffff",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 8px",

  "& .nutrition_amount": {
    fontSize: "19.42px",
    fontWeight: 500,
  },

  "& .nutrition_name": {
    fontSize: "12.95px",
    fontWeight: 500,
  },

  "& .nutrition_unit": {
    fontSize: "12.95px",
    fontWeight: 500,
    color: theme.palette.grey[700],
  },
}));

const NutritionItem = ({ nutrition }: Props) => {
  return (
    <NutritionStyle gap={1}>
      <Typography className="nutrition_amount">{nutrition.amount}</Typography>
      <Typography className="nutrition_name">{nutrition.name}</Typography>
      <Typography className="nutrition_unit">{nutrition.unit}</Typography>
    </NutritionStyle>
  );
};

export default React.memo(NutritionItem);
