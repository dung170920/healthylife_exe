import { FormControl, InputLabel, TextField } from "@mui/material";
import { ReactNode } from "react";
import { useController, Control } from "react-hook-form";

type RHFSelectProps = {
  name: string;
  label: string;
  children: ReactNode;
  defaultValue?: string | number;
  control?: Control<any>;
};

export const RHFSelect = ({
  name,
  children,
  control,
  label,
  defaultValue,
}: RHFSelectProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl sx={{ mb: 1.5 }} fullWidth>
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
        id={name}
        defaultValue={defaultValue}
        name={name}
        select
        fullWidth
        error={!!error}
        helperText={error?.message?.toString()}
      >
        {children}
      </TextField>
    </FormControl>
  );
};
