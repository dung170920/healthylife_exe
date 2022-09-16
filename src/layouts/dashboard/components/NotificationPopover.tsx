import { Badge, IconButton } from "@mui/material";
import { BellIcon } from "assets/icons";

const NotificationPopover = () => {
  return (
    <IconButton sx={{ width: 48, height: 48 }}>
      <Badge color="error" variant="dot">
        <BellIcon />
      </Badge>
    </IconButton>
  );
};

export default NotificationPopover;
