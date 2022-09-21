import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  styled,
  Typography,
} from "@mui/material";
import { RecipeModel } from "models";
import { useNavigate } from "react-router-dom";

type RecipeItemProps = {
  item: RecipeModel;
};

type RecipeHeaderType = {
  type?: string;
};

const ChefContainer = styled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: 20,
  color: "white",
  marginTop: "auto",

  "& .MuiAvatar-root": {
    height: 48,
    width: 48,
  },

  "& .MuiCardHeader-content": {
    maxWidth: 244,
  },

  "& .MuiCardHeader-title": {
    fontSize: 16,
    fontWeight: 600,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingRight: "16px",
  },
}));

const RecipeHeader = styled(CardHeader)<RecipeHeaderType>(
  ({ theme, type }) => ({
    "& .MuiAvatar-root": {
      height: 76,
      width: 76,
      borderRadius: 12,
    },

    "& .MuiCardHeader-title": {
      fontSize: 16,
      fontWeight: 500,
      color: theme.palette.grey[900],
    },

    "& .MuiCardHeader-subheader": {
      fontSize: 12,
      fontWeight: 500,
      textTransform: "uppercase",
      color:
        type === "món ăn" ? theme.palette.error.main : theme.palette.info.main,
    },
  })
);

export const RecipeItem = ({ item }: RecipeItemProps) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 350, height: 350 }}>
      <Card
        variant="outlined"
        sx={{
          px: 1.5,
          py: 2,
          cursor: "pointer",
          overflow: "hidden",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => navigate("/recipes/recipe/1")}
      >
        <RecipeHeader
          sx={{ p: 0 }}
          avatar={
            <Avatar variant="rounded" src={item.image} aria-label="recipe" />
          }
          title={item.name}
          subheader={item.type}
          type={item.type}
        />
        <CardContent sx={{ px: 0 }}>
          <Typography variant="body1" color="grey.800">
            {item.description}
          </Typography>
        </CardContent>
        <ChefContainer
          avatar={<Avatar src={item.chef?.image} aria-label="chef" />}
          title={item.chef?.name}
          subheader="250 công thức"
        />
      </Card>
    </Box>
  );
};
