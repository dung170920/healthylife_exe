import {
  Avatar,
  Box,
  Card,
  CardHeader,
  styled,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Stack } from "@mui/system";
import { ChefModel } from "models";
import { BsBoxArrowInDownLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type ChefItemProps = {
  item: ChefModel;
};

type ChefHeaderType = {
  type?: string;
};

// const ViewChef = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   borderRadius: 12,
//   color: "white",
//   marginTop: "auto",
//   padding: 12,
//   fontSize: 10,
//   fontWeight: 300,
//   // paddingLeft: 20,
// }));
const ChefHeader = styled(CardHeader)<ChefHeaderType>(({ theme, type }) => ({
  "& .MuiAvatar-root": {
    height: 76,
    width: 76,
    display: "flex",
    justifyContent: "center",
  },
  "& .MuiCardHeader-avatar": {
    marginRight: "0",
  },

  "& .MuiCardHeader-title": {
    paddingTop: 21,
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.grey[900],
  },

  "& .MuiCardHeader-subheader": {
    display: "flex",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 500,
    textTransform: "uppercase",
    color: theme.palette.grey[700],
  },
}));
export const ChefItem = ({ item }: ChefItemProps) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: 250, height: 290 }}>
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
          justifyContent: "space-between",
          alignItem: "center",
          flexDirection: "column",
        }}
      >
        <ChefHeader
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          avatar={
            <Avatar variant="circular" src={item.image} aria-label="chef" />
          }
          title={item.name}
          subheader={`${item.numberRecipe} Công thức`}
        />
        <CardActions>
          <Button
            fullWidth
            sx={{
              fontSize: 12,
              fontWeight: 600,
              backgroundColor: "primary.main",
              color: "white",
              marginTop: "auto",
              ":hover": {
                backgroundColor: "primary.main",
                filter: "brightness(0.9)",
              },
            }}
            onClick={() => navigate("/chefs/ChefDetail")}
          >
            Xem trang cá nhân
          </Button>
        </CardActions>
        {/* <ViewChef title="Xem trang cá nhân" /> */}
      </Card>
    </Box>
  );
};
