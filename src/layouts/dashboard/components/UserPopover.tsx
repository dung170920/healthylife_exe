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
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "redux/slices/AuthSlice";
import { LinkModel } from "models";
import { RootState } from "redux/store";

const UserPopover = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  let user = useSelector((state: RootState) => state.auth.auth?.user);

  const menu: LinkModel[] = [
    {
      icon: <BiUser />,
      name: "Thông tin cá nhân",
      to: `/users/${user!.id}`,
    },
    {
      icon: <BiBarChartAlt />,
      name: "Thống kê",
      to: "/report",
    },
    {
      icon: <BiCog />,
      name: "Cài đặt",
      to: "/users/settings",
    },
  ];

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
        <Avatar
          src={
            user?.picture_url ||
            "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          }
        />
      </IconButton>
      <Dropdown
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        sx={{ width: 280, p: 0, mt: 8 }}
      >
        <Box sx={{ p: 2 }}>
          <Typography noWrap fontSize={16} fontWeight={600}>
            {user?.full_name || ""}
          </Typography>
          <Typography noWrap fontSize={12} fontWeight={500}>
            {user?.email || ""}
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
              to={option.to!}
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

          {user?.role === "Customer" && (
            <>
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
            </>
          )}

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
