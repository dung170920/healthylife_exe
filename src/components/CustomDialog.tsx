import { Dialog, DialogTitle, Divider } from "@mui/material";
import React from "react";

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

type DialogProps = {
  children: React.ReactNode;
  onClose: () => void;
  sx?: Object;
  title: string;
  other: any;
  isOpen: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CustomDialog = ({
  onClose,
  children,
  title,
  sx,
  isOpen,
  ...other
}: DialogProps) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      sx={sx}
      {...other}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <Divider sx={{ marginBottom: "10px" }} />
      {children}
    </Dialog>
  );
};
