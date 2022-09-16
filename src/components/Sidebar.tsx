import { HiOutlineCalendar, HiOutlineChevronDown } from "react-icons/hi";
import { TbClipboardList, TbLayout2 } from "react-icons/tb";
import { FoodCoverIcon, InvoiceIcon } from "assets/icons";
import { MenuItem, MenuList, styled, Typography } from "@mui/material";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";

const sidebar = [
  { name: "Trang chủ", icon: TbLayout2 },
  { name: "Danh sách món", icon: TbClipboardList },
  { name: "Danh sách đầu bếp", icon: FoodCoverIcon },
  { name: "Thực đơn", icon: HiOutlineCalendar },
  { name: "Lịch sử giao dịch", icon: InvoiceIcon },
];

const SidebarContainer = styled("aside")(({ theme }) => ({
  padding: "1.5rem 2.5rem",
  width: "16rem",
  background: "white",
}));

const SidebarList = styled(MenuList)(({ theme }) => ({
  gap: "1.5rem",
  paddingTop: "5rem",
}));

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo />
      <SidebarList>
        {sidebar.map((item) => (
          <MenuItem key={item.name}>
            <Link
              to="/"
              className="flex items-start gap-x-4 py-2 text-gray-500 hover:text-indigo-600 group"
            >
              <span className="absolute w-1.5 h-8 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 ease-in-out bg-indigo-600 transition-transform"></span>
              <item.icon className="w-6 h-6 fill-current" />
              <Typography>{item.name}</Typography>
            </Link>
          </MenuItem>
        ))}
      </SidebarList>
    </SidebarContainer>
  );
};
