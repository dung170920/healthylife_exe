import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LinkModel } from "models";

type SubHeaderProps = {
  active: string;
  onActive: (arg: string) => void;
  item: LinkModel;
};

type SidebarItemProps = {
  active: string;
  to?: string;
  component?: React.ElementType;
};

const SidebarItem = styled(MenuItem)<SidebarItemProps>(({ theme, active }) => ({
  gap: "1rem",
  padding: "1rem 1.25rem",
  color:
    active === "true" ? theme.palette.primary.main : theme.palette.grey[900],

  ":hover": {
    color: theme.palette.primary.main,
    background: "white",
    fontWeight: 600,

    "& .MuiListItemIcon-root": {
      svg: { color: theme.palette.primary.main },
    },
  },

  span: {
    position: "absolute",
    width: "3px",
    height: "2rem",
    left: 0,
    top: "calc(50% - 32px/2)",
    transform:
      active === "true"
        ? "scaleY(100%) translateX(0)"
        : "scaleY(0) translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
    background: theme.palette.primary.main,
    borderBottomRightRadius: "100%",
    borderTopRightRadius: "100%",

    ":hover": {
      transform: "scaleY(100%) translateX(0)",
    },
  },

  "& .MuiListItemIcon-root": {
    svg: {
      height: "1.5rem",
      width: "1.5rem",
      color:
        active === "true"
          ? theme.palette.primary.main
          : theme.palette.grey[600],
    },
  },
}));

const SubHeader = ({ item, active, onActive }: SubHeaderProps) => {
  const [showSubHeader, setShowSubHeader] = useState(false);

  return (
    <>
      <SidebarItem
        active={"false"}
        onClick={() => {
          setShowSubHeader(!showSubHeader);
        }}
      >
        <span />
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            {item.name}
          </Typography>
        </ListItemText>
        <ListItemIcon>
          {!showSubHeader ? <HiChevronDown /> : <HiChevronUp />}
        </ListItemIcon>
      </SidebarItem>
      {showSubHeader &&
        item?.children?.map((child) => (
          <SidebarItem
            component={Link}
            key={child.name}
            active={active === child.to ? "true" : "false"}
            to={child.to}
            onClick={() => onActive(child.to!)}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 500, pl: 8 }}>
              {child.name}
            </Typography>
          </SidebarItem>
        ))}
    </>
  );
};

export default SubHeader;
