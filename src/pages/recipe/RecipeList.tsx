import { Button, Grid, Stack } from "@mui/material";
import { getRecipeList } from "api";
import { HeaderBreadcumbs, Pagination } from "components";
import { RecipeModel, RecipeRequestModel } from "models";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "redux/store";
import { RecipeItem } from "./components/RecipeItem";
import { MdAdd } from "react-icons/md";

type ResponseModel = {
  items: RecipeModel[];
  maxPage: number;
  page: number;
};

const RecipeList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [response, setResponse] = useState<ResponseModel | null>();
  const [params, setParams] = useState<RecipeRequestModel>({
    FilterMode: 2,
    PageSize: 6,
    Page: 1,
  });
  let user = useSelector((state: RootState) => state.auth.auth?.user);

  function handlePageChange(event: React.ChangeEvent<unknown>, page: number) {
    setParams({
      ...params,
      Page: page,
    });
  }

  useEffect(() => {
    if (location.pathname !== "/recipes")
      setParams((params) => ({
        ...params,
        FoodTypeId: location.pathname.includes("foods") ? 2 : 1,
      }));
  }, [location.pathname]);

  useEffect(() => {
    getRecipeList(params).then((res: ResponseModel) => {
      setResponse(res);
    });
  }, [params]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadcumbs
          heading="Danh sách công thức"
          links={[{ name: "Trang chủ", to: "/" }, { name: "Danh sách món" }]}
        />
        {user?.role.includes("Admin") && (
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            onClick={() => navigate("add")}
          >
            Thêm món ăn
          </Button>
        )}
      </Stack>

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
