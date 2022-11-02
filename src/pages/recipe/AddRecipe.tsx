import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  styled,
  Typography,
  InputLabel,
  TextField,
} from "@mui/material";
import { TbAlignLeft } from "react-icons/tb";
import {
  RHFAutoComplete,
  RHFCheckbox,
  RHFEditor,
  RHFInput,
  RHFSelect,
} from "components";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "config/config";
import { BsUpload } from "react-icons/bs";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FoodCoverIcon } from "assets/icons";
import { HiPlus, HiOutlineMinusCircle } from "react-icons/hi";
import { addRecipe, getIngredientList } from "api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const AddRecipeSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên"),
  // pictureUrl: Yup.string().required("Vui lòng gửi lên ảnh"),
  instruction: Yup.array().of(
    Yup.object().shape({
      step: Yup.string().required("Vui lòng nhập mô tả bước"),
    })
  ),
  calorie: Yup.string().required("Vui lòng nhập calorie"),
  ingredients: Yup.array().of(
    Yup.object().shape({
      amount: Yup.string().required("Vui lòng nhập số lượng"),
    })
  ),
  timeCost: Yup.string().required("Vui lòng nhập thời gian nấu"),
  difficulty: Yup.string().required("Vui lòng chọn độ khó"),
  foodType: Yup.string().required("Vui lòng chọn loại công thức"),
  recipes: Yup.array().of(
    Yup.object().shape({
      recipeId: Yup.string().required("Vui lòng chọn loại nguyên liệu"),
      amount: Yup.string().required("Vui lòng nhập số lượng"),
      unit: Yup.string().required("Vui lòng chọn nhập đơn vị"),
    })
  ),
});

const defaultValues = {
  name: "",
  description: "",
  timeCost: "",
  difficulty: "",
  calorie: "",
  instruction: [{ number: 1, step: "" }],
  foodType: "",
  isMembershipOnly: false,
  recipes: [{ recipeId: "", amount: "", unit: "" }],
  ingredients: [
    { name: "protein", amount: "", unit: "g" },
    { name: "fat", amount: "", unit: "g" },
    { name: "carbs", amount: "", unit: "g" },
  ],
  pictureUrl: "",
};

const levels = [
  {
    value: "Easy",
    label: "Dễ",
  },
  {
    value: "Medium",
    label: "Trung bình",
  },
  {
    value: "Hard",
    label: "Khó",
  },
];

const AddRecipeBox = styled(Box)(() => ({
  padding: "24px",
  backgroundColor: "white",
  borderRadius: "8px",
}));

const ImgStyle = styled("img")(() => ({
  height: "50px",
  width: "70px",
  borderRadius: "12px",
  marginRight: "16px",
}));

const AddRecipe = () => {
  const navigate = useNavigate();
  let user = useSelector((state: RootState) => state.auth.auth?.user);
  const uploadImgFoodRef = useRef<any>();
  const imgRef = useRef<any>();
  const [pictureUrl, setPictureUrl] = useState<string>();
  const [isUploaded, setIsUploaded] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(AddRecipeSchema),
    defaultValues,
  });
  const recipeFields = useFieldArray({
    name: "recipes",
    control,
  });
  const instructionFields = useFieldArray({
    name: "instruction",
    control,
  });

  const fetchIngredientList = () => {
    getIngredientList()
      .then((res) => {
        console.log(res);
        setIngredients(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddField = () => {
    recipeFields.append({ recipeId: "", amount: "", unit: "" });
  };

  const handleAddFieldMake = () => {
    instructionFields.append({
      number: instructionFields.fields.length + 1,
      step: "",
    });
  };

  let filesList = [];
  let uploadPic: string = "";

  const imagePreviewHandler = (files: any) => {
    filesList = files;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      imgRef.current.style.display = "block";
      imgRef.current.src = reader.result;
    });
    reader.readAsDataURL(filesList[0]);

    setIsUploaded(true);
  };

  const uploadImage = async () => {
    const filePath = `avt-images/`;

    const file = uploadImgFoodRef?.current.files[0];
    const name = file.name;
    const storageRef = await ref(
      storage,
      `${filePath}/${name}-${new Date().toISOString()}`
    );
    const metadata = {
      contentType: file.type,
    };
    const uploadTask = uploadBytesResumable(storageRef, file);
    await uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // setPictureUrl(downloadURL);
          uploadPic = downloadURL;
        });
      }
    );
  };

  useEffect(() => {
    fetchIngredientList();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await uploadImage();
      // data.pictureUrl = uploadPic;
      // await addRecipe(data);
      setTimeout(async () => {
        data.pictureUrl = uploadPic;
        await addRecipe(data);
        if (user !== undefined && user.role === "admin") {
          navigate("/recipes");
        } else {
          navigate("/recipes/management");
        }
      }, 8000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1.5}>
        <Grid item xs={6}>
          <AddRecipeBox>
            <RHFInput
              name="name"
              label="Tên"
              control={control}
              placeholder="Nhập tên"
            />
            <RHFEditor
              name="description"
              label="Mô tả"
              control={control}
              placeholder="Nhập mô tả"
            />
            <Stack direction="row" spacing={2}>
              <RHFInput
                name="timeCost"
                type="number"
                label="Thời gian nấu"
                control={control}
                placeholder="Nhập thời gian nấu (phút)"
              />
              <RHFSelect label="Độ khó" name="difficulty" control={control}>
                {levels.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
            <Typography sx={{ fontSize: 14, my: 2 }}>
              Thành phần dinh dưỡng
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <RHFInput
                  name="calorie"
                  label="Tổng calorie"
                  control={control}
                  placeholder="Nhập tổng calorie"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">kcal</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <RHFInput
                  name="ingredients[0].amount"
                  label="Protein"
                  control={control}
                  placeholder="Nhập protein"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">g</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <RHFInput
                  name="ingredients[1].amount"
                  label="Fat"
                  control={control}
                  placeholder="Nhập fat"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">g</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <RHFInput
                  name="ingredients[2].amount"
                  label="Carbs"
                  control={control}
                  placeholder="Nhập carbs"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">g</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2}>
              <RHFSelect label="Loại" name="foodType" control={control}>
                <MenuItem value="Drink">Drink</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
              </RHFSelect>
              <Stack direction="row" spacing={1} alignItems="center">
                <RHFCheckbox
                  name="isMembershipOnly"
                  control={control}
                  label=""
                  list={["Chỉ có hội viên có thể xem "]}
                />
              </Stack>
            </Stack>

            <InputLabel
              sx={{
                cursor: "pointer",
                pointerEvents: "unset",
                mb: 1,
                transform: "none",
                position: "relative",
                fontSize: 14,
                color: "grey.900",
              }}
              htmlFor="picFood"
            >
              Hình ảnh
            </InputLabel>
            <Stack
              id="picFood"
              justifyContent="center"
              alignItems="center"
              sx={{
                height: "250px",
                width: "100%",
                backgroundColor: "#F4F4F4",
                borderRadius: "15px",
                position: "relative",

                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "15px",
                },
              }}
            >
              <img
                ref={imgRef}
                // src="https://go2joy.s3.ap-southeast-1.amazonaws.com/blog/wp-content/uploads/2022/04/30104619/thit-ga-chien-mam-toi-72-mon.jpg"/>
                alt=""
              />
              <Button
                sx={{
                  width: "100px",
                  height: "40px",
                  fontSize: "10px",
                  position: "absolute",
                  opacity: "50%",

                  "&:hover": { opacity: "100%" },
                }}
                variant="contained"
                startIcon={<BsUpload />}
                onClick={() => {
                  uploadImgFoodRef.current.click();
                }}
              >
                chọn ảnh
              </Button>
            </Stack>
            <TextField
              sx={{ display: "none" }}
              type="file"
              inputRef={uploadImgFoodRef}
              onChange={() => {
                imagePreviewHandler(uploadImgFoodRef.current?.files);
              }}
            />
            <Box>
              <Button
                type="submit"
                sx={{
                  marginLeft: "50%",
                  transform: "translate(-50%,-50%)",
                  marginTop: "50px",
                }}
                variant="contained"
              >
                Tạo công thức
              </Button>
            </Box>
          </AddRecipeBox>
        </Grid>
        <Grid item xs={6}>
          <AddRecipeBox>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={1} mb={5}>
                <FoodCoverIcon />
                <Typography>Nguyên liệu</Typography>
              </Stack>
              <IconButton color="primary" onClick={handleAddField}>
                <HiPlus />
              </IconButton>
            </Stack>

            {recipeFields.fields.map((item, index) => (
              <Stack
                direction="row"
                spacing={1.5}
                justifyContent="space-between"
                key={index}
              >
                <RHFAutoComplete
                  name={`recipes[${index}].recipeId`}
                  label="Loại nguyên liệu"
                  control={control}
                  getOptionLabel={(option: any) => option.name || ""}
                  list={ingredients}
                  renderOption={(props, option) => (
                    <MenuItem key={option.id} value={option.id} {...props}>
                      <ImgStyle
                        loading="lazy"
                        src={
                          option.pictureUrl ??
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                        }
                        alt=""
                      />
                      {option.name}
                    </MenuItem>
                  )}
                />
                <Stack direction="row" spacing={1}>
                  <RHFInput
                    name={`recipes[${index}].amount`}
                    label="Số lượng"
                    control={control}
                    placeholder="Nhập số lượng"
                  />
                  <RHFInput
                    name={`recipes[${index}].unit`}
                    label="Đơn vị"
                    control={control}
                    placeholder="Nhập đơn vị"
                  />
                </Stack>
                <IconButton
                  disabled={index === 0}
                  color="error"
                  onClick={() => {
                    recipeFields.remove(index);
                  }}
                  sx={{
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <HiOutlineMinusCircle />
                </IconButton>
              </Stack>
            ))}
          </AddRecipeBox>
          <AddRecipeBox sx={{ mt: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={1} mb={5}>
                <TbAlignLeft fontSize={24} />
                <Typography>Cách làm</Typography>
              </Stack>
              <IconButton color="primary" onClick={handleAddFieldMake}>
                <HiPlus />
              </IconButton>
            </Stack>

            {instructionFields.fields.map((item, index) => (
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems={"center"}
                key={index}
                mb={3}
              >
                <Typography fontSize={20}>{index + 1}.</Typography>
                <RHFInput
                  name={`instruction[${index}].step`}
                  label="Mô tả"
                  control={control}
                />

                <IconButton
                  disabled={index === 0}
                  color="error"
                  onClick={() => {
                    instructionFields.remove(index);
                  }}
                  sx={{
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <HiOutlineMinusCircle />
                </IconButton>
              </Stack>
            ))}
          </AddRecipeBox>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddRecipe;
