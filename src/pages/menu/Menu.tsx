import { Bowl, HeaderBreadcumbs } from "components";
import React, { useState } from "react";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {
  Box,
  Grid,
  Stack,
  styled,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import { RecipeModel } from "models";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";

const StaticDatePickerStyle = styled(StaticDatePicker)(({ theme }) => ({
  padding: "16px",

  "& .MuiDayPicker-slideTransition": {
    minHeight: 260,
  },

  "& .MuiDayPicker-header": {
    "& .MuiDayPicker-weekDayLabel": {
      width: 38,
      height: 38,
      fontSize: 14,
      margin: "0 3px",
    },
  },

  "& .MuiPickersDay-root": {
    width: 38,
    height: 38,
    fontSize: 14,
    margin: "0 3px",
    "&.Mui-selected": {
      color: "white",
    },
  },

  "& .MuiDatePickerToolbar-root button": {
    color: theme.palette.grey[600],
  },
}));

const BoxStyle = styled(Box)(() => ({
  borderRadius: "20px",
  backgroundColor: "white",
}));

const RecipeMenuItem = styled(Stack)(({ theme }) => ({
  padding: "20px",
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  position: "relative",

  ":last-child": {
    borderBottom: "none",
  },
}));

const ItemContentStyle = styled(Stack)(({ theme }) => ({
  fontSize: "14px",
  marginTop: "6px",
  alignItems: "center",
  color: theme.palette.grey[600],
  gap: "10px",
}));

const dummyRecipeData = [
  {
    id: 1,
    image:
      "https://cdn.tgdd.vn/2021/07/CookRecipe/Avatar/trung-cuon-ngu-sac-chien-thumbnail-1.jpg",
    name: "Trứng cuộn ngũ sắc",
    level: "Easy",
    time: 30,
    kcal: 587,
  },
  {
    id: 2,
    image:
      "https://cdn.tgdd.vn/2021/07/CookRecipe/Avatar/trung-cuon-ngu-sac-chien-thumbnail-1.jpg",
    name: "Trứng cuộn ngũ sắc",
    level: "Easy",
    time: 30,
    kcal: 587,
  },
  {
    id: 3,
    image:
      "https://cdn.tgdd.vn/2021/07/CookRecipe/Avatar/trung-cuon-ngu-sac-chien-thumbnail-1.jpg",
    name: "Trứng cuộn ngũ sắc",
    level: "Easy",
    time: 30,
    kcal: 587,
  },
  {
    id: 4,
    image:
      "https://cdn.tgdd.vn/2021/07/CookRecipe/Avatar/trung-cuon-ngu-sac-chien-thumbnail-1.jpg",
    name: "Trứng cuộn ngũ sắc",
    level: "Easy",
    time: 30,
    kcal: 587,
  },
];

const Menu = () => {
  const [today, setToday] = useState(new Date());

  return (
    <>
      <HeaderBreadcumbs
        heading="Thực đơn"
        links={[{ name: "Trang chủ", to: "/" }, { name: "Thực đơn" }]}
      />
      <Grid container spacing={7}>
        <Grid item xs={7}>
          <BoxStyle>
            <StaticDatePickerStyle
              orientation="landscape"
              openTo="day"
              value={today}
              onChange={(newValue: any) => {
                setToday(newValue);
              }}
              toolbarTitle="chọn ngày"
              dayOfWeekFormatter={(day) => day}
              componentsProps={{
                actionBar: {
                  actions: [],
                },
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </BoxStyle>
        </Grid>
        <Grid item xs={5}>
          <BoxStyle>
            {dummyRecipeData.map((recipe) => (
              <RecipeMenuItem direction="row" key={recipe.id}>
                <Stack>
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    {recipe.name}
                  </Typography>

                  <ItemContentStyle direction="row">
                    <BiTimeFive fontSize={24} /> {recipe.time} phút
                  </ItemContentStyle>
                  <ItemContentStyle direction="row">
                    <AiOutlineFire fontSize={24} />
                    {recipe.kcal} calories
                  </ItemContentStyle>
                </Stack>
                <Bowl size={60} sx={{ right: "20px", bottom: "20px" }}>
                  <Avatar
                    src={recipe.image}
                    sx={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  ></Avatar>
                </Bowl>
              </RecipeMenuItem>
            ))}
          </BoxStyle>
        </Grid>
      </Grid>
    </>
  );
};

export default Menu;
