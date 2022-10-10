import {
  Autocomplete,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from "@mui/material";
import { ReactNode } from "react";
import { useController, Control } from "react-hook-form";

type RHFAutoCompleteProps = {
  name: string;
  label: string;
  list: any[];
  control: Control<any>;
  renderOption: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any
  ) => ReactNode;
  getOptionLabel: (option: any) => string;
  onChange: (event: any, newValue: string) => void;
};

export const RHFAutoComplete = ({
  name,
  list,
  control,
  label,
  renderOption,
  getOptionLabel,
  onChange,
}: RHFAutoCompleteProps) => {
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
      <Autocomplete
        id={name}
        options={list}
        autoHighlight
        getOptionLabel={getOptionLabel}
        {...field}
        onChange={onChange}
        renderOption={renderOption}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />

      {!!error && (
        <FormHelperText error sx={{ mt: 1 }}>
          {error?.message?.toString()}
        </FormHelperText>
      )}
    </FormControl>
  );
};
