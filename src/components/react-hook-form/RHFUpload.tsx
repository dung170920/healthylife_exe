import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useController, Control } from "react-hook-form";

type RHFUploadProps = {
  name: string;
  control: Control<any>;
  type?: string;
  //   inputRef: any;
  defaultValue: string;
  value?: string;
  //   onFileChange?: () => any;
};

export const RHFUpload = ({
  control,
  name,
  type = "text",
  //   inputRef,
  defaultValue,
  value,
  //   onFileChange,
  ...props
}: RHFUploadProps) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl sx={{ mb: 2 }} fullWidth>
      <TextField
        {...field}
        {...props}
        // defaultValue={defaultValue}
        sx={{ display: "none" }}
        // onChange={onFileChange}
        // inputRef={inputRef}
        defaultValue={defaultValue}
        value={value}
        name={name}
        // id={name}
        type={type}
        // error={!!errors[name]}
        // helperText={errors[name]?.message?.toString()}
      />
    </FormControl>
  );
};
