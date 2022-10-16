import React, { useState, useEffect } from "react";
import { Paper, Box, Stack, styled, Tabs, Tab } from "@mui/material";
import HealthInfo from "./components/HealthInfo";
import UserInfo from "./components/UserInfo";
import { getProfile } from "api/UserApi";
import { UserModel } from "models/UserModel";

const LeftSideStyle = styled(Stack)(({ theme }) => ({
  padding: "20px",
  width: "25%",

  "& .tab-name": {
    padding: "8px 15px",
    fontWeight: "600",
    borderRadius: "8px",
    fontSize: "15px",
  },

  "& .MuiTab-root": { textAlign: "right" },
}));

const RightSideStyle = styled(Box)(({ theme }) => ({
  width: "75%",
}));

const Settings = () => {
  const [tab, setTab] = useState(1);
  const [userData, setUserData] = useState<UserModel>({
    email: "",
    fullName: "",
    id: "",
    pictureUrl: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      setUserData(await getProfile());
    };

    fetchUserProfile();
  }, []);
  return (
    <Paper elevation={1}>
      <Stack direction="row">
        <LeftSideStyle>
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={(e, newValue) => {
              setTab(newValue);
            }}
          >
            <Tab className="tab-name" value={1} label="Thông tin cá nhân" />
            <Tab className="tab-name" value={2} label="Thông tin sức khỏe" />
          </Tabs>
        </LeftSideStyle>

        <RightSideStyle>
          {tab === 1
            ? userData.fullName !== "" && <UserInfo userData={userData} />
            : userData && <HealthInfo userData={userData} />}
        </RightSideStyle>
      </Stack>
    </Paper>
  );
};

export default Settings;
