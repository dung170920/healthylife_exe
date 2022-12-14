import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  styled,
  Typography,
  Tooltip,
} from "@mui/material";
import parse from "html-react-parser";
import { RecipeModel } from "models";
import { useNavigate } from "react-router-dom";
import { TbLock } from "react-icons/tb";

type RecipeItemProps = {
  item: RecipeModel;
  // sx?: string;
  isMember?: boolean;
  isFoodForMember?: boolean;
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

export const RecipeItem = ({
  item,
  isMember,
  isFoodForMember,
}: RecipeItemProps) => {
  const navigate = useNavigate();

  return isMember ? (
    <Box
      sx={{
        width: 350,
        height: 350,
        position: "relative",

        // "& .member_label": {
        //   position: "absolute",
        //   top: "5%",
        //   left: "5%",
        // },
      }}
    >
      <Card
        variant="outlined"
        sx={{
          // opacity: !isForMember ? "40%" : "",
          px: 1.5,
          py: 2,
          cursor: "pointer",
          overflow: "hidden",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => {
          navigate(`/recipes/recipe/${item.id}`);
        }}
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
          // subheader={`${item.chef?.foodCount} c??ng th???c`}
        />
      </Card>
      {/* {!isForMember ? <TbLock className="block_icon" /> : ""} */}
      {/* <Typography className="member_label">D??nh ri??ng cho h???i vi??n</Typography> */}
    </Box>
  ) : (
    <Box
      sx={{
        width: 350,
        height: 350,

        // "& .member_label": {
        //   position: "absolute",
        //   top: "5%",
        //   left: "5%",
        // },

        "& .block_icon": {
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(70%,-50%)",
          // margin: "0 auto",
          fontWeight: "bold",
          color: "#1AC073",
          width: "80px",
          height: "80px",
          cursor: "pointer",
        },
      }}
    >
      <Card
        variant="outlined"
        sx={{
          opacity: isFoodForMember ? "40%" : "",
          px: 1.5,
          py: 2,
          cursor: "pointer",
          overflow: "hidden",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => {
          if (!isFoodForMember) {
            navigate(`/recipes/recipe/${item.id}`);
          }
        }}
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
          // subheader={`${item.chef?.foodCount} c??ng th???c`}
        />
      </Card>
      {isFoodForMember ? (
        <Box
          onClick={() => {
            navigate(`/upgrade`);
          }}
        >
          <TbLock className="block_icon" />
        </Box>
      ) : (
        ""
      )}
      {/* {isFoodForMember ? (
        <Typography className="member_label">
          D??nh ri??ng cho h???i vi??n
        </Typography>
      ) : (
        ""
      )} */}
    </Box>
  );
};
