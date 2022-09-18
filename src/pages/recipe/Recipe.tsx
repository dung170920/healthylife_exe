import { Stack, Box, styled, Typography, Paper, Button } from "@mui/material";
import { RecipeDetailModel } from "models/RecipeDetailModel";
import { BiTimeFive } from "react-icons/bi";
import { BiDish } from "react-icons/bi";
import IngredientList from "pages/recipe/components/IngredientList";
import NutritionList from "pages/recipe/components/NutritionList";
import { NutritionModel } from "models/NutritionModel";
import { AiFillEye, AiOutlineHeart } from "react-icons/ai";
import { Bowl } from "components";

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

  "& .intro_desc": { width: "60%", wordBreak: " break-all" },
}));

const ImageFoodStyle = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  objectFit: "cover",
  // borderRadius: "100%",
  // position: "absolute",
  // right: "0",
  // bottom: "70px",
  // transform: " translateX(50%)",
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
  ingredients: ["con chó", "mắm tôm", "lá mơ"],
  nutritionList: nutritionListArr,
};

const Recipe = () => {
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
            bottom: "120px",
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
            ></img>

            <Stack>
              <Typography className="recipe_chef--name">Roberto Jr</Typography>
              <Typography>Chef</Typography>
            </Stack>
          </Stack>
        </DescriptionStyle>

        {/* Ingredients */}
        <Typography className="title-text">Nguyên liệu</Typography>
        <IngredientList ingredients={dummyDetailData.ingredients} />

        {/* Nutrition Information */}
        <Typography className="title-text">Thông tin dinh dưỡng</Typography>
        <NutritionList nutritionList={dummyDetailData.nutritionList} />

        {/* Button Group */}
        <Stack direction="row" sx={{ marginTop: "20px" }}>
          <Button
            sx={{
              fontSize: "12px",
              color: "#FFFF",
              marginRight: "15px",
              padding: "10px 20px",
            }}
            variant="contained"
            startIcon={<AiFillEye />}
          >
            Xem cách làm
          </Button>
          <Button
            sx={{ fontSize: "12px", padding: "10px 20px" }}
            variant="outlined"
            startIcon={<AiOutlineHeart />}
          >
            Yêu thích
          </Button>
        </Stack>
      </DetailStyle>

      {/* Gói nguyên liệu */}
    </>
  );
};

export default Recipe;
