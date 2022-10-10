import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useController, Control } from "react-hook-form";

type RHFRadioProps = {
  name: string;
  label: string;
  control: Control<any>;
  options: any[];
  defaultValue?: number | string;
  value?: any;
  onChangeValue?: (e: any) => void;
};

export const RHFRadio = ({
  control,
  label,
  name,
  options,
  defaultValue,
  onChangeValue,
  value,
}: RHFRadioProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl sx={{ mb: 1.5 }} fullWidth>
      <FormLabel
        htmlFor={name}
        sx={{
          cursor: "pointer",
          pointerEvents: "unset",
          transform: "none",
          position: "relative",
          fontSize: 14,
          color: "grey.900",
        }}
      >
        {label}
      </FormLabel>
      <RadioGroup {...field} row>
        {options.map((option, index) => (
          <FormControlLabel
            key={option.id}
            value={option.value}
            control={<Radio sx={{ color: "grey.600", p: "6px" }} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {!!error && (
        <FormHelperText error sx={{ mt: 0 }}>
          {error?.message?.toString()}
        </FormHelperText>
      )}
    </FormControl>
  );
};
