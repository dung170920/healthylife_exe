import * as React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { RHFInput, RHFSelect } from "components";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type UserFormProps = {
  isLoading: boolean;
};

const FormSchema = Yup.object().shape({
  weight: Yup.string().required("Vui lòng nhập cân nặng"),
  height: Yup.string().required("Vui lòng nhập chiều cao"),
  target: Yup.string().required("Vui lòng chọn mục tiêu"),
});

const ButtonSubmit = styled(Button)(({ theme }: any) => ({
  marginTop: "16px",
  marginBottom: "8px",
  backgroundColor: theme.palette.primary.main,
  color: "white",

  ":hover": {
    backgroundColor: theme.palette.primary.main,
    filter: "brightness(90%)",
  },
}));

export const UserForm = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(FormSchema),
  });

  function onSubmit() {}
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    //setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const targets = [
    {
      value: "lossWeight",
      label: "Giảm cân",
    },
    {
      value: "gainWeight",
      label: "Tăng cân",
    },
    {
      value: "keepFit",
      label: "Giữ dáng",
    },
  ];

  return (
    <div>
      <Button onClick={handleClickOpen("paper")}>scroll=paper</Button>
      {/* <Button onClick={handleClickOpen("body")}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Thông tin khách hàng</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RHFSelect label="Mục tiêu" name="target" control={control}>
              {targets.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Gender
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Nữ"
                name="radio-buttons-group"
              >
                <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
              </RadioGroup>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày-Tháng-Năm sinh"
                value={value}
                minDate={dayjs("2017-01-01")}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <RHFInput
              name="Weight"
              label="Cân Nặng"
              control={control}
              placeholder="Nhập cân nặng"
            />
            <RHFInput
              name="Height"
              label="Chiều cao"
              control={control}
              placeholder="Nhập chiều cao"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <ButtonSubmit type="submit">Tiếp theo</ButtonSubmit>
        </DialogActions>
      </Dialog>
    </div>
  );
};
