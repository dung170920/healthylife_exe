import { Grid, Typography, Stack, CircularProgress } from "@mui/material";
import { getRecipeList } from "api";
import { HeaderBreadcumbs, Pagination } from "components";
import { RecipeModel, RecipeRequestModel } from "models";
import React, { useEffect, useState } from "react";
import { RecipeItem } from "./components/RecipeItem";
import { useSearchParams } from "react-router-dom";

type ResponseModel = {
  items: RecipeModel[];
  maxPage: number;
  page: number;
};

const RecipeList = () => {
  const [response, setResponse] = useState<ResponseModel | null>();
  let [searchParams, setSearchParams] = useSearchParams();
  const [filterMode, setFilterMode] = useState(2);
  const [loading, setLoading] = useState(false);
  let searchKey = searchParams.get("searchKey");
  let recipeName = searchParams.get("RecipeName");
  const [params, setParams] = useState<RecipeRequestModel>({
    FilterMode: filterMode,
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
    setFilterMode(searchKey !== null ? 2 : 3);

    setParams((pre) => ({
      ...pre,
      SearchKey: `${searchKey?.replaceAll("-", " ")}`,
      recipeName: `${recipeName?.replaceAll("-", " ")}`,
      Page: 1,
    }));
  }, [searchParams]);

  useEffect(() => {
    setParams((pre) => ({ ...pre, FilterMode: filterMode, Page: 1 }));
  }, [filterMode]);

  useEffect(() => {
    setLoading(true);
    getRecipeList(params)
      .then((res) => {
        setResponse(res);
      })
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <>
      <HeaderBreadcumbs
        heading={`Kết Quả Tìm Kiếm: ${
          searchKey?.replaceAll("-", " ") || recipeName?.replaceAll("-", " ")
        }`}
        links={[{ name: "Trang chủ", to: "/" }, { name: "Kết Quả Tìm Kiếm" }]}
      />
      {loading ? (
        <Stack
          sx={{ height: "100%", width: "100%" }}
          alignItems={"center"}
          justifyContent="center"
        >
          <CircularProgress />
        </Stack>
      ) : response?.items.length !== 0 ? (
        <Grid container spacing={6}>
          {response?.items &&
            response.items.map((item) => (
              <Grid item xs={4} key={item.id}>
                <RecipeItem item={item} />
              </Grid>
            ))}
        </Grid>
      ) : (
        <Stack justifyContent="center">
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              marginBottom: "200px",
              marginTop: "40px",
            }}
          >
            Không tìm thấy món bạn cần tìm
          </Typography>
        </Stack>
      )}
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
