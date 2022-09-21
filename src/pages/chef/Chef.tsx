import React, { useState } from "react";
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
import { LogoIcon } from "../../assets/icons";
import FoodList from "pages/chef/components/FoodList";
import FilterTab from "components/FilterTab";
import { Pagination } from "components/Pagination";

import { RecipePreviewModel } from "models";

const ChefDetailCoverStyles = styled(Stack)(({ theme }) => ({
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

const ChefDetailMainContainer = styled("div")(({ theme }) => ({
  position: "relative",
  height: "1500px",
}));

const ChefDetailContentStyles = styled(Paper)(({ theme }) => ({
  width: "90%",
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

const dummyFoodListData: RecipePreviewModel[] = [
  {
    Id: 1,
    PictureUrl:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
  },
  {
    Id: 2,
    PictureUrl:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
  },
  {
    Id: 3,
    PictureUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
  },
  {
    Id: 4,
    PictureUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
  },
  {
    Id: 5,
    PictureUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
  },
  {
    Id: 6,
    PictureUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
  },
  {
    Id: 7,
    PictureUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
  },
  {
    Id: 8,
    PictureUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
  },
  {
    Id: 9,
    PictureUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    Name: "Trứng cuộn ngũ sắc",
    Difficulty: "Easy",
    TimeCost: 30,
    Calorie: 587,
  },
];

const filterTabValues = [
  { label: "Món ăn", value: 1 },
  { label: "Đồ uống", value: 2 },
];

const Chef = () => {
  const [foodList, setFoodList] =
    useState<RecipePreviewModel[]>(dummyFoodListData);
  const [tab, setTab] = useState(1);

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setTab(value);
  };

  return (
    <ChefDetailMainContainer>
      <ChefDetailCoverStyles>
        <LogoIcon className="logo_icon" />
      </ChefDetailCoverStyles>

      <ChefDetailContentStyles elevation={1}>
        <Box className="profile_info">
          <Stack direction="row" alignItems="center">
            <img
              className="profile_info avt"
              src={
                dummyProfileData.PictureUrl ||
                "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
              }
            />
            <Box className="profile_info detail">
              <Typography fontWeight="bold" className="profile_info name">
                {dummyProfileData.FullName || "-"}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Divider sx={{ marginBottom: "30px", marginTop: "30px" }} />

        <FilterTab
          tabs={filterTabValues}
          defaultValue={tab}
          sx={{ marginBottom: "40px" }}
          onChangeTab={handleTabChange}
        />

        <FoodList items={foodList} />

        <Pagination count={3} sx={{ marginTop: "50px" }} />
      </ChefDetailContentStyles>
    </ChefDetailMainContainer>
  );
};

export default Chef;
