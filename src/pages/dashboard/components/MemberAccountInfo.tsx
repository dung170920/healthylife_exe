import DateBar from "./DateBar";
import DateRecipeBarList from "./DateRecipeBarList";
import { Stack } from "@mui/material";
import { RecipeModel } from "models";
import { useEffect, useState } from "react";
import { getMenuByDate } from "api/MenuApi";

const MemberAccountInfo = () => {
  const [foods, setFoods] = useState<any[]>([]);

  const getFoodMenu = (foods: any) => {
    setFoods(foods);
  };

  return (
    <Stack sx={{ backgroundColor: "white", p: 3, borderRadius: "25px" }}>
      <DateBar onGetMenuByDate={getFoodMenu} />
      <DateRecipeBarList recipes={foods} />
    </Stack>
  );
};

export default MemberAccountInfo;
