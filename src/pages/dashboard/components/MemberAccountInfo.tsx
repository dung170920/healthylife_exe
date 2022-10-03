import DateBar from "./DateBar";
import DateRecipeBarList from "./DateRecipeBarList";
import { Stack } from "@mui/material";
import { RecipeModel } from "models";
import { useEffect, useState } from "react";
import { getCurrentWeekMenu } from "api/MenuApi";

const MemberAccountInfo = () => {
  const [foods, setFoods] = useState<any[]>([]);
  const [dates, setDates] = useState<any>([]);

  const getFoodMenu = (foods: any) => {
    setFoods(foods);
  };

  const getCurrentWeekDates = async () => {
    const res = await getCurrentWeekMenu();
    setDates(res.map((item: any) => new Date(`${item.date}`)));
  };

  useEffect(() => {
    getCurrentWeekDates();
  }, []);

  return (
    <Stack sx={{ backgroundColor: "white", p: 3, borderRadius: "25px" }}>
      <DateBar onGetMenuByDate={getFoodMenu} dates={dates} />
      <DateRecipeBarList recipes={foods} />
    </Stack>
  );
};

export default MemberAccountInfo;
