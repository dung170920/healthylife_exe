import { Stack, styled, Typography, Button } from "@mui/material";
import { BsCardList } from "react-icons/bs";
import { GiOnTarget } from "react-icons/gi";
import { BiDish } from "react-icons/bi";
import { chef } from "assets/images";
import { formatPrice } from "utils/formatPrice";

const UpgradeAccountStyle = styled(Stack)(({ theme }) => ({
  width: 320,
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
    padding: "12px 0",
    width: "100%",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: 600,
    ":hover": {
      backgroundColor: "white",
    },
  },
}));

const MenuBoxItem = styled(Stack)(({ theme }) => ({
  width: 320,
  borderRadius: "20px",
  marginBottom: "15px",
  padding: "10px 12px",
  border: `1px solid ${theme.palette.grey[400]}`,
  alignItems: "center",
  gap: "18px",

  "& .menu-item-text": {
    fontSize: "16px",
    color: theme.palette.grey[700],
    letterSpacing: "0.1px",
  },
  "& .menu-item-icon": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.lighter,
    borderRadius: "5px",
    padding: "8px",
    fontSize: 40,
  },
}));

const MemberPrice = formatPrice(45000);

const NormalAccountInfo = () => {
  return (
    <Stack sx={{ marginTop: "25px" }}>
      <UpgradeAccountStyle direction="column" alignItems="center">
        <img src={chef} alt="Chef" className="chef-image"></img>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "28px",
            mb: "12px",
          }}
        >
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
