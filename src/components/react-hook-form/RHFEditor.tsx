import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { useController, Control } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

type RHFEditorProps = {
  name: string;
  label: string;
  control: Control<any>;
  placeholder: string;
  type?: string;
};

export const RHFEditor = ({
  control,
  label,
  name,
  placeholder,
}: RHFEditorProps) => {
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
      <Editor
        id={name}
        {...field}
        value={field.value}
        onEditorChange={(a, editor) => {
          field.onChange(editor.getContent());
        }}
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        init={{
          placeholder,
          height: 400,
          menubar: false,
          plugins: [
            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
          ],
          toolbar:
            "formatselect | " +
            "bold italic backcolor forecolor| alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help | codesample | link image | undo redo | code",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; resixe:none; }",
        }}
      />
      {!!error && (
        <FormHelperText error sx={{ mt: 0 }}>
          {error?.message?.toString()}
        </FormHelperText>
      )}
    </FormControl>
  );
};
