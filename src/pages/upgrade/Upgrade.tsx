import { Box, Divider, Stack, styled } from "@mui/material";
import { HeaderBreadcumbs } from "components";
import React from "react";
import UpgradeItem from "./components/UpgradeItem";

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
          price={45000}
        />
        <Divider
          sx={{ color: "grey.200" }}
          orientation="vertical"
          flexItem
          variant="middle"
        />
        <UpgradeItem
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
        />
      </UpgradeContainer>
    </>
  );
};

export default Upgrade;
