import { Bowl, HeaderBreadcumbs } from "components";
import React, { useState, useEffect } from "react";
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
import moment from "moment";
import { getMenuByDate } from "api/MenuApi";
import { Link } from "react-router-dom";

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
  cursor: "pointer",

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

const Menu = () => {
  const [today, setToday] = useState(new Date());
  const [foods, setFoods] = useState([]);

  const GetMenuByDate = async () => {
    const res = await getMenuByDate(today.toISOString());

    setFoods(res.foods);
  };
  useEffect(() => {
    GetMenuByDate();
  }, [today]);
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
                console.log(
                  "date value: ",
                  moment(newValue.$d).format("DD/MM/YYYY")
                );
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
            {foods.map((food: any) => (
              <Link to={`/recipes/recipe/${food.food.id}`}>
                <RecipeMenuItem direction="row" key={food.food.id}>
                  <Stack>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                      {food.food.name}
                    </Typography>

                    <ItemContentStyle direction="row">
                      <BiTimeFive fontSize={24} /> {food.food.timeCost} phút
                    </ItemContentStyle>
                    <ItemContentStyle direction="row">
                      <AiOutlineFire fontSize={24} />
                      {Math.round(food.food.calorie)} calories
                    </ItemContentStyle>
                  </Stack>
                  <Bowl size={60} sx={{ right: "20px", bottom: "20px" }}>
                    <Avatar
                      src={food.food.pictureUrl}
                      sx={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    ></Avatar>
                  </Bowl>
                </RecipeMenuItem>
              </Link>
            ))}
          </BoxStyle>
        </Grid>
      </Grid>
    </>
  );
};

export default Menu;
