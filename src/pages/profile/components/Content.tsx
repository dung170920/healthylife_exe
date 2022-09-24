import {
  SpeedometerIcon,
  TargetIcon,
  CakeIcon,
  DollarIcon,
  CrownIcon,
} from "assets/icons";
import { MdHeight } from "react-icons/md";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import { AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import {
  Paper,
  Stack,
  styled,
  Grid,
  Typography,
  Divider,
  Tooltip,
  IconButton,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getProfile } from "api";
import { UserModel } from "models";
import dayjs from "dayjs";
import { formatPrice } from "utils/formatPrice";

const ProfileContentStyles = styled(Paper)(({ theme }) => ({
  width: "90%",
  height: "353px",
  position: "absolute",
  borderRadius: 8,
  margin: "0 auto",
  left: 0,
  right: 0,
  top: "37%",
  padding: "24px",
  boxShadow: "none",

  "& .avt": {
    width: "80px",
    height: "80px",
    borderRadius: "100%",
    marginRight: "16px",
  },

  "& .detail": { gap: "4px" },

  "& .name": { fontSize: "32px", fontWeight: 600 },

  "& .balance": {
    fontWeight: "600",
    alignItems: "center",
    fontSize: "20px",
    color: theme.palette.grey[700],

    "& .icon": { marginRight: "8px", color: theme.palette.grey[600] },
  },
}));

const RightIconGroup = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",

  "& .crown_icon": {
    color: theme.palette.warning.main,
    cursor: "pointer",
    width: 36,
    height: 36,
  },
  "& .rest_icon": {
    border: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.grey[700],
    borderRadius: "10px",
  },
}));

const ProfileNumberDetail = styled(Grid)(({ theme }) => ({
  minWidth: 269,

  "& .profile_number_title": {
    color: "#44444f",
    fontSize: "16px",
    marginBottom: "10px",
  },
  "& .profile_number_icon": { marginRight: "10px", fontSize: "24px" },
  "& .profile_number_text": { fontWeight: "bold" },
}));

const Content = () => {
  const [profile, setProfile] = useState<UserModel | null>();

  useEffect(() => {
    getProfile().then((response: UserModel) => {
      //console.log("response:", response);
      setProfile(response);
    });
  }, []);

  return (
    <ProfileContentStyles elevation={1}>
      {/* Top Detail */}
      <Stack
        className="profile_info"
        direction="row"
        justifyContent="space-between"
      >
        {/* Left Info */}
        <Stack direction="row">
          <Avatar
            className="profile_info avt"
            src={
              profile?.pictureUrl ||
              "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
          />
          <Stack className="profile_info detail">
            <Typography fontWeight="bold" className="profile_info name">
              {profile?.fullName || "-"}
            </Typography>
            <Stack direction="row" className="profile_info balance">
              <BiWallet className="profile_info balance icon" />
              <Typography>
                Số dư: {profile?.balance ? formatPrice(profile.balance) : "0 đ"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Right Info */}
        <RightIconGroup direction="row" spacing="32px">
          <Tooltip
            title={`Gói hội viên còn thời hạn đến: ${profile?.fullName}`}
            placement="bottom"
            arrow
          >
            <CrownIcon className="icons crown_icon" />
          </Tooltip>
          <IconButton onClick={() => {}} className="icons rest_icon">
            <DollarIcon fontSize={24} />
          </IconButton>
          <IconButton onClick={() => {}} className="icons rest_icon">
            <AiOutlineEdit fontSize={24} />
          </IconButton>
        </RightIconGroup>
      </Stack>

      <Divider sx={{ marginBottom: "30px", marginTop: "30px" }} />

      {/* Bottom Detail */}
      <Grid container rowSpacing={3} columnSpacing={12}>
        <ProfileNumberDetail item xs={4}>
          <Typography className="profile_number_title">Cân nặng</Typography>
          <Stack direction="row" alignContent="center">
            <SpeedometerIcon className="profile_number_icon" />
            <Typography className="profile_number_text">
              {profile?.weight || "-"} kg
            </Typography>
          </Stack>
        </ProfileNumberDetail>

        <ProfileNumberDetail item xs={4}>
          <Typography className="profile_number_title">Chiều cao</Typography>
          <Stack direction="row" alignContent="center">
            <MdHeight className="profile_number_icon" />
            <Typography className="profile_number_text">
              {profile?.height || "-"} cm
            </Typography>
          </Stack>
        </ProfileNumberDetail>

        <ProfileNumberDetail item xs={4}>
          <Typography className="profile_number_title">Giới tính</Typography>
          <Stack direction="row" alignContent="center">
            {(profile?.gender === "Nam" ? (
              <BsGenderMale className="profile_number_icon" />
            ) : (
              <BsGenderFemale className="profile_number_icon" />
            )) || "-"}

            <Typography className="profile_number_text">
              {profile?.gender || "-"}
            </Typography>
          </Stack>
        </ProfileNumberDetail>

        <ProfileNumberDetail item xs={4}>
          <Typography className="profile_number_title">Email</Typography>
          <Stack direction="row" alignContent="center">
            <AiOutlineMail className="profile_number_icon" />
            <Typography className="profile_number_text">
              {profile?.email || "-"}
            </Typography>
          </Stack>
        </ProfileNumberDetail>

        <ProfileNumberDetail item xs={4}>
          <Typography className="profile_number_title">Mục tiêu</Typography>
          <Stack direction="row" alignContent="center">
            <TargetIcon className="profile_number_icon" />
            <Typography className="profile_number_text">
              {profile?.targetName || "-"}
            </Typography>
          </Stack>
        </ProfileNumberDetail>

        <ProfileNumberDetail item xs={4}>
          <Typography className="profile_number_title">Ngày sinh</Typography>
          <Stack direction="row" alignContent="center">
            <CakeIcon className="profile_number_icon" />
            <Typography className="profile_number_text">
              {(profile?.birthday &&
                dayjs(profile.birthday).locale("vi").format("DD MMMM, YYYY")) ||
                "-"}
            </Typography>
          </Stack>
        </ProfileNumberDetail>
      </Grid>
    </ProfileContentStyles>
  );
};

export default Content;
