import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Dropdown } from "components";
import React, { useState } from "react";
import { BiUser, BiBarChartAlt, BiCog } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { MdLeaderboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "redux/slices/AuthSlice";

const menu = [
  {
    icon: <BiUser />,
    name: "Thông tin cá nhân",
    linkTo: "/profile",
  },
  {
    icon: <BiBarChartAlt />,
    name: "Thống kê",
    linkTo: "/report",
  },
  {
    icon: <BiCog />,
    name: "Cài đặt",
    linkTo: "/settings",
  },
];

const UserPopover = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setOpen(null);
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/auth/login");
  };

  return (
    <>
      <IconButton
        sx={{
          width: 48,
          height: 48,
        }}
        onClick={handleOpen}
      >
        <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
      </IconButton>
      <Dropdown
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        sx={{ width: 280, p: 0, mt: 8 }}
      >
        <Box sx={{ p: 2 }}>
          <Typography noWrap fontSize={16} fontWeight={600}>
            Nguyen Thi Hoang Dung
          </Typography>
          <Typography noWrap fontSize={12} fontWeight={500}>
            dung.nguyen@gmail.com
          </Typography>
        </Box>
        <Divider
          sx={{
            mx: 2,
            color: "grey.400",
          }}
        />
        <Stack sx={{ p: 2 }} justifyContent="center">
          {menu.map((option) => (
            <MenuItem
              key={option.name}
              to={option.linkTo}
              component={Link}
              onClick={handleClose}
              sx={{ p: 1.5, color: "grey.700", borderRadius: "12px" }}
            >
              <ListItemIcon sx={{ fontSize: 24, color: "grey.600" }}>
                {option.icon}
              </ListItemIcon>
              <ListItemText>
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {option.name}
                </Typography>
              </ListItemText>
            </MenuItem>
          ))}
          <Divider
            sx={{
              mx: 2,
              color: "grey.400",
            }}
          />
          <MenuItem
            to="/upgrade"
            component={Link}
            onClick={handleClose}
            sx={{ p: 1.5, color: "primary.main", borderRadius: "12px" }}
          >
            <ListItemIcon sx={{ fontSize: 24, color: "primary.main" }}>
              <MdLeaderboard />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                Nâng cấp tài khoản
              </Typography>
            </ListItemText>
          </MenuItem>
          <Divider
            sx={{
              mx: 2,
              color: "grey.400",
            }}
          />
          <MenuItem
            onClick={handleLogout}
            sx={{ p: 1.5, color: "error.main", borderRadius: "12px" }}
          >
            <ListItemIcon sx={{ fontSize: 24, color: "error.main" }}>
              <TbLogout />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                Đăng xuất
              </Typography>
            </ListItemText>
          </MenuItem>
        </Stack>
      </Dropdown>
    </>
  );
};

export default UserPopover;
