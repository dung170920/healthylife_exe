import { FormControl, InputLabel, TextField } from "@mui/material";
import { useController, Control } from "react-hook-form";

type RHFInputProps = {
  name: string;
  label?: string;
  control?: Control<any>;
  placeholder?: string;
  type?: string;
  // readOnly?: boolean;
  disabled?: boolean;
};

export const RHFInput = ({
  control,
  label,
  name,
  placeholder,
  type = "text",
  disabled,
  // readOnly,
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
        placeholder={placeholder}
        id={name}
        disabled={disabled || false}
        // reaOnly={readOnly}{readOnly && false}
        type={type}
        error={!!errors[name]}
        helperText={errors[name]?.message?.toString()}
      />
    </FormControl>
  );
};
