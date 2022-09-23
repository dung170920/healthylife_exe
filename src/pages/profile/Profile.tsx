import { styled } from "@mui/material";
import Content from "./components/Content";

import Cover from "./components/Cover";

const ProfileMainContainer = styled("div")(({ theme }) => ({
  position: "relative",
  height: "689px",
}));

const Profile = () => {
  return (
    <ProfileMainContainer>
      <Cover />

      <Content />
    </ProfileMainContainer>
  );
};

export default Profile;
