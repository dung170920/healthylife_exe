import { Stack, Box, styled, Typography, Button } from "@mui/material";
import { chef, chefCooking } from "assets/images";
import NormalAccountInfo from "./components/NormalAccountInfo";
import MemberAccountInfo from "./components/MemberAccountInfo";
import RecipeTabList from "./components/RecipeTabList";

const TopMain = styled("div")({
  display: "flex",
  marginBottom: "50px",
});

const LeftInfoStyle = styled(Stack)(({ theme }) => ({
  width: "70%",
  height: "600px",
  color: "white",
  borderRadius: "15px",
  backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  padding: "45px",
  position: "relative",

  "& img": {
    position: "absolute",
    right: "40px",
    bottom: "40px",
    width: "410px",
    height: "auto",
  },
}));

const RightInfoStyle = styled(Box)(({ theme }) => ({
  width: "30%",
  padding: "40px",
}));

const Dashboard = () => {
  return (
    <>
      <TopMain>
        <LeftInfoStyle>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "700",
              fontSize: "50px",
            }}
          >
            Bắt đầu với những công thức <br /> nấu ăn tốt nhất
          </Typography>

          <Typography sx={{ marginTop: "10px", fontSize: "30px" }}>
            Chúng tôi sẽ giúp bạn thiết kế thực đơn <br />
            cho bữa ăn của bạn
          </Typography>
          <img src={chefCooking} alt=""></img>
        </LeftInfoStyle>

        {/* Right Info */}
        <RightInfoStyle>
          {/* <NormalAccountInfo /> */}
          <MemberAccountInfo />
        </RightInfoStyle>
      </TopMain>

      {/* Outstanding Recipe */}
      <Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ fontSize: "20px", marginBottom: "110px" }}
        >
          Công thức nổi bật
        </Typography>

        <Stack direction="row">
          <RecipeTabList />
        </Stack>
      </Box>
    </>
  );
};

export default Dashboard;
