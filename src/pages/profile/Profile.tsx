import {
  Paper,
  Stack,
  styled,
  Box,
  Grid,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import React from "react";
import { LogoIcon } from "../../assets/icons";
import { FaWeight } from "react-icons/fa";
import { MdHeight } from "react-icons/md";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { GiOnTarget } from "react-icons/gi";
import { FaBirthdayCake } from "react-icons/fa";
import { BiWallet } from "react-icons/bi";
import { RiVipCrownFill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";

const ProfileMainContainer = styled("div")(({ theme }) => ({
  position: "relative",
  height: "400px",
}));

const ProfileCoverStyles = styled(Stack)(({ theme }) => ({
  width: "120%",
  height: "336px",
  backgroundColor: theme.palette.primary.lighter,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: "-13%",
  top: "-50px",
  "& .logo_icon": { width: "297px", height: "166px" },
}));

const ProfileContentStyles = styled(Paper)(({ theme }) => ({
  width: "90%",
  height: "336px",
  position: "absolute",
  marginLeft: "auto",
  marginRight: "auto",
  left: 0,
  right: 0,
  top: "220px",
  padding: "25px",

  "& .avt": {
    width: "70px",
    height: "70px",
    borderRadius: "100%",
    marginRight: "15px",
  },

  "& .detail": { gap: "3px" },

  "& .name": { fontSize: "28px", fontWeight: "bold" },

  "& .balance": {
    fontWeight: "600",
    alignItems: "center",
    fontSize: "20px",
    color: theme.palette.grey[700],

    "& .icon": { marginRight: "6px" },
  },
}));

const RightIconGroup = styled(Stack)(({ theme }) => ({
  fontSize: "30px",

  "& .icons": { cursor: "pointer" },
  "& .crown_icon": { color: "#FFc542" },
  "& .rest_icon": {
    border: `1px solid #E2E2EA`,
    color: theme.palette.grey[700],
    borderRadius: "8px",
    padding: "5px",
  },
}));

const ProfileNumberDetail = styled(Grid)(({ theme }) => ({
  "& .profile_number_title": {
    color: "#44444f",
    fontSize: "16px",
    marginBottom: "10px",
  },
  "& .profile_number_icon": { marginRight: "10px", fontSize: "20px" },
  "& .profile_number_text": { fontWeight: "bold" },
}));

const dummyProfileData = {
  Id: 1,
  FullName: "Leo Messi",
  PictureUrl: "https://znews-stc.zdn.vn/static/topic/person/messi.jpg",
  Balance: 1000,
  Target: "Ốm như nghiện",
  Gender: "Nam",
  Weight: 69,
  Height: 170,
  Birthday: "2/9/1987",
  Email: "messi@gmail.com",
  ValidUntil: "15/5/2023",
};

const Profile = () => {
  return (
    <ProfileMainContainer>
      <ProfileCoverStyles>
        <LogoIcon className="logo_icon" />
      </ProfileCoverStyles>

      <ProfileContentStyles elevation={1}>
        {/* Top Detail */}
        <Stack
          className="profile_info"
          direction="row"
          justifyContent="space-between"
        >
          {/* Left Info */}
          <Stack direction="row">
            <img
              className="profile_info avt"
              src={
                dummyProfileData.PictureUrl ||
                "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
              }
            />
            <Stack className="profile_info detail">
              <Typography fontWeight="bold" className="profile_info name">
                {dummyProfileData.FullName || "-"}
              </Typography>
              <Stack direction="row" className="profile_info balance">
                <BiWallet className="profile_info balance icon" />
                <Typography>
                  Số dư: {dummyProfileData.Balance || "0"} VND
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Right Info */}
          <RightIconGroup direction="row" spacing="30px">
            <Tooltip
              title={`Gói hội viên còn thời hạn đến: ${dummyProfileData.ValidUntil}`}
              placement="bottom"
              arrow
            >
              <Box sx={{ height: "30px" }}>
                <RiVipCrownFill className="icons crown_icon" />
              </Box>
            </Tooltip>
            <RiMoneyDollarCircleLine className="icons rest_icon" />
            <AiOutlineEdit className="icons rest_icon" />
          </RightIconGroup>
        </Stack>

        <Divider sx={{ marginBottom: "30px", marginTop: "30px" }} />

        {/* Bottom Detail */}
        <Grid container rowSpacing={3} columnSpacing={20}>
          <ProfileNumberDetail item xs={4}>
            <Typography className="profile_number_title">Cân nặng</Typography>
            <Stack direction="row" alignContent="center">
              <FaWeight className="profile_number_icon" />
              <Typography className="profile_number_text">
                {dummyProfileData.Weight || "-"} kg
              </Typography>
            </Stack>
          </ProfileNumberDetail>

          <ProfileNumberDetail item xs={4}>
            <Typography className="profile_number_title">Chiều cao</Typography>
            <Stack direction="row" alignContent="center">
              <MdHeight className="profile_number_icon" />
              <Typography className="profile_number_text">
                {dummyProfileData.Height || "-"} cm
              </Typography>
            </Stack>
          </ProfileNumberDetail>

          <ProfileNumberDetail item xs={4}>
            <Typography className="profile_number_title">Giới tính</Typography>
            <Stack direction="row" alignContent="center">
              {(dummyProfileData.Gender === "Nam" ? (
                <BsGenderMale className="profile_number_icon" />
              ) : (
                <BsGenderFemale className="profile_number_icon" />
              )) || "-"}

              <Typography className="profile_number_text">
                {dummyProfileData.Gender || "-"}
              </Typography>
            </Stack>
          </ProfileNumberDetail>

          <ProfileNumberDetail item xs={4}>
            <Typography className="profile_number_title">Email</Typography>
            <Stack direction="row" alignContent="center">
              <HiOutlineMail className="profile_number_icon" />
              <Typography className="profile_number_text">
                {dummyProfileData.Email || "-"}
              </Typography>
            </Stack>
          </ProfileNumberDetail>

          <ProfileNumberDetail item xs={4}>
            <Typography className="profile_number_title">Mục tiêu</Typography>
            <Stack direction="row" alignContent="center">
              <GiOnTarget className="profile_number_icon" />
              <Typography className="profile_number_text">
                {dummyProfileData.Target || "-"}
              </Typography>
            </Stack>
          </ProfileNumberDetail>

          <ProfileNumberDetail item xs={4}>
            <Typography className="profile_number_title">Ngày sinh</Typography>
            <Stack direction="row" alignContent="center">
              <FaBirthdayCake className="profile_number_icon" />
              <Typography className="profile_number_text">
                {dummyProfileData.Birthday || "-"}
              </Typography>
            </Stack>
          </ProfileNumberDetail>
        </Grid>
      </ProfileContentStyles>
    </ProfileMainContainer>
  );
};

export default Profile;
