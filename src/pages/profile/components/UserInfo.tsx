import { Box, Button, Typography, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { RHFInput, RHFRadio, RHFDatePicker } from "components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { UserInfoUpdateRequestModel, UserModel } from "models/UserModel";
import { AiOutlinePlus } from "react-icons/ai";
import { CustomSnackBar } from "components";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "config/config";
import React, { useState, useRef } from "react";
import { updateUserInfo } from "api/UserApi";
import { getNewAccessToken } from "api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { AuthResponseModel } from "models";
import { setToken } from "redux/slices/AuthSlice";

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("Vui lòng nhập họ và tên"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  gender: Yup.string()
    .required("Vui lòng chọn giới tính")
    .oneOf(["Male", "Female"]),
});

type PropsType = { userData: UserModel };

const UserInfo = ({ userData }: PropsType) => {
  const fileInputRef = useRef<any>();
  const imgRef = useRef<any>();
  let auth = useSelector((state: RootState) => state.auth.auth);
  const defaultValues = {
    fullName: userData.fullName,
    gender: userData.gender,
    email: userData.email,
  };
  const dispatch = useDispatch();
  // const [pictureUrl, setPictureUrl] = useState<string>();

  const [alert, setAlert] = useState<any>({
    message: "",
    status: false,
    type: "success",
  });

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  ///////////////////////////// Start Upload Image ///////////////////////////////
  let filesList = [];
  let reqPic: string = "";

  // const uploadFileProcess = () => {
  //   imagePreviewHandler(fileInputRef.current?.files);
  //   uploadImage();
  // };

  const imagePreviewHandler = (files: any) => {
    filesList = files;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      imgRef.current.style.display = "block";
      imgRef.current.src = reader.result;
    });
    reader.readAsDataURL(filesList[0]);
  };

  const uploadImage = () => {
    const filePath = `avt-images/`;

    const file = fileInputRef?.current.files[0];
    if (!file) {
      return;
    }
    const name = file.name;
    const storageRef = ref(
      storage,
      `${filePath}/${name}-${new Date().toISOString()}`
    );
    const metadata = {
      contentType: file.type,
    };
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // setPictureUrl(downloadURL);
          reqPic = downloadURL;
        });
      }
    );
  };

  ///////////////////////////// End Upload Image ///////////////////////////////

  const onSubmit = async (data: UserInfoUpdateRequestModel) => {
    setAlert({});
    try {
      uploadImage();
      setTimeout(async () => {
        if (reqPic) {
          data.pictureUrl = reqPic;
        }

        updateUserInfo(data).then((response) => {
          getNewAccessToken(auth!.refreshToken).then(
            (res: AuthResponseModel) => {
              dispatch(setToken(res?.accessToken));
            }
          );
          setAlert({
            message: "Cập nhật thông tin thành công",
            status: true,
            type: "success",
          });
        });
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack sx={{ padding: "20px", gap: "20px" }}>
      <Typography
        sx={{ fontSize: "20px", fontWeight: "600", marginBottom: "" }}
      >
        Thông tin cá nhân
      </Typography>

      <Stack direction="row" alignItems="center">
        <Box
          sx={{
            width: "96px",
            height: "96px",
            marginRight: "32px",
            "& img": {
              borderRadius: "100%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }}
        >
          <img
            ref={imgRef}
            src={
              userData?.pictureUrl ||
              "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
            alt=""
          />
        </Box>

        <Button
          variant="contained"
          sx={{ height: "48px" }}
          startIcon={<AiOutlinePlus />}
          onClick={() => {
            fileInputRef?.current?.click();
          }}
        >
          Cập nhật ảnh đại diện
        </Button>

        <TextField
          type="file"
          sx={{ display: "none" }}
          onChange={() => {
            imagePreviewHandler(fileInputRef.current?.files);
          }}
          inputRef={fileInputRef}
        />
      </Stack>

      {/* Update Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFInput
          name="fullName"
          control={control}
          label="Tên đầy đủ"
          placeholder="Nhập tên đầy đủ"
        />

        <RHFInput
          disabled={true}
          name="email"
          control={control}
          label="Email"
          placeholder="Nhập email"
        />

        <RHFDatePicker
          name="birthday"
          control={control}
          label="Ngày tháng năm sinh"
          defaultValue={userData.birthday}
        />

        <RHFRadio
          control={control}
          label="Giới tính"
          name="gender"
          options={[
            {
              id: 1,
              label: "Nam",
              value: "Male",
            },
            {
              id: 2,
              label: "Nữ",
              value: "Female",
            },
          ]}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ height: "48px", width: "120px" }}
        >
          Cập nhật
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

export default UserInfo;
