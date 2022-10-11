import {
  Box,
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
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { RHFInput } from "components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { updateHealthInfo } from "api/UserApi";
import { CustomSnackBar } from "components";
import { UserModel, HealthInfoUpdateRequestModel } from "models/UserModel";

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

  const handleTargetChange = (event: SelectChangeEvent) => {
    setUserInfo((pre) => ({ ...pre, target: event.target.value }));
  };

  const sendUpdateHealthInfo = async (e: any) => {
    try {
      e.preventDefault();
      console.log("user inforrrr: ", userInfo);
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
