import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  styled,
  Typography,
} from "@mui/material";
import parse from "html-react-parser";
import { RecipeModel } from "models";
import { useNavigate } from "react-router-dom";

type RecipeItemProps = {
  item: RecipeModel;
};

type RecipeHeaderType = {
  type: number;
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
      objectFit: "cover",
    },

    "& .MuiCardHeader-title": {
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 2,
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: 16,
      fontWeight: 500,
      color: theme.palette.grey[900],
    },

    "& .MuiCardHeader-subheader": {
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
      color: type === 2 ? theme.palette.error.main : theme.palette.info.main,
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
        onClick={() => navigate(`/recipes/recipe/${item.id}`)}
      >
        <RecipeHeader
          sx={{ p: 0 }}
          avatar={
            <Avatar
              variant="rounded"
              src={
                item.pictureUrl ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
              }
              alt="recipe"
            />
          }
          title={item.name}
          subheader={item.foodType.name}
          type={item.foodType.id}
        />
        <CardContent
          sx={{
            px: 0,
          }}
        >
          <Typography
            variant="body1"
            color="grey.800"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 5,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {parse(item.description)}
          </Typography>
        </CardContent>
        <ChefContainer
          avatar={<Avatar src={item.chef?.pictureUrl} aria-label="chef" />}
          title={item.chef?.fullName}
          subheader={`${item.chef?.foodCount} công thức`}
        />
      </Card>
    </Box>
  );
};
