import { Grid, Typography } from "@mui/material";
import { getRecipeList } from "api";
import { HeaderBreadcumbs, Pagination } from "components";
import { RecipeModel, RecipeRequestModel } from "models";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RecipeItem } from "./components/RecipeItem";
import { useParams, useSearchParams } from "react-router-dom";

type ResponseModel = {
  items: RecipeModel[];
  maxPage: number;
  page: number;
};

const RecipeList = () => {
  const location = useLocation();
  const [response, setResponse] = useState<ResponseModel | null>();
  let [searchParams, setSearchParams] = useSearchParams();
  let searchKey = searchParams.get("searchKey");
  const [params, setParams] = useState<RecipeRequestModel>({
    FilterMode: 2,
    PageSize: 6,
    Page: 1,
    SearchKey: `${searchKey?.replaceAll("-", " ")}`,
  });

  const getRecipesData = async () => {
    const recipeList = await getRecipeList(params);
    setResponse(recipeList);
  };

  function handlePageChange(event: React.ChangeEvent<unknown>, page: number) {
    setParams({
      ...params,
      Page: page,
    });
  }

  useEffect(() => {
    getRecipesData();
  }, [params]);

  return (
    <>
      <HeaderBreadcumbs
        heading={`Kết Quả Tìm Kiếm: ${searchKey?.replaceAll("-", " ")}`}
        links={[{ name: "Trang chủ", to: "/" }, { name: "Kết Quả Tìm Kiếm" }]}
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
