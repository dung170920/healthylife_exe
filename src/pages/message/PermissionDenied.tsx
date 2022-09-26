import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PermissionDenied = () => {
  const navigate = useNavigate();
  return (
    <Stack
      direction={"column"}
      alignItems="center"
      justifyContent={"center"}
      spacing={3}
    >
      <Typography fontSize={70} fontWeight={500}>
        Từ chối truy cập
      </Typography>
      <Typography fontSize={20}>
        Xin lỗi, tài khoản của bạn không có quyền truy cập
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

export default PermissionDenied;
