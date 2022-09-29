import {
  Input,
  InputAdornment,
  Select,
  SelectChangeEvent,
  FormControl,
  Stack,
  MenuItem,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";

const Searchbar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState("Tên món");

  const navigate = useNavigate();

  const handleFilterModeChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
    setMode(event.target.value as string);
  };

  const searchHandler = () => {
    const formatSearchValue = searchRef?.current?.value?.replaceAll(" ", "-");
    if (mode === "Tên món") {
      navigate(`recipes/result?searchKey=${formatSearchValue}`);
    }

    if (mode === "Tên nguyên liệu") {
      navigate(`recipes/result?RecipeName=${formatSearchValue}`);
    }
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
    <Stack direction="row">
      <Input
        disableUnderline
        placeholder={`Tìm kiếm theo ${mode}…`}
        inputRef={searchRef}
        onKeyDown={handleKeyDown}
        startAdornment={
          <InputAdornment position="start" sx={{ ml: 1 }}>
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

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={mode}
        defaultValue={mode}
        sx={{ width: "auto", paddingRight: "17px" }}
        label="Mode"
        onChange={handleFilterModeChange}
      >
        <MenuItem value={"Tên món"}>Tên món</MenuItem>
        <MenuItem value={"Tên nguyên liệu"}>Tên nguyên liệu</MenuItem>
      </Select>
      {/* </FormControl> */}
    </Stack>
  );
};

export default Searchbar;
