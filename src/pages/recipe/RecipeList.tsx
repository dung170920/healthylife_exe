import { Button, CircularProgress, Grid, Stack } from "@mui/material";
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
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState<RecipeRequestModel>({
    FilterMode: 2,
    PageSize: 6,
    Page: 1,
    ...(location.pathname !== "/recipes" && {
      FoodTypeId: location.pathname.includes("foods") ? 2 : 1,
    }),
  });
  let user = useSelector((state: RootState) => state.auth.auth?.user);

  function handlePageChange(event: React.ChangeEvent<unknown>, page: number) {
    setParams({
      ...params,
      Page: page,
    });
  }

  const isForMember = (role: any, isMembershipOnly: boolean) => {
    if (
      role.includes("Membership") ||
      role.includes("Chef") ||
      role.includes("Admin")
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (location.pathname !== "/recipes") {
      setParams((params) => ({
        ...params,
        FoodTypeId: location.pathname.includes("foods") ? 2 : 1,
        Page: 1,
      }));
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsLoading(true);
    getRecipeList(params).then((res: ResponseModel) => {
      setResponse(res);
      setIsLoading(false);
    });
  }, [params]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadcumbs
          heading="Danh s??ch c??ng th???c"
          links={[{ name: "Trang ch???", to: "/" }, { name: "Danh s??ch m??n" }]}
        />
        {user?.role.includes("Admin") && (
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            onClick={() => navigate("add")}
          >
            Th??m m??n ??n
          </Button>
        )}
      </Stack>

      <Grid container spacing={6}>
        {isLoading ? (
          <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent="center"
          >
            <CircularProgress />
          </Stack>
        ) : (
          response?.items &&
          response?.items.map((item) => (
            <Grid item xs={4} key={item.id}>
              <Stack
                sx={{
                  // backgroundColor: "Black",
                  position: "relative",
                  // display: item.isMembershipOnly ? "" : "none",

                  "& .block_icon": {
                    position: "absolute",
                    top: "50%",
                    right: "50%",
                    transform: "translate(50%,-50%)",
                    // margin: "0 auto",
                    color: "#1AC073",
                    width: "80px",
                    height: "80px",
                  },
                }}
              >
                <RecipeItem
                  item={item}
                  // sx="40%"
                  isMember={isForMember(user?.role, item.isMembershipOnly)}
                  isFoodForMember={item.isMembershipOnly}
                />
              </Stack>
            </Grid>
          ))
        )}
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
