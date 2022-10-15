import {
  Box,
  Divider,
  Stack,
  styled,
  Typography,
  Button,
  DialogActions,
} from "@mui/material";
import { HeaderBreadcumbs } from "components";
import React, { useState } from "react";
import UpgradeItem from "./components/UpgradeItem";
import { CustomDialog } from "components";
import { useNavigate } from "react-router-dom";

const UpgradeContainer = styled(Stack)(({ theme }) => ({
  padding: "48px",
  backgroundColor: "white",
  borderRadius: 8,
}));

const features = [
  {
    name: "month",
    items: [
      "Thiết kế thực đơn cho bạn hằng ngày",
      "Xem hết các công thức nấu ăn",
      "Thông báo về số lượng Calories trong ngày",
      "Theo dõi lộ trình",
    ],
  },
  {
    name: "year",
    items: [
      "Thiết kế thực đơn cho bạn hằng ngày",
      "Xem hết các công thức nấu ăn",
      "Thông báo về số lượng Calories trong ngày",
      "Theo dõi lộ trình",
      "Tiết kiệm hơn",
    ],
  },
];

const Upgrade = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialogOpenCloseHandler = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const dialogContent = () => {
    return (
      <Stack spacing={3}>
        <Typography>
          Chúc mừng bạn đã thành hội viên của Heli. Hãy qua trang cài đặt và
          chỉnh sửa lại thông tin sức khỏe để Heli tạo thực đơn hàng tuần cho
          bạn nhé
        </Typography>

        <DialogActions sx={{ marginTop: "auto" }}>
          <Button
            // sx={{
            //   backgroundColor: "error.main",
            //   "&:hover": { backgroundColor: "error.dark" },
            // }}
            color="primary"
            variant="contained"
            autoFocus
            onClick={() => {
              navigate(`/users/settings`);
            }}
          >
            Qua trang cài đặt
          </Button>
        </DialogActions>
      </Stack>
    );
  };

  const isUpdradeSuccess = (isSuccessful: any) => {
    if (isSuccessful) dialogOpenCloseHandler();
  };
  return (
    <>
      <HeaderBreadcumbs
        heading="Nâng cấp tài khoản"
        links={[{ name: "Trang chủ", to: "/" }, { name: "Nâng cấp tài khoản" }]}
      />
      <UpgradeContainer
        spacing={4}
        direction={"row"}
        justifyContent="space-between"
      >
        <UpgradeItem
          title="1 Tháng"
          subTitle="Có hạn sử dụng trong vòng 1 tháng kể từ ngày đăng kí"
          feature={features[0]}
          isUpgradeSuccess={isUpdradeSuccess}
          price={45000}
          id={1}
        />
        <Divider
          sx={{ color: "grey.200" }}
          orientation="vertical"
          flexItem
          variant="middle"
        />
        <UpgradeItem
          isUpgradeSuccess={isUpdradeSuccess}
          title={
            <Stack direction="row">
              1 Năm
              <Box
                sx={{
                  ml: 2,
                  fontSize: 12,
                  backgroundColor: "info.light",
                  borderRadius: "40px",
                  fontWeight: 700,
                  py: 1,
                  px: 2,
                }}
              >
                Khuyến khích
              </Box>
            </Stack>
          }
          subTitle="Có hạn sử dụng trong vòng 1 năm kể từ ngày đăng kí"
          feature={features[1]}
          price={299000}
          id={2}
        />
      </UpgradeContainer>

      {/* Delete Dialog */}
      <CustomDialog
        isOpen={isDialogOpen}
        onClose={dialogOpenCloseHandler}
        children={dialogContent()}
        title="Chúc mừng"
        sx={{ "& .MuiDialog-paper": { width: "50%", height: "43%" } }}
      />
    </>
  );
};

export default Upgrade;
