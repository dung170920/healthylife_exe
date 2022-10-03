import { Stack, Box, styled, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getMenuByDate } from "api/MenuApi";
import moment from "moment";

const DateBarStyle = styled(Stack)(({ theme }) => ({
  marginBottom: "10px",
  cursor: "pointer",
  color: theme.palette.grey[900],
}));
const DateBarItemStyle = styled(Box)(({ theme }) => ({
  borderRadius: "18px",
  padding: "6px",
  textAlign: "center",
}));

const StringOfDay = (dayNumber: number) => {
  switch (dayNumber) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
  }
};

const DateBar = ({ onGetMenuByDate }: any) => {
  const currentDay = moment().utc().local();
  const [dateTab, setDateTab] = useState<any>(currentDay);
  const dateData = [];
  const startOfWeek = moment().utc().local().startOf("week").toDate();

  for (let i = 0; i < 6; i++) {
    dateData.push(moment(startOfWeek).add(i, "day"));
  }

  const FetchMenuData = async () => {
    const res = await getMenuByDate(dateTab.toISOString());

    onGetMenuByDate(res.foods);
  };

  useEffect(() => {
    FetchMenuData();
  }, [dateTab]);

  return (
    <DateBarStyle
      direction="row"
      spacing={1.5}
      alignItems="center"
      justifyContent="center"
    >
      {dateData.map((d, i) => (
        <DateBarItemStyle
          key={i}
          onClick={(e) => {
            setDateTab(d.utc().local());
            console.log("click date: ", d.toISOString());
          }}
          sx={{
            color: `${
              dateTab?.get("date") === d.utc().local().get("date")
                ? "#FFFF !important"
                : ""
            }`,
            backgroundColor: `${
              dateTab?.get("date") === d.utc().local().get("date")
                ? "#1AC073 !important"
                : ""
            }`,
          }}
        >
          <Typography fontSize={14}>{d.get("date")}</Typography>
          <Typography fontSize={14}>{StringOfDay(d.get("day"))}</Typography>
        </DateBarItemStyle>
      ))}
    </DateBarStyle>
  );
};

export default DateBar;
