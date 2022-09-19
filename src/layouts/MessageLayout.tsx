import React from "react";
import { Outlet } from "react-router-dom";

const MessageLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MessageLayout;
