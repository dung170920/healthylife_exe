import {
  Stack,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputAdornment,
  Button,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateHealthInfo } from "api/UserApi";
import { CustomSnackBar } from "components";
import { UserModel } from "models/UserModel";

const convertVNToEn = (targetName: string | undefined) => {
  switch (targetName) {
    case "Tăng cân":
      return "GainWeight";
    case "Giảm cân":
      return "LoseWeight";
    case "Giữ dáng":
      return "GetFit";
  }
};

const groups = [
  {
    label: "Thiếu cân",
    max: 18.49,
  },
  {
    label: "Bình thường",
    min: 18.5,
    max: 24.99,
  },
  {
    label: "Thừa cân",
    min: 25,
    max: 29.99,
  },
  {
    label: "Béo phì độ I",
    min: 30,
    max: 34.99,
  },
  {
    label: "Béo phì độ II",
    min: 35,
    max: 39.99,
  },
  {
    label: "Béo phì độ III",
    min: 40,
  },
];

type BMIStyleProps = {
  active: boolean;
};

const BMIStyle = styled("span", {
  shouldForwardProp: (props) => props !== "active",
})<BMIStyleProps>(({ theme, active }: any) => ({
  padding: "0.5rem",
  position: "relative",
  color: "white",
  width: "145px",

  ":nth-child(1)": {
    backgroundColor: "#4691e2",
  },
  ":nth-child(2)": {
    backgroundColor: "#0cb764",
  },
  ":nth-child(3)": {
    backgroundColor: "#febf18",
  },
  ":nth-child(4)": {
    backgroundColor: "#fc8711",
  },
  ":nth-child(5)": {
    backgroundColor: "#ff6455",
  },
  ":nth-child(6)": {
    backgroundColor: "#cc1100",
  },

  ...(active && {
    "::before": {
      backgroundColor: "#fff",
      clipPath: "polygon(0% 0%,0% 100%,75.00% 50.00%)",
      content: "''",
      display: "inline-block",
      height: "1rem",
      left: "0.5rem",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "1rem",
    },
  }),
}));

type PropsType = { userData: UserModel };

const HealthInfo = ({ userData }: PropsType) => {
  const [userInfo, setUserInfo] = useState({
    target: convertVNToEn(userData.targetName),
    height: userData.height,
    weight: userData.weight,
  });
  const [alert, setAlert] = useState<any>({
    message: "",
    status: false,
    type: "success",
  });
  const [bmi, setBmi] = useState<number>(0);
  const [info, setInfo] = useState("");

  const handleTargetChange = (event: SelectChangeEvent) => {
    setUserInfo((pre) => ({ ...pre, target: event.target.value }));
  };

  const sendUpdateHealthInfo = async (e: any) => {
    setAlert({});

    try {
      e.preventDefault();
      await updateHealthInfo(userInfo);
      setAlert({
        message: "Cập nhật thông tin thành công",
        status: true,
        type: "success",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let val =
      (Number(userInfo.weight) /
        Number(userInfo.height) /
        Number(userInfo.height)) *
      10000;
    setBmi(val);
    groups.forEach((item) => {
      if (!item.min && bmi < item.max!) {
        setInfo(item.label);
      }
      if (bmi > item.min! && bmi < item.max!) {
        setInfo(item.label);
      }
      if (!item.max && bmi > item.min!) {
        setInfo(item.label);
      }
    });
  }, [bmi, userInfo.height, userInfo.weight]);

  return (
    <Stack sx={{ padding: "20px", gap: "20px" }}>
      <Typography
        sx={{ fontSize: "20px", fontWeight: "600", marginBottom: "" }}
      >
        Thông tin sức khỏe
      </Typography>

      <form onSubmit={sendUpdateHealthInfo}>
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel
            sx={{
              cursor: "pointer",
              pointerEvents: "unset",
              mb: 1,
              transform: "none",
              position: "relative",
              fontSize: 14,
            }}
            htmlFor="target"
          >
            Mục tiêu
          </InputLabel>
          <Select
            name="target"
            defaultValue={userInfo?.target}
            sx={{ width: "auto", paddingRight: "17px" }}
            onChange={handleTargetChange}
          >
            <MenuItem value={"GainWeight"}>Tăng cân</MenuItem>
            <MenuItem value={"LoseWeight"}>Giảm cân</MenuItem>
            <MenuItem value={"GetFit"}>Giữ dáng</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row">
          <FormControl sx={{ mb: 2, mr: 2 }} fullWidth>
            <InputLabel
              htmlFor="kg-input"
              sx={{
                cursor: "pointer",
                pointerEvents: "unset",
                mb: 1,
                transform: "none",
                position: "relative",
                fontSize: 14,
              }}
            >
              Cân nặng
            </InputLabel>
            <TextField
              required={true}
              id="kg-input"
              value={userInfo?.weight}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">kg</InputAdornment>
                ),
              }}
              onChange={(e) => {
                setUserInfo((pre) => ({
                  ...pre,
                  weight: Number(e.target.value),
                }));
              }}
            />{" "}
          </FormControl>

          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel
              htmlFor="cm-input"
              sx={{
                cursor: "pointer",
                pointerEvents: "unset",
                mb: 1,
                transform: "none",
                position: "relative",
                fontSize: 14,
              }}
            >
              Chiều cao
            </InputLabel>
            <TextField
              required={true}
              defaultValue={userInfo.height}
              value={userInfo?.height}
              id="cm-input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">cm</InputAdornment>
                ),
              }}
              onChange={(e) => {
                setUserInfo((pre) => ({
                  ...pre,
                  height: Number(e.target.value),
                }));
              }}
            />
          </FormControl>
        </Stack>

        <Button
          variant="contained"
          sx={{ height: "48px", width: "69px" }}
          type="submit"
        >
          Lưu
        </Button>
        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          Chỉ số BMI của bạn: {bmi.toFixed(1)}
        </Typography>
        <Stack direction={"row"} sx={{ width: "100%", textAlign: "center" }}>
          {groups.map((item) => (
            <BMIStyle active={info === item.label}>{item.label}</BMIStyle>
          ))}
        </Stack>
      </form>

      {/* Alert message */}
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

export default HealthInfo;
