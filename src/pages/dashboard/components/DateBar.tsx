import { Stack, Box, styled, Typography } from "@mui/material";
import React from "react";

const DateBarStyle = styled(Stack)(({ theme }) => ({
  marginBottom: "10px",
  cursor: "pointer",
  color: theme.palette.grey[900],
}));
const DateBarItemStyle = styled(Box)(({ theme }) => ({
  borderRadius: "15px",
  textAlign: "center",
}));

// const DateRecipeBarItemStyle = {
//   0: { color: "#879497" },
//   1: { color: "#57696D" },
//   2: { color: "#273E43" },
//   3: { color: "#FFFF", backgroundColor: "#1AC073" },
//   4: { color: "#273E43" },
//   5: { color: "#57696D" },
//   6: { color: "#879497" },
// };

const ActiveDateItem = {
  color: "#FFFF",
  backgroundColor: "#1AC073",
  padding: "10px",
  borderRadius: "15px",
};

const DateBar = () => {
  const dummyDateData = [
    { date: 17, day: "T5" },
    { date: 18, day: "T6" },
    { date: 18, day: "T7" },
    { date: 19, day: "CN" },
    { date: 20, day: "T2" },
    { date: 21, day: "T3" },
    { date: 22, day: "T4" },
  ];

  return (
    <DateBarStyle
      direction="row"
      spacing={3}
      alignItems="center"
      justifyContent="center"
    >
      {dummyDateData.map((d) => (
        <DateBarItemStyle>
          <Typography fontSize={14}>{d.date}</Typography>
          <Typography fontSize={14}>{d.day}</Typography>
        </DateBarItemStyle>
      ))}
    </DateBarStyle>
  );
};

export default DateBar;
