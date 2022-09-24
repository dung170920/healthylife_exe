import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { UserModel, UsersRequestModel } from "models";
import { HeaderBreadcumbs, Pagination } from "components";
import { ChefItem } from "./components/ChefItem";
import { getUsers } from "api";

type ResponseListModel = {
  items: UserModel[];
  maxPage: number;
  page: number;
};

const ChefList = () => {
  const [chefs, setChefs] = useState<ResponseListModel | null>();
  const [params, setParams] = useState<UsersRequestModel>({
    mode: 2,
    page: 1,
    pageSize: 8,
  });

  function handlePageChange(event: React.ChangeEvent<unknown>, page: number) {
    setParams({
      ...params,
      page,
    });
  }

  useEffect(() => {
    getUsers(params).then((res) => {
      console.log(res);
      setChefs(res);
    });
  }, [params]);

  return (
    <>
      <HeaderBreadcumbs
        heading="Danh sách đầu bếp"
        links={[{ name: "Trang chủ", to: "/" }, { name: "Danh sách đầu bếp" }]}
      />
      <Grid container spacing={4}>
        {chefs?.items &&
          chefs.items?.map((chef) => (
            <Grid item xs={3} key={chef.id}>
              <ChefItem item={chef} />
            </Grid>
          ))}
      </Grid>
      <Pagination
        page={params.page || 1}
        onChange={handlePageChange}
        count={chefs?.maxPage || 1}
        sx={{ my: 4 }}
      />
    </>
  );
};

export default ChefList;
