import { Button, Divider, Stack, SvgIcon, Typography } from "@mui/material";
import React from "react";
import { formatPrice } from "utils/formatPrice";
import { FiCheck } from "react-icons/fi";

type UpgradeItemProps = {
  title: string | React.ReactNode;
  subTitle: string;
  price: number;
  feature: { name: string; items: string[] };
};

const UpgradeItem = ({
  title,
  subTitle,
  price,
  feature,
  ...props
}: UpgradeItemProps) => {
  return (
    <Stack direction={"column"} justifyContent="space-between" spacing={10}>
      <Stack direction={"column"} spacing={3}>
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>
        <Typography noWrap fontWeight={600} sx={{ color: "grey.700" }}>
          {subTitle}
        </Typography>
        <Divider sx={{ color: "grey.200" }} />
        <Typography variant="h2" fontWeight={600} textAlign="center">
          {formatPrice(price)}
        </Typography>
        <Divider sx={{ color: "grey.200" }} />
        {feature.items.map((item) => (
          <Stack direction="row">
            <SvgIcon sx={{ color: "primary.main", mr: 1 }}>
              <FiCheck fontSize={24} />
            </SvgIcon>
            {item}
          </Stack>
        ))}
      </Stack>
      <Button onClick={() => {}} variant="contained">
        Nâng cấp ngay
      </Button>
    </Stack>
  );
};

export default UpgradeItem;