import { Stack, Box, styled, Typography, Button } from "@mui/material";
import { BsCardList } from "react-icons/bs";
import { GiOnTarget } from "react-icons/gi";
import { BiDish } from "react-icons/bi";
import { chef } from "assets/images";

const UpgradeAccountStyle = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  position: "relative",
  borderRadius: "15px",
  textAlign: "center",
  padding: "70px 25px 25px",

  "& .chef-image": {
    position: "absolute",
    top: "-50px",
    height: "110px",
    width: "auto",
  },

  "& .upgrade-button": {
    backgroundColor: "white",
    color: theme.palette.primary.main,
    marginTop: "10px",
    borderRadius: "10px",
    fontSize: "14px",
  },
}));

const MenuBoxItem = styled(Stack)(({ theme }) => ({
  borderRadius: "10px",
  marginBottom: "15px",
  padding: "10px 20px",
  border: "0.5px solid #D5D5D5",
  alignItems: "center",
  gap: "10px",

  "& .menu-item-text": { fontSize: "17px", color: "#44444F" },
  "& .menu-item-icon": {
    color: theme.palette.primary.main,
    backgroundColor: "#E4F4ED",
    borderRadius: "5px",
    padding: "8px",
    fontSize: "40px",
    marginRight: "10px",
  },
}));

const MemberPrice = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
}).format(45000);

const NormalAccountInfo = () => {
  return (
    <Stack sx={{ marginTop: "25px" }}>
      <UpgradeAccountStyle direction="column" alignItems="center">
        <img src={chef} alt="Chef" className="chef-image"></img>
        <Typography sx={{ fontSize: "18px", marginTop: "5px" }}>
          Nâng cấp tài khoản để mở khóa tất cả các tính năng
        </Typography>
        <Button className="upgrade-button">
          Trở thành hội viên với {MemberPrice}
        </Button>
      </UpgradeAccountStyle>

      <Stack className="member-welfare">
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
            margin: "15px 0 15px",
          }}
        >
          Phúc lợi hội viên
        </Typography>

        <Stack>
          <MenuBoxItem direction="row">
            <BsCardList className="menu-item-icon" />
            <Typography className="menu-item-text">
              Hơn 100+ công thức
            </Typography>
          </MenuBoxItem>
          <MenuBoxItem direction="row">
            <GiOnTarget className="menu-item-icon" />
            <Typography className="menu-item-text">
              Theo dõi lộ trình
            </Typography>
          </MenuBoxItem>
          <MenuBoxItem direction="row">
            <BiDish className="menu-item-icon" />
            <Typography className="menu-item-text">
              Thiết kế thực đơn
            </Typography>
          </MenuBoxItem>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NormalAccountInfo;
