import { Stack, Box, styled, Typography, Paper, Button } from "@mui/material";
import { RecipeModel } from "models";
import { BiTimeFive, BiDish } from "react-icons/bi";
import IngredientList from "pages/recipe/components/IngredientList";
import NutritionList from "pages/recipe/components/NutritionList";
import { NutritionModel } from "models/NutritionModel";
import { AiFillEye } from "react-icons/ai";
import { IoMdList } from "react-icons/io";
import { Bowl, CustomDialog, CustomSnackBar } from "components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRecipeById } from "api/RecipeApi";
import { parseJsonStringToArray } from "utils/parseJsonStringToArray";
import { convertDifficultyToString } from "utils/convertDifficultyToString";
import parse from "html-react-parser";

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

const Recipe = () => {
  type ResponseModel = {
    id: string;
    name: string;
    pictureUrl: string;
    description: string;
    instruction: string;
    calorie: number;
    ingredient: string;
    timeCost: number;
    difficulty: number;
    chef: { fullName: string; pictureUrl: string; email: string; id: string };
    recipes: {
      foodId: string;
      recipeId: number;
      recipeName: string;
      amount: number;
      unit: string;
    }[];
  };

  const { recipeId } = useParams();
  console.log("recipeIdf: ", recipeId);
  const [isMakingDialogOpen, setIsMakingDialogOpen] = useState(false);
  const [response, setResponse] = useState<ResponseModel | null>();

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
            <IngredientList ingredients={response?.recipes} />
          </Box>

          <Typography
            fontWeight="bold"
            sx={{ marginBottom: "10px", marginTop: "10px" }}
          >
            Cách làm
          </Typography>
          <Typography>
            {parseJsonStringToArray(response?.instruction, 2)?.map(
              (step: any) => (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ "& span": { fontWeight: "bold" } }}
                >
                  {/* <Typography>
                    <span>Bước {step.number}:</span> {step.step}
                  </Typography> */}
                  <Box
                    sx={{
                      backgroundColor: "#1AC073",
                      color: "#FFFF",
                      width: "25px",
                      height: "25px",
                      // padding: "5px",
                      borderRadius: "100%",
                      textAlign: "center",
                      marginBottom: "6px",
                    }}
                  >
                    {step.number}
                  </Box>
                  <Typography>{step.step}</Typography>
                </Stack>
              )
            )}
          </Typography>
        </Box>
      </Stack>
    );
  };

  const makingDialogOpenCloseHandler = () => {
    setIsMakingDialogOpen(!isMakingDialogOpen);
  };

  const fetchFoodDetailData = async () => {
    const foodDetail: ResponseModel = await getRecipeById(recipeId);

    setResponse(foodDetail);
  };

  useEffect(() => {
    fetchFoodDetailData();
  }, []);

  return (
    <>
      <DetailStyle elevation={3} sx={{}}>
        {/* Intro */}
        <IntroStyle>
          <Typography className="intro_title">{response?.name}</Typography>
          <Typography className="intro_desc">
            {parse(`${response?.description}`)}
          </Typography>
        </IntroStyle>

        {/* Image */}
        <Bowl
          size={500}
          sx={{
            bottom: "30%",
            right: "-70%",
            transform: "translateX(-50%)",
          }}
        >
          <ImageFoodStyle src={response?.pictureUrl} />
        </Bowl>

        {/* Description */}
        <Typography className="title-text">Mô tả</Typography>

        <DescriptionStyle direction="row">
          <Stack className="recipe_time_difficulty">
            <Stack className="recipe_time_difficulty--item" direction="row">
              <BiTimeFive className="item_icon" />
              <Typography className="item_text">
                {response?.timeCost} Phút
              </Typography>
            </Stack>
            <Stack className="recipe_time_difficulty--item" direction="row">
              <BiDish className="item_icon" />
              <Typography className="item_text">
                {convertDifficultyToString(response?.difficulty)}
              </Typography>
            </Stack>
          </Stack>

          <Stack className="recipe_chef" direction="row">
            <img
              className="recipe_chef--image"
              src={
                response?.chef?.pictureUrl ||
                "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              alt=""
            ></img>

            <Stack>
              <Typography className="recipe_chef--name">
                {response?.chef?.fullName}
              </Typography>
              <Typography>Đầu bếp</Typography>
            </Stack>
          </Stack>
        </DescriptionStyle>

        {/* Nutrition Information */}
        <Typography className="title-text">Thông tin dinh dưỡng</Typography>
        <NutritionList
          nutritionList={parseJsonStringToArray(response?.ingredient, 1)}
        />

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
        </Stack>
      </DetailStyle>
      {/* Gói nguyên liệu */}

      {/* Cách làm Dialog */}
      <CustomDialog
        isOpen={isMakingDialogOpen}
        onClose={makingDialogOpenCloseHandler}
        children={makingDialogContent()}
        title="Cách làm"
        sx={{ "& .MuiDialog-paper": { width: "70%", height: "80%" } }}
      />
    </>
  );
};

export default Recipe;
