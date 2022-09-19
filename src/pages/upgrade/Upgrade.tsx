import { HeaderBreadcumbs } from "components";
import React from "react";

const Upgrade = () => {
  return (
    <>
      <HeaderBreadcumbs
        heading="Nâng cấp tài khoản"
        links={[{ name: "Trang chủ", to: "/" }, { name: "Nâng cấp tài khoản" }]}
      />
    </>
  );
};

export default Upgrade;
