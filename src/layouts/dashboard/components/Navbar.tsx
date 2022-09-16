import { Box, Stack } from "@mui/material";
import React from "react";
import NotificationPopover from "./NotificationPopover";
import Searchbar from "./Searchbar";
import UserPopover from "./UserPopover";

const Navbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 4,
        px: 10,
        bgcolor: "white",
      }}
    >
      <Searchbar />
      <Stack direction="row" gap={3}>
        <NotificationPopover />
        <UserPopover />
      </Stack>
    </Box>
  );
};

export default Navbar;
