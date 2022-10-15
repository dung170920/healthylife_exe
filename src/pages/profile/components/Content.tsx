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
  FormLabel,
  DialogActions,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { getProfile, getRecipeList, getUserById } from "api";
import { RecipeModel, RecipeRequestModel, UserModel } from "models";
import dayjs from "dayjs";
import { formatPrice } from "utils/formatPrice";
import { RootState } from "redux/store";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FilterTab, Pagination, CustomSnackBar } from "components";
import FoodList from "./FoodList";
import { CustomDialog } from "components";
import {
  sendRequestPayment,
  sendRequestToNganLuong,
  // completePayment,
} from "api/PaymentApi";

const ProfileContentStyles = styled(Paper)(({ theme }: any) => ({
  width: "90%",
  height: "auto",
  position: "absolute",
  borderRadius: 8,
  margin: "0 auto",
  left: 0,
  right: 0,
  top: "17%",
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

const RightIconGroup = styled(Stack)(({ theme }: any) => ({
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

const ProfileNumberDetail = styled(Grid)(() => ({
  minWidth: 269,

  "& .profile_number_title": {
    color: "#44444f",
    fontSize: "16px",
    marginBottom: "10px",
  },
  "& .profile_number_icon": { marginRight: "10px", fontSize: "24px" },
  "& .profile_number_text": { fontWeight: "bold" },
}));

const filterTabValues = [
  { label: "Món ăn", value: 2 },
  { label: "Thức uống", value: 1 },
];

type ResponseModel = {
  items: RecipeModel[];
  maxPage: number;
  page: number;
};

const Content = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<any>({
    message: "",
    status: false,
    type: "success",
  });
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);
  const [nganLuongParams, setNganLuongParams] = useState({
    // userId,
    // orderCode: "",
    price: 1000,
  });

  const [response, setResponse] = useState<ResponseModel | null>();
  const [params, setParams] = useState<RecipeRequestModel>({
    FilterMode: 2,
    FoodTypeId: 2,
    PageSize: 9,
    Page: 1,
    ChefId: userId,
  });
  let user = useSelector((state: RootState) => state.auth.auth?.user);
  const [profile, setProfile] = useState<UserModel | undefined>();
  const isProfile = userId === user!.id;

  const payDialogHandler = async () => {
    setIsPayDialogOpen(!isPayDialogOpen);
    setNganLuongParams((pre: any) => ({ ...pre, price: 1000 }));
  };

  useEffect(() => {
    if (isProfile) {
      getProfile().then((response: UserModel) => {
        setProfile(response);
      });
    } else {
      userId &&
        getUserById({ userId, mode: "Chef" }).then((res) => {
          setProfile(res);
          getRecipeList(params).then((value) => {
            setResponse(value);
          });
        });
    }
  }, [isProfile, userId, params]);

  //////////////////////////////// Start Payment Section ///////////////////////////////

  const openInNewTab = (url: any) => {
    window.open(url, "_blank");
  };

  const topUp = async () => {
    setIsLoading(true);
    setAlert({});

    if (nganLuongParams.price < 1000) {
      setAlert({
        message: "Số tiền nạp vào ít nhất là 1000 !!!",
        status: true,
        type: "error",
      });
      setIsLoading(false);
      return;
    }
    try {
      const res = await sendRequestPayment(nganLuongParams.price);

      openInNewTab(
        `${sendRequestToNganLuong({
          ...nganLuongParams,
          orderCode: res.id,
          userId: user?.id,
        })}`
      );

      payDialogHandler();

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);

      setAlert({
        message: "Nạp tiền thất bại !!!",
        status: true,
        type: "error",
      });
    }
  };

  //////////////////////////////// End Payment Section ///////////////////////////////

  const payDialogContent = () => {
    return (
      <Stack>
        <Stack direction="column" sx={{ marginBottom: "20px" }}>
          <FormControl>
            <FormLabel
              htmlFor="roomId"
              sx={{
                fontWeight: "600",
                color: "neutral.800",
                marginBottom: "10px",
              }}
            >
              Tiền muốn nạp
            </FormLabel>
            <TextField
              type="number"
              // placeholder="Nhập tối thiểu 1000"
              autoFocus={true}
              onChange={(e) => {
                setNganLuongParams((pre: any) => ({
                  ...pre,
                  price: Number(e.target.value),
                }));
              }}
              value={nganLuongParams.price}
            />
          </FormControl>
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          sx={{ marginBottom: "20px" }}
        >
          <ToggleButtonGroup
            color="primary"
            sx={{ border: `0px` }}
            // value={nganLuongParams.price}
            // exclusive
            onChange={(event: React.MouseEvent<HTMLElement>, price: any) => {
              setNganLuongParams((pre: any) => ({
                ...pre,
                price: Number(price[0]),
              }));
            }}
            aria-label="Platform"
          >
            <ToggleButton
              value="50000"
              sx={{ border: "1px solid #1AC073", color: "#1AC073" }}
            >
              {formatPrice(50000)}
            </ToggleButton>
            <ToggleButton
              value="100000"
              sx={{ border: "1px solid #1AC073", color: "#1AC073" }}
            >
              {formatPrice(100000)}
            </ToggleButton>
            <ToggleButton
              value="500000"
              sx={{ border: "1px solid #1AC073", color: "#1AC073" }}
            >
              {formatPrice(500000)}
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <DialogActions sx={{ marginTop: "auto" }}>
          <Button onClick={payDialogHandler}>Hủy</Button>
          <Button
            sx={{
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
            type="submit"
            variant="contained"
            disabled={isLoading}
            autoFocus
            onClick={topUp}
          >
            Nạp tiền
          </Button>
        </DialogActions>
      </Stack>
    );
  };

  function handlePageChange(event: React.ChangeEvent<unknown>, page: number) {
    setParams({
      ...params,
      Page: page,
    });
  }

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setParams({
      ...params,
      FoodTypeId: value,
    });
  };

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
            {isProfile && profile?.balance !== undefined && (
              <Stack direction="row" className="profile_info balance">
                <BiWallet className="profile_info balance icon" />
                <Typography>
                  Số dư:{" "}
                  {profile?.balance ? formatPrice(profile?.balance) : "0 đ"}
                </Typography>
              </Stack>
            )}
            {profile?.foodCount !== undefined && (
              <Typography color={"grey.700"}>
                {profile?.foodCount || "0"} công thức
              </Typography>
            )}
          </Stack>
        </Stack>

        {/* Right Info */}
        {isProfile && (
          <RightIconGroup direction="row" spacing="32px">
            {profile?.isMembership && (
              <Tooltip
                title={`Gói hội viên còn thời hạn đến: ${dayjs(
                  profile.validUntil
                )
                  .locale("vi")
                  .format("DD MMMM, YYYY")}`}
                placement="bottom"
                arrow
              >
                <CrownIcon className="icons crown_icon" />
              </Tooltip>
            )}
            {user?.role.includes("Customer") && (
              <IconButton
                onClick={payDialogHandler}
                className="icons rest_icon"
              >
                <DollarIcon fontSize={24} />
              </IconButton>
            )}
            <IconButton
              onClick={() => {
                navigate("/users/settings");
              }}
              className="icons rest_icon"
            >
              <AiOutlineEdit fontSize={24} />
            </IconButton>
          </RightIconGroup>
        )}
      </Stack>

      {/* Pay Dialog */}
      <CustomDialog
        isOpen={isPayDialogOpen}
        onClose={payDialogHandler}
        children={payDialogContent()}
        title="Nạp tiền vào ví Heli"
        sx={{ "& .MuiDialog-paper": { width: "60%", height: "50%" } }}
      />

      <Divider sx={{ marginBottom: "30px", marginTop: "30px" }} />

      {/* Bottom Detail */}
      {profile?.balance !== undefined && (
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
                {profile?.gender === "Female" ? "Nữ" : "Nam" || "-"}
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
                  dayjs(profile.birthday)
                    .locale("vi")
                    .format("DD MMMM, YYYY")) ||
                  "-"}
              </Typography>
            </Stack>
          </ProfileNumberDetail>
        </Grid>
      )}
      {profile?.foodCount !== undefined && (
        <>
          <FilterTab
            tabs={filterTabValues}
            sx={{ marginBottom: "40px" }}
            onChangeTab={handleTabChange}
            defaultValue={params.FoodTypeId || 2}
          />
          <FoodList items={response?.items ? response.items : []} />
          <Pagination
            page={params.Page || 1}
            onChange={handlePageChange}
            count={response?.maxPage || 1}
            sx={{ my: 6 }}
          />
        </>
      )}

      {/* Alert message */}
      {alert?.status && (
        <CustomSnackBar
          message={alert.message}
          status={alert.status}
          type={alert.type}
        />
      )}
    </ProfileContentStyles>
  );
};

export default Content;
