import { Stack, Box, styled, Typography } from "@mui/material";
import { chefCooking } from "assets/images";
import NormalAccountInfo from "./components/NormalAccountInfo";
import MemberAccountInfo from "./components/MemberAccountInfo";
import RecipeTabList from "./components/RecipeTabList";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useState, useEffect } from "react";

const TopMain = styled("div")({
  display: "flex",
});

const LeftInfoStyle = styled(Stack)(({ theme }) => ({
  width: "70%",
  height: "475px",
  color: "white",
  borderRadius: "15px",
  backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  padding: "36px",
  position: "relative",

  "& img": {
    position: "absolute",
    right: "36px",
    bottom: "36px",
    width: "410px",
    height: "auto",
  },
}));

const RightInfoStyle = styled(Box)(({ theme }) => ({
  width: "30%",
  paddingLeft: "20px",
}));

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.auth?.user);

  return (
    <>
      <TopMain>
        <LeftInfoStyle>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "700",
              fontSize: "35px",
            }}
          >
            Bắt đầu với những công thức <br /> nấu ăn tốt nhất
          </Typography>

          <Typography
            sx={{ marginTop: "10px", fontSize: "18px", fontWeight: 500 }}
          >
            Chúng tôi sẽ giúp bạn thiết kế thực đơn <br />
            cho bữa ăn của bạn
          </Typography>
          <img src={chefCooking} alt=""></img>
        </LeftInfoStyle>

        {/* Right Info */}
        <RightInfoStyle>
          {user?.role === "Membership" ? (
            <MemberAccountInfo />
          ) : (
            <NormalAccountInfo />
          )}
        </RightInfoStyle>
      </TopMain>

      {/* Outstanding Recipe */}
      <Box>
        <Typography
          fontWeight="600"
          sx={{ fontSize: "24px", marginBottom: "110px", marginTop: "40px" }}
        >
          Công thức mới nhất
        </Typography>

        <Stack direction="row">
          <RecipeTabList />
        </Stack>
      </Box>
    </>
  );
};

export default Dashboard;
