import { Stack, Box, styled, Typography } from "@mui/material";
import { RecipePreviewModel } from "models";
import { GiKnifeFork } from "react-icons/gi";
import { BiTimeFive } from "react-icons/bi";
import { Bowl } from "components";

const RecipeTabStyle = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.lighter,
  borderRadius: "20px",
  position: "relative",
  padding: "16px",
  width: "225px",

  cursor: "pointer",

  "& img": {
    width: "120px",
    height: "120px",
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
    marginTop: "33px",
    color: theme.palette.grey[600],
  },
}));

const KcalTextStyle = styled("span")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "bold",
  color: theme.palette.primary.main,
}));

type Props = {
  recipe: RecipePreviewModel;
  index: number;
};

const RecipeTab = ({ recipe, index }: Props) => {
  return (
    <RecipeTabStyle
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
        <img src={recipe.image} alt=""></img>
      </Bowl>
      <Stack className="recipe-info" direction="column">
        <Typography className="recipe-name" fontWeight="bold">
          {recipe.name}
        </Typography>

        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Stack direction="column">
            <Stack className="recipe-info-detail" direction="row">
              <GiKnifeFork className="recipe-info-detail__icon" />
              {recipe.level}
            </Stack>
            <Stack className="recipe-info-detail" direction="row">
              <BiTimeFive className="recipe-info-detail__icon" />
              {recipe.time} phút
            </Stack>
          </Stack>

          <Box className="recipe-info-kcal">
            <Box>
              <KcalTextStyle>{recipe.kcal}</KcalTextStyle> Kcal
            </Box>
          </Box>
        </Stack>
      </Stack>
    </RecipeTabStyle>
  );
};

export default RecipeTab;
