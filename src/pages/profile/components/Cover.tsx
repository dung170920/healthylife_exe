import { Stack, styled } from "@mui/material";
import React from "react";
import { LogoIcon } from "assets/icons";

const ProfileCoverStyles = styled(Stack)(({ theme }) => ({
  width: "120%",
  height: "400px",
  backgroundColor: theme.palette.primary.lighter,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: "-13%",
  top: "-12%",
  "& .logo_icon": { width: "297px", height: "166px" },
}));

const Cover = () => {
  return (
    <ProfileCoverStyles>
      <LogoIcon className="logo_icon" />
    </ProfileCoverStyles>
  );
};

export default Cover;
