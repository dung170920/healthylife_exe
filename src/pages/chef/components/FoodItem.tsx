import { RecipePreviewModel } from "models";
import { Box, Stack, styled, Typography } from "@mui/material";
import { BiTimeFive } from "react-icons/bi";

type Props = {
  item: RecipePreviewModel;
};

const FoodItemStyle = styled(Stack)(({ theme }) => ({
  "& .food_image": {
    width: "100%",
    height: "200px",
    borderRadius: "20px",
    cursor: "pointer",

    "& img": { width: "100%", height: "100%", borderRadius: "20px" },
  },

  "& .food_detail": {
    marginTop: "20px",
    justifyContent: "space-between",

    "& .name": { fontSize: "20px" },

    "& .time_info": {
      color: theme.palette.grey[600],
      marginTop: "10px",

      "& .icon": { fontSize: "30px", marginRight: "10px" },

      "& .minutes_text": { fontSize: "20px" },

      "& .time_info": { marginTop: "20px" },
    },

    "& .calories": {
      height: "40px",
      padding: "4px 8px 4px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.primary.main,
      color: "#FFFF",
      borderRadius: "10px",
    },
  },
}));

const FoodItem = ({ item }: Props) => {
  return (
    <FoodItemStyle>
      <Box className="food_image">
        <img src={item.PictureUrl} />
      </Box>
      <Stack direction="row" className="food_detail">
        <Stack>
          <Typography className="name">{item.Name}</Typography>
          <Stack className="time_info" direction="row" alignItems="center">
            <BiTimeFive className="icon" />
            <Typography className="minutes_text">
              {item.TimeCost} phút
            </Typography>
          </Stack>
        </Stack>

        <Stack className="calories">
          <Typography className="calories_text">{item.Calorie} kcal</Typography>
        </Stack>
      </Stack>
    </FoodItemStyle>
  );
};

export default FoodItem;
