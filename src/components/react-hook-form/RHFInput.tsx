import { FormControl, InputLabel, TextField } from "@mui/material";
import { useController, Control } from "react-hook-form";

type RHFInputProps = {
  name: string;
  label: string;
  control: Control<any>;
  placeholder: string;
};

export const RHFInput = ({
  control,
  label,
  name,
  placeholder,
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
    <FormControl sx={{ mb: 3 }} fullWidth>
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
        placeholder={placeholder}
        id={name}
        error={!!errors[name]}
        helperText={errors[name]?.message?.toString()}
      />
      {/* {errors[props.name]?.message && (
    <Typography>{props.name && errors[props.name]?.message}</Typography>
  )} */}
    </FormControl>
  );
};
