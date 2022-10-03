import { Stack, Box, styled, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getMenuByDate, getCurrentWeekMenu } from "api/MenuApi";
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

const DateBar = ({ onGetMenuByDate, dates }: any) => {
  const currentDay = new Date();
  const [dateTab, setDateTab] = useState<any>(
    moment(currentDay).add(1, "days")
  );

  const FetchMenuData = async () => {
    let res = null;

    if (moment().add(1, "days").get("dates") == dateTab.get("dates")) {
      res = await getMenuByDate(moment().toISOString());
    } else {
      res = await getMenuByDate(dateTab.toISOString());
    }

    onGetMenuByDate(res?.foods);
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
      {dates?.map((d: any, i: number) => (
        <DateBarItemStyle
          key={i}
          onClick={(e) => {
            setDateTab(moment(d).add(1, "days"));
            console.log("click date: ", d);
          }}
          sx={{
            color: `${
              moment(dateTab).get("dates") ===
              moment(d).add(1, "days").get("dates")
                ? "#FFFF !important"
                : ""
            }`,
            backgroundColor: `${
              moment(dateTab).get("dates") ===
              moment(d).add(1, "days").get("dates")
                ? "#1AC073 !important"
                : ""
            }`,
          }}
        >
          <Typography fontSize={14}>{d.getDate()}</Typography>
          <Typography fontSize={14}>{StringOfDay(d.getDay())}</Typography>
        </DateBarItemStyle>
      ))}
    </DateBarStyle>
  );
};

export default DateBar;
