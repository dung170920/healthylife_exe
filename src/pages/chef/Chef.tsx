import React, { useEffect, useState } from "react";
import {
  Paper,
  Stack,
  styled,
  Box,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { LogoIcon } from "assets/icons";
import FoodList from "pages/chef/components/FoodList";
import { Pagination, FilterTab } from "components";

import { RecipeModel, UserModel } from "models";
import { getUserById } from "api";
import { useParams } from "react-router-dom";

const ChefDetailCoverStyles = styled(Stack)(({ theme }) => ({
  width: "120%",
  height: "400px",
  backgroundColor: theme.palette.primary.lighter,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: "-13%",
  top: "-50px",
  "& .logo_icon": { width: "297px", height: "166px" },
}));

const ChefDetailMainContainer = styled("div")(({ theme }) => ({
  position: "relative",
  height: "1621px",
}));

const ChefDetailContentStyles = styled(Paper)(({ theme }) => ({
  width: "90%",
  position: "absolute",
  margin: "0 auto",
  left: 0,
  right: 0,
  top: "17%",
  padding: "24px",
  borderRadius: 8,
  boxShadow: "none",

  "& .avt": {
    width: "80px",
    height: "80px",
    borderRadius: "100%",
    marginRight: "16px",
  },

  "& .detail": { gap: "4px" },

  "& .name": { fontSize: "32px", fontWeight: 600 },
}));

const filterTabValues = [
  { label: "Món ăn", value: 1 },
  { label: "Thức uống", value: 2 },
];

const Chef = () => {
  const { chefId } = useParams();
  const [foodList, setFoodList] = useState<RecipeModel[]>([]);
  const [tab, setTab] = useState(1);
  const [profile, setProfile] = useState<UserModel | null>();

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setTab(value);
  };

  useEffect(() => {
    if (chefId) {
      getUserById({ userId: chefId, mode: "Chef" }).then((res) => {
        // console.log(res);
        setProfile(res);
        setFoodList(res?.foods);
      });
    }
  }, [chefId]);

  return (
    <ChefDetailMainContainer>
      <ChefDetailCoverStyles>
        <LogoIcon className="logo_icon" />
      </ChefDetailCoverStyles>

      <ChefDetailContentStyles elevation={1}>
        <Box className="profile_info">
          <Stack direction="row" alignItems="center">
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
              <Typography>{profile?.foodCount || "0"} công thức</Typography>
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ marginBottom: "30px", marginTop: "30px" }} />

        <FilterTab
          tabs={filterTabValues}
          sx={{ marginBottom: "40px" }}
          onChangeTab={handleTabChange}
          defaultValue={tab}
        />

        <FoodList items={foodList} />

        {/* <Pagination
          onChange={(page) => {}}
          page={1}
          count={3}
          sx={{ marginTop: "50px" }}
        /> */}
      </ChefDetailContentStyles>
    </ChefDetailMainContainer>
  );
};

export default Chef;
