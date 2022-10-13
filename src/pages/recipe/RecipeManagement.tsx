import {
  HeaderBreadcumbs,
  DataTable,
  CustomDialog,
  CustomSnackBar,
} from "components";
import React, { useEffect, useState } from "react";
import { OrderRequestModel } from "models/OrderModel";
import { getRecipesForSpecificChef, deleteRecipe } from "api/RecipeApi";
import { styled, Box, Typography, DialogActions, Button } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const RecipeManagement = () => {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteFood, setDeleteFood] = useState("");
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    message: "",
    status: false,
    type: "success",
  });

  const gridOptions = {
    columns: [
      {
        headerName: "No",
        type: "number",
        field: "no",
        width: 30,
      },
      {
        headerName: "Tên món",
        field: "name",
        type: "string",
        width: 400,
      },
      {
        headerName: "Loại",
        field: "type",
        type: "string",
        width: 100,
      },
      {
        headerName: "Dành cho thành viên",
        field: "isMembershipOnly",
        type: "boolean",
        width: 170,
      },
      {
        headerName: "Ngày tạo",
        field: "addDate",
        type: "string",
        width: 180,
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        sortable: false,
        filterable: false,
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<AiFillEye />}
            onClick={() => {
              navigate(`/recipes/recipe/${params.row.id}`);
            }}
            label="See details"
            showInMenu
          />,

          <GridActionsCellItem
            icon={<AiFillDelete />}
            onClick={() => {
              console.log("id: ", params.row.id);
              setDeleteFood(params.row.id);
              deleteDialogOpenCloseHandler();
            }}
            label="Delete food"
            showInMenu
          />,
        ],
      },
    ],
    pageState: pageState,
  };

  const pageChangeHandler = (newPage: number) => {
    // setParams((old) => ({ ...old, Page: newPage + 1 }));
    setPageState((old) => ({ ...old, page: newPage + 1 }));
  };

  const pageSizeChangeHandler = (newPageSize: number) => {
    // setParams((old) => ({ ...old, PageSize: newPageSize }));
    setPageState((old) => ({ ...old, pageSize: newPageSize }));
  };

  const deleteDialogOpenCloseHandler = () => {
    setIsDeleteDialogOpen(!isDeleteDialogOpen);
  };

  const deleteDialogContent = () => {
    return (
      <>
        <Typography align="center" variant="h5" mb={3}>
          Bạn có chắc xóa món này không
        </Typography>
        <DialogActions sx={{ marginTop: "auto" }}>
          <Button onClick={deleteDialogOpenCloseHandler}>Hủy</Button>
          <Button
            sx={{
              backgroundColor: "error.main",
              "&:hover": { backgroundColor: "error.dark" },
            }}
            type="submit"
            variant="contained"
            autoFocus
            onClick={async () => {
              setAlert({ message: "", status: false, type: "success" });
              await deleteRecipe(deleteFood);
              deleteDialogOpenCloseHandler();
              await fecthFoodData();
              setAlert({
                message: "Xóa món thành công !!!",
                status: true,
                type: "success",
              });
            }}
          >
            Xóa
          </Button>
        </DialogActions>
      </>
    );
  };
  const fecthFoodData = async () => {
    setPageState((old) => ({ ...old, isLoading: true, data: [] }));

    const res = await getRecipesForSpecificChef({
      FilterMode: "QueryFood",
      Page: pageState.page,
      PageSize: pageState.pageSize,
    });

    const dataRow = res.items.map((data: any, i: number) => ({
      no: i + 1,
      id: data.id,
      name: data.name,
      type: data.foodType.name,
      isMembershipOnly: data.isMembershipOnly,
      addDate: moment(data.addDate).format("DD/MM/yyyy HH:mm"),
    }));

    setPageState((old) => ({
      ...old,
      isLoading: false,
      data: dataRow,
      total: res.total,
    }));
  };
  useEffect(() => {
    fecthFoodData();
  }, [pageState.page, pageState.pageSize]);
  return (
    <>
      <HeaderBreadcumbs
        heading="Danh sách món của bạn"
        links={[
          { name: "Trang chủ", to: "/" },
          { name: "Danh sách món của bạn" },
        ]}
      />
      <DataTable
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
      />

      {/* Delete Dialog */}
      <CustomDialog
        isOpen={isDeleteDialogOpen}
        onClose={deleteDialogOpenCloseHandler}
        children={deleteDialogContent()}
        title="Xóa món"
        sx={{ "& .MuiDialog-paper": { width: "50%", height: "36%" } }}
      />

      {/* Alert message */}
      {alert?.status && (
        <CustomSnackBar
          message={alert.message}
          status={alert.status}
          type={alert.type}
        />
      )}
    </>
  );
};
export default RecipeManagement;
