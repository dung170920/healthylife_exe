import { Input, InputAdornment } from "@mui/material";
import React from "react";
import { RiSearchLine } from "react-icons/ri";

const Searchbar = () => {
  return (
    <Input
      disableUnderline
      placeholder="Tìm kiếm công thức…"
      startAdornment={
        <InputAdornment position="start">
          <RiSearchLine fontSize={24} />
        </InputAdornment>
      }
      sx={{
        mr: 1,
        fontWeight: 500,
        color: "grey.900",
        width: 360,
        fontSize: 14,
      }}
    />
  );
};

export default Searchbar;
