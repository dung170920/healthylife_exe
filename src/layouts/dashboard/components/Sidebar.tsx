import { HiOutlineCalendar, HiOutlinePlus, HiUsers } from "react-icons/hi";
import { TbClipboardList, TbLayout2 } from "react-icons/tb";
import { FoodCoverIcon, InvoiceIcon } from "assets/icons";
import { MenuList, styled } from "@mui/material";
import { Logo } from "components";
import SubHeader from "./SubHeader";
import SidebarItem from "./SidebarItem";
import { LinkModel } from "models";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const sidebarMembership: LinkModel[] = [
  { name: "Trang chủ", icon: <TbLayout2 />, to: "/" },
  {
    name: "Danh sách món",
    icon: <TbClipboardList />,
    children: [
      {
        name: "Đồ ăn",
        to: "/recipes/foods",
      },
      {
        name: "Thức uống",
        to: "/recipes/drinks",
      },
    ],
  },
  {
    name: "Danh sách đầu bếp",
    icon: <FoodCoverIcon />,
    to: "/chefs",
  },
  { name: "Thực đơn", icon: <HiOutlineCalendar />, to: "/menu" },
  { name: "Lịch sử giao dịch", icon: <InvoiceIcon />, to: "/orders" },
];

const sidebarCustomer: LinkModel[] = [
  { name: "Trang chủ", icon: <TbLayout2 />, to: "/" },
  {
    name: "Danh sách món",
    icon: <TbClipboardList />,
    children: [
      {
        name: "Đồ ăn",
        to: "/recipes/foods",
      },
      {
        name: "Thức uống",
        to: "/recipes/drinks",
      },
    ],
  },
  {
    name: "Danh sách đầu bếp",
    icon: <FoodCoverIcon />,
    to: "/chefs",
  },
  { name: "Lịch sử giao dịch", icon: <InvoiceIcon />, to: "/orders" },
];

const sidebarChef: LinkModel[] = [
  { name: "Trang chủ", icon: <TbLayout2 />, to: "/" },
  {
    name: "Danh sách món",
    icon: <TbClipboardList />,
    children: [
      {
        name: "Đồ ăn",
        to: "/recipes/foods",
      },
      {
        name: "Thức uống",
        to: "/recipes/drinks",
      },
    ],
  },
  {
    name: "Tạo công thức",
    icon: <HiOutlinePlus />,
    to: "/recipes/add",
  },
];

const sidebarAdmin: LinkModel[] = [
  { name: "Trang chủ", icon: <TbLayout2 />, to: "/" },
  {
    name: "Danh sách món",
    icon: <TbClipboardList />,
    to: "recipes",
  },
  { name: "Lịch sử giao dịch", icon: <InvoiceIcon />, to: "/orders" },
  { name: "Danh sách người dùng", icon: <HiUsers />, to: "/users" },
];

const SidebarContainer = styled("aside")(({ theme }) => ({
  width: "17rem",
  background: "white",
}));

export const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  let user = useSelector((state: RootState) => state.auth.auth?.user);

  return (
    <SidebarContainer>
      <Logo sx={{ p: 6 }} />
      <MenuList sx={{ gap: 1.5, pt: 8 }}>
        {user?.role.includes("Membership") &&
          sidebarMembership.map((item, index) =>
            item.children ? (
              <SubHeader
                item={item}
                key={index}
                active={active}
                onActive={setActive}
              />
            ) : (
              <SidebarItem
                item={item}
                key={index}
                active={active}
                onActive={setActive}
              />
            )
          )}

        {user?.role.includes("Customer") &&
          !user?.role.includes("Membership") &&
          sidebarCustomer.map((item, index) =>
            item.children ? (
              <SubHeader
                item={item}
                key={index}
                active={active}
                onActive={setActive}
              />
            ) : (
              <SidebarItem
                item={item}
                key={index}
                active={active}
                onActive={setActive}
              />
            )
          )}
        {user?.role === "Chef" &&
          sidebarChef.map((item, index) =>
            item.children ? (
              <SubHeader
                item={item}
                key={index}
                active={active}
                onActive={setActive}
              />
            ) : (
              <SidebarItem
                item={item}
                key={index}
                active={active}
                onActive={setActive}
              />
            )
          )}
        {user?.role === "Admin" &&
          sidebarAdmin.map((item, index) =>
            item.children ? (
              <SubHeader
                item={item}
                key={index}
                active={active}
                onActive={setActive}
              />
            ) : (
              <SidebarItem
                item={item}
                key={index}
                active={active}
                onActive={setActive}
              />
            )
          )}
      </MenuList>
    </SidebarContainer>
  );
};
