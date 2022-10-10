import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { useController, Control } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";

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
  const editorRef = useRef<any | null>(null);

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
        onChange={(e: any) => {
          if (editorRef.current) {
            field.onChange(editorRef.current.getContent());
          }
        }}
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        init={{
          placeholder,
          height: 400,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "wordcount",
            "quickbars",
            "autoresize",
          ],
          toolbar:
            "formatselect | bold italic underline strikethrough | backcolor forecolor  | alignleft aligncenter alignright alignjustify | fontfamily fontsize blocks  | bullist numlist outdent indent | pagebreak | undo redo",
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
