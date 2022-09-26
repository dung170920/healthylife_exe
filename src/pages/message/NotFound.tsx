import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction={"column"}
      alignItems="center"
      justifyContent={"center"}
      spacing={3}
    >
      <Typography fontSize={70} fontWeight={500}>
        Không Tìm Thấy Trang
      </Typography>
      <Typography fontSize={20}>
        Có vẻ trang bạn đang tìm kiếm đang không đúng.
      </Typography>
      <Button
        onClick={() => navigate("/")}
        variant="contained"
        sx={{
          borderRadius: "100px",
        }}
      >
        Quay lại trang chủ
      </Button>
    </Stack>
  );
};

export default NotFound;
