import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { useController, Control } from "react-hook-form";

type RHFCheckboxProps = {
  name: string;
  label: string;
  control: Control<any>;
  list: string[];
};

export const RHFCheckbox = ({
  control,
  label,
  name,
  list,
}: RHFCheckboxProps) => {
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
      <FormGroup>
        {list?.map((item) => (
          <FormControlLabel
            name={name}
            control={<Checkbox {...field} />}
            label={item}
            key={item}
            sx={{ whiteSpace: "noWrap" }}
          />
        ))}
      </FormGroup>

      {!!error && (
        <FormHelperText error sx={{ mt: 0 }}>
          {error?.message?.toString()}
        </FormHelperText>
      )}
    </FormControl>
  );
};
