import { Stack, Box, styled, Typography, Paper, Button } from "@mui/material";
import { RecipeModel } from "models";
import { BiTimeFive, BiDish } from "react-icons/bi";
import IngredientList from "pages/recipe/components/IngredientList";
import NutritionList from "pages/recipe/components/NutritionList";
import { NutritionModel } from "models/NutritionModel";
import { AiFillEye } from "react-icons/ai";
import { IoMdList } from "react-icons/io";
import { Bowl, CustomDialog } from "components";
import { useState } from "react";

const DetailStyle = styled(Paper)(({ theme }) => ({
  width: "70%",
  padding: "25px",
  position: "relative",

  "& .title-text": {
    fontFamily: "Arima Madurai",
    fontWeight: "ExtraBold",
    fontSize: "20px",
    color: "#696974",
    marginTop: "15px  ",
  },
}));

const IntroStyle = styled(Stack)(({ theme }) => ({
  marginBottom: "15px",

  "& .intro_title": {
    fontSize: "30px",
    fontWeight: "bold",
    color: theme.palette.grey[900],
    marginBottom: "15px",
  },

  "& .intro_desc": { width: "60%" },
}));

const ImageFoodStyle = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  objectFit: "cover",
}));

const DescriptionStyle = styled(Stack)(({ theme }) => ({
  marginTop: "10px",

  "& .recipe_time_difficulty--item": {
    alignItems: "center",
    marginBottom: "10px",

    "& .item_text": { fontSize: "14px" },
    "& .item_icon": {
      alignItems: "center",
      padding: "10px",
      background: "rgba(26, 192, 115, 0.1)",
      color: theme.palette.grey[700],
      borderRadius: "7.03394px",
      fontSize: "50px",
      border: "1px solid #ffff",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 8px",
      marginRight: "10px",
    },
  },
  "& .recipe_chef": {
    marginLeft: "100px",

    "& .recipe_chef--image": {
      width: "50px",
      height: "50px",
      borderRadius: "50px",
      marginRight: "10px",
    },

    "& .recipe_chef--name": { fontWeight: "bold" },
  },
}));

const nutritionListArr: NutritionModel[] = [
  { amount: 100, name: "Calories", unit: "kcal" },
  { amount: 100, name: "Calories", unit: "kcal" },
  { amount: 100, name: "Calories", unit: "kcal" },
  { amount: 100, name: "Calories", unit: "kcal" },
];

const dummyDetailData = {
  name: "Thịt Chó Mắm Tôm",
  image:
    "https://www.thatlangon.com/wp-content/uploads/2020/06/bun-dau-7-e1593236905415.jpg",
  description:
    "Ngon đến vị cúi cùng baby oh yeah, ngon lắm nha nấu đi em ahujh aauhdu ijaiji i love you, do you nsjdfnj uasufh",
  time: 60,
  level: "Hard",
  ingredients: [
    "con chó",
    "mắm tôm",
    "lá mơ",
    "lá mơ",
    "lá mơ",
    "lá mơ",
    "lá mơ",
    "lá mơ",
    "lá mơ",
    "lá mơ",
  ],
  nutritionList: nutritionListArr,
};

const makingDialogContent = () => {
  return (
    <Stack
      direction="row"
      sx={{
        "& .icon": { fontSize: "50px", marginRight: "15px" },
      }}
    >
      <IoMdList className="icon" />
      <Box>
        {/* Ingredient */}
        <Box sx={{ marginBottom: "10px" }}>
          <Typography
            fontWeight="bold"
            sx={{ marginBottom: "10px", marginTop: "10px" }}
          >
            Nguyên liệu
          </Typography>
          <IngredientList ingredients={dummyDetailData.ingredients} />
        </Box>

        <Typography
          fontWeight="bold"
          sx={{ marginBottom: "10px", marginTop: "10px" }}
        >
          Cách làm
        </Typography>
        <Typography>
          1. Đánh trứng <br /> Lần lượt đập 2 quả trứng xong bỏ vô máy xay sinh
          tố xay nhiễn, Sau đó bỏ 1 thìa ca phê và 1 thìa đường. Khuấy thật đều
          trong 5 phút <br />
          <br />
          2. Sơ chế nguyên liệu <br />
          Nêm thêm 1/2 thìa muối cho ngon.
        </Typography>
      </Box>
    </Stack>
  );
};

const Recipe = () => {
  const [isMakingDialogOpen, setIsMakingDialogOpen] = useState(false);

  const makingDialogOpenCloseHandler = () => {
    setIsMakingDialogOpen(!isMakingDialogOpen);
  };

  return (
    <>
      <DetailStyle elevation={3} sx={{}}>
        {/* Intro */}
        <IntroStyle>
          <Typography className="intro_title">
            {dummyDetailData.name}
          </Typography>
          <Typography className="intro_desc">
            {dummyDetailData.description}
          </Typography>
        </IntroStyle>

        {/* Image */}
        <Bowl
          size={500}
          sx={{
            bottom: "70px",
            right: "-70%",
            transform: "translateX(-50%)",
          }}
        >
          <ImageFoodStyle src={dummyDetailData.image} />
        </Bowl>

        {/* Description */}
        <Typography className="title-text">Mô tả</Typography>

        <DescriptionStyle direction="row">
          <Stack className="recipe_time_difficulty">
            <Stack className="recipe_time_difficulty--item" direction="row">
              <BiTimeFive className="item_icon" />
              <Typography className="item_text">
                {dummyDetailData.time} Phút
              </Typography>
            </Stack>
            <Stack className="recipe_time_difficulty--item" direction="row">
              <BiDish className="item_icon" />
              <Typography className="item_text">
                {dummyDetailData.level}
              </Typography>
            </Stack>
          </Stack>

          <Stack className="recipe_chef" direction="row">
            <img
              className="recipe_chef--image"
              src="https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/5/15/photo-1652629284797-1652629285007183004729.jpg"
              alt=""
            ></img>

            <Stack>
              <Typography className="recipe_chef--name">Roberto Jr</Typography>
              <Typography>Chef</Typography>
            </Stack>
          </Stack>
        </DescriptionStyle>

        {/* Nutrition Information */}
        <Typography className="title-text">Thông tin dinh dưỡng</Typography>
        <NutritionList nutritionList={dummyDetailData.nutritionList} />

        {/* Button Group */}
        <Stack direction="row" sx={{ marginTop: "20px" }}>
          <Button
            sx={{
              fontSize: "12px",
              color: "white",
              marginRight: "15px",
              padding: "10px 20px",
            }}
            variant="contained"
            startIcon={<AiFillEye />}
            onClick={makingDialogOpenCloseHandler}
          >
            Xem cách làm
          </Button>
          {/* <Button
            sx={{ fontSize: "12px", padding: "10px 20px" }}
            variant="outlined"
            startIcon={<AiOutlineHeart />}
          >
            Yêu thích
          </Button> */}
        </Stack>
      </DetailStyle>
      {/* Gói nguyên liệu */}

      {/* Cách làm Dialog */}
      <CustomDialog
        isOpen={isMakingDialogOpen}
        onClose={makingDialogOpenCloseHandler}
        children={makingDialogContent()}
        title="Cách làm"
        sx={{ "& .MuiDialog-paper": { width: "70%", height: "60%" } }}
      />
    </>
  );
};

export default Recipe;
