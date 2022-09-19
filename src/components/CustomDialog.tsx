import {
  Dialog,
  DialogTitle,
  Divider,
  Typography,
  Stack,
  styled,
  Box,
} from "@mui/material";
import { GrClose } from "react-icons/gr";
import React from "react";

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

type DialogProps = {
  children: React.ReactNode;
  onClose: () => void;
  sx?: Object;
  title: string;
  isOpen: boolean;
};

const DialogContentStyle = styled(Box)(({ theme }) => ({
  padding: "10px 20px 20px",
}));

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
      <DialogTitle id="alert-dialog-title">
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            "& .close-icon": {
              cursor: "pointer",
              padding: "10px",
              borderRadius: "100%",
              color: "#171725",
              fontSize: "40px",

              "&:hover": { backgroundColor: "#B5B5BE", transition: "0.3s" },
            },
          }}
        >
          <Typography
            sx={{ lineHeight: 2.2, fontSize: "20px", fontWeight: "bold" }}
          >
            {title}
          </Typography>

          <GrClose onClick={onClose} className="close-icon" />
        </Stack>
      </DialogTitle>
      <Divider sx={{ marginBottom: "10px" }} />

      <DialogContentStyle>{children}</DialogContentStyle>
    </Dialog>
  );
};
