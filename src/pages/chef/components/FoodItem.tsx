import { RecipeModel } from "models";
import { Box, Stack, styled, Typography } from "@mui/material";
import { BiTimeFive } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

type Props = {
  item: RecipeModel;
};

const FoodItemStyle = styled(Stack)(({ theme }) => ({
  maxWidth: "308px",
  "& .food_image": {
    width: "100%",
    height: "200px",
    borderRadius: "20px",
    cursor: "pointer",

    "& img": { width: "100%", height: "100%", borderRadius: "20px" },
  },

  "& .food_detail": {
    marginTop: "16px",
    justifyContent: "space-between",
    alignItems: "start",

    "& .name": {
      fontSize: "16px",
      fontWeight: 600,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "169px",
    },

    "& .time_info": {
      color: theme.palette.grey[600],
      marginTop: "10px",

      "& .icon": { fontSize: "24px" },

      "& .minutes_text": { fontSize: "14px", marginLeft: "8px" },

      "& .time_info": { marginTop: "8px" },
    },

    "& .calories": {
      fontSize: "12px",
      fontWeight: 700,
      padding: "4px 8px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.primary.main,
      color: "white",
      borderRadius: "6px",
    },
  },
}));

const FoodItem = ({ item }: Props) => {
  const navigate = useNavigate();

  return (
    <FoodItemStyle onClick={() => navigate(`/recipes/recipe/${item.id}`)}>
      <Box className="food_image">
        <img
          src={
            item?.pictureUrl ||
            "https://as1.ftcdn.net/v2/jpg/03/45/05/92/1000_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"
          }
          alt="công thức"
        />
      </Box>
      <Stack direction="row" className="food_detail">
        <Stack>
          <Typography className="name">{item.name}</Typography>
          <Stack className="time_info" direction="row" alignItems="center">
            <BiTimeFive className="icon" />
            <Typography className="minutes_text">
              {item.timeCost} phút
            </Typography>
          </Stack>
          <Stack className="time_info" direction="row" alignItems="center">
            <GiKnifeFork fontSize={18} />
            <Typography className="minutes_text">
              {item.difficulty === 1
                ? "Dễ"
                : item.difficulty === 2
                ? "Trung bình"
                : "Khó"}
            </Typography>
          </Stack>
        </Stack>

        <Stack className="calories">
          <Typography className="calories_text">{item.calorie} kcal</Typography>
        </Stack>
      </Stack>
    </FoodItemStyle>
  );
};

export default FoodItem;
