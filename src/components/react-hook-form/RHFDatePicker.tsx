import { FormControl, InputLabel, TextField } from "@mui/material";
import { useController, Control } from "react-hook-form";
import dayjs from "dayjs";

type RHFInputProps = {
  name: string;
  label: string;
  control: Control<any>;
  defaultValue?: Date;
  //   disableFuture?: boolean;
  //   value: Date | undefined;
  //   onChangeDate: (e: any) => void;
};

export const RHFDatePicker = ({
  control,
  label,
  name,
  defaultValue,
  ...props
}: RHFInputProps) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
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
        htmlFor={name}
      >
        {label}
      </InputLabel>
      <TextField
        {...field}
        {...props}
        name={name}
        id={name}
        type="date"
        defaultValue={dayjs(defaultValue).format("YYYY-MM-DD")}
      />
    </FormControl>
  );
};
