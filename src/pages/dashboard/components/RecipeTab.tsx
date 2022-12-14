import { Stack, Box, styled, Typography } from "@mui/material";
import { RecipeModel } from "models";
import { GiKnifeFork } from "react-icons/gi";
import { BiTimeFive } from "react-icons/bi";
import { Bowl } from "components";
import { getRecipeById } from "api/RecipeApi";
import { Link } from "react-router-dom";

const RecipeTabStyle = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.lighter,
  borderRadius: "20px",
  position: "relative",
  padding: "16px",
  width: "225px",

  cursor: "pointer",

  "& img": {
    width: "180px",
    height: "180px",
    borderRadius: "inherit",
    objectFit: "cover",
  },

  "& .recipe-info": { marginTop: "auto" },

  "& .recipe-name": {
    marginTop: "100px",
    fontSize: "18px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  "& .recipe-info-detail": {
    alignItems: "center",
    marginTop: "8px",
    fontSize: "14px",
    color: theme.palette.grey[700],
  },
  "& .recipe-info-detail__icon": { marginRight: "8px" },

  "& .recipe-info-kcal": {
    fontSize: "14px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8px",
    color: theme.palette.grey[600],
  },
}));

const KcalTextStyle = styled("span")(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "bold",
  color: theme.palette.primary.main,
}));

type Props = {
  recipe: RecipeModel;
  index: number;
};

const RecipeTab = ({ recipe, index }: Props) => {
  // const navigate = useNavigate();
  // const redirectToFoodDetail = () => {
  //   navigate(`/api/v1/foods/${recipe.id}`);
  // };

  return (
    <Link to={`recipes/recipe/${recipe.id}`}>
      <RecipeTabStyle
        // onClick={redirectToFoodDetail}
        direction="column"
        key={recipe.id}
        sx={{
          ...(index === 0 && { backgroundColor: "info.lighter" }),
          ...(index === 1 && { backgroundColor: "error.lighter" }),
          ...(index === 2 && { backgroundColor: "warning.lighter" }),
        }}
      >
        <Bowl
          size={170}
          sx={{ top: "-40%", right: "50%", transform: "translate(50%)" }}
        >
          <img src={recipe.pictureUrl} alt=""></img>
        </Bowl>
        <Stack className="recipe-info" direction="column">
          <Typography className="recipe-name" fontWeight="bold">
            {recipe.name}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "space-between" }}
          >
            <Stack direction="column" sx={{ width: "60%" }}>
              <Stack className="recipe-info-detail" direction="row">
                <GiKnifeFork className="recipe-info-detail__icon" />
                {recipe.difficulty === 1
                  ? "D???"
                  : recipe.difficulty === 2
                  ? "Trung b??nh"
                  : "Kh??"}
              </Stack>
              <Stack className="recipe-info-detail" direction="row">
                <BiTimeFive className="recipe-info-detail__icon" />
                {recipe.timeCost} ph??t
              </Stack>
            </Stack>

            <Box className="recipe-info-kcal" sx={{ width: "40%" }}>
              <Box>
                <KcalTextStyle>{recipe.calorie}</KcalTextStyle> Kcal
              </Box>
            </Box>
          </Stack>
        </Stack>
      </RecipeTabStyle>
    </Link>
  );
};

export default RecipeTab;
