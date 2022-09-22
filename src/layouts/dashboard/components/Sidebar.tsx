import { HiOutlineCalendar } from "react-icons/hi";
import { TbClipboardList, TbLayout2 } from "react-icons/tb";
import { FoodCoverIcon, InvoiceIcon } from "assets/icons";
import { MenuList, styled } from "@mui/material";
import { Logo } from "components";
import SubHeader from "./SubHeader";
import SidebarItem from "./SidebarItem";
import { LinkModel } from "models";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const sidebar: LinkModel[] = [
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

const SidebarContainer = styled("aside")(({ theme }) => ({
  width: "17rem",
  background: "white",
}));

export const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  return (
    <SidebarContainer>
      <Logo sx={{ p: 6 }} />
      <MenuList sx={{ gap: 1.5, pt: 8 }}>
        {sidebar.map((item, index) =>
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
