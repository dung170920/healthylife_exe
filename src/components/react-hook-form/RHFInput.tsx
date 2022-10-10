import { FormControl, InputLabel, TextField } from "@mui/material";
import { useController, Control } from "react-hook-form";

type RHFInputProps = {
  name: string;
  label: string;
  control: Control<any>;
  placeholder?: string;
  type?: string;
  InputProps?: Object;
  onChange?: (e: any) => void;
};

export const RHFInput = ({
  control,
  label,
  name,
  placeholder,
  type = "text",
  ...props
}: RHFInputProps) => {
  const {
    field,
    fieldState: { error },
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
          color: "grey.900",
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
        type={type}
        error={!!error}
        helperText={error?.message?.toString()}
      />
    </FormControl>
  );
};
