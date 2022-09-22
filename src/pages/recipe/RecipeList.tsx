import { Grid } from "@mui/material";
import { getRecipeList } from "api";
import { HeaderBreadcumbs, Pagination } from "components";
import { RecipeModel, RecipeRequestModel } from "models";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RecipeItem } from "./components/RecipeItem";

type ResponseModel = {
  items: RecipeModel[];
  maxPage: number;
  page: number;
};

const RecipeList = () => {
  const location = useLocation();
  const [response, setResponse] = useState<ResponseModel | null>();
  const [params, setParams] = useState<RecipeRequestModel>({
    FilterMode: 2,
    FoodTypeId: location.pathname.includes("foods") ? 2 : 1,
    PageSize: 6,
    Page: 1,
  });

  function handlePageChange(event: React.ChangeEvent<unknown>, page: number) {
    setParams({
      ...params,
      Page: page,
    });
  }

  useEffect(() => {
    getRecipeList(params).then((res: ResponseModel) => {
      console.log(res);
      setResponse(res);
    });
  }, [location.pathname, params]);

  return (
    <>
      <HeaderBreadcumbs
        heading="Danh sách công thức"
        links={[{ name: "Trang chủ", to: "/" }, { name: "Danh sách món" }]}
      />
      <Grid container spacing={6}>
        {response?.items &&
          response.items.map((item) => (
            <Grid item xs={4} key={item.id}>
              <RecipeItem item={item} />
            </Grid>
          ))}
      </Grid>
      <Pagination
        page={params.Page || 1}
        onChange={handlePageChange}
        count={response?.maxPage || 1}
        sx={{ my: 4 }}
      />
    </>
  );
};

export default RecipeList;
