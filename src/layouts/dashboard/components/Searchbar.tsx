import { Input, InputAdornment } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";

const Searchbar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const searchHandler = () => {
    const formatSearchValue = searchRef?.current?.value?.replaceAll(" ", "-");
    navigate(`recipes/result?searchKey=${formatSearchValue}`);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      searchHandler();
    }
  };

  return (
    <Input
      disableUnderline
      placeholder="Tìm kiếm công thức…"
      inputRef={searchRef}
      onKeyDown={handleKeyDown}
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
