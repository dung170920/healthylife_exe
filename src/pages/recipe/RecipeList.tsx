import { HeaderBreadcumbs } from "components";
import React from "react";

const RecipeList = () => {
  return (
    <>
      <HeaderBreadcumbs
        heading="Danh sách công thức"
        links={[{ name: "Trang chủ", to: "/" }, { name: "Danh sách món" }]}
      />
    </>
  );
};

export default RecipeList;
