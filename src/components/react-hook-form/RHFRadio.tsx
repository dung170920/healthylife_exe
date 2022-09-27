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
};

export const RHFRadio = ({ control, label, name, options }: RHFRadioProps) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl sx={{ mb: 1.5 }} fullWidth>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <RadioGroup {...field} row>
        {options.map((option, index) => (
          <FormControlLabel
            key={option.id}
            value={option.value}
            control={<Radio sx={{ color: "grey.600" }} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {!!errors[name] && (
        <FormHelperText error>
          {errors[name]?.message?.toString()}
        </FormHelperText>
      )}
    </FormControl>
  );
};
