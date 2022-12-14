import {
  Button,
  CircularProgress,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { formatPrice } from "utils/formatPrice";
import { FiCheck } from "react-icons/fi";
import { getNewAccessToken, upgradeMembership } from "api";
import { useNavigate } from "react-router-dom";
import { CustomSnackBar } from "components";
import { RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "redux/slices/AuthSlice";
import { AuthResponseModel } from "models";

type UpgradeItemProps = {
  title: string | React.ReactNode;
  subTitle: string;
  price: number;
  feature: { name: string; items: string[] };
  id: number;
  isUpgradeSuccess?: any;
};

const UpgradeItem = ({
  title,
  subTitle,
  price,
  feature,
  id,
  isUpgradeSuccess,
}: UpgradeItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<any>({
    message: "",
    status: false,
    type: "success",
  });
  const dispatch = useDispatch();
  let auth = useSelector((state: RootState) => state.auth.auth);

  function upgradeAccount() {
    setIsLoading(true);
    upgradeMembership(id)
      .then((response) => {
        isUpgradeSuccess(true);
        getNewAccessToken(auth!.refreshToken).then((res: AuthResponseModel) => {
          dispatch(setToken(res?.accessToken));
        });
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          message: "Nâng cấp tài khoản thất bại, số dư ví của bạn không đủ",
          status: true,
          type: "error",
        });
      })
      .finally(() => setIsLoading(false));
  }

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
      <Button onClick={upgradeAccount} variant="contained" disabled={isLoading}>
        {isLoading ? <CircularProgress /> : "Nâng cấp ngay"}
      </Button>
      {alert?.status && (
        <CustomSnackBar
          message={alert.message}
          status={alert.status}
          type={alert.type}
        />
      )}
    </Stack>
  );
};

export default UpgradeItem;
