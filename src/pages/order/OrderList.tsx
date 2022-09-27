import { HeaderBreadcumbs, DataTable } from "components";
import React, { useEffect, useState } from "react";
import { OrderRequestModel } from "models/OrderModel";
import { styled, Box } from "@mui/material";
import moment from "moment";

const StatusColorStyle = (status: number) => {
  switch (status) {
    case 1: {
      return {
        color: "palette.primary.info.light",
        backgroundColor: "palette.primary.info.dark",
      };
    }
    case 2: {
      return {
        color: "palette.primary.error.light",
        backgroundColor: "palette.primary.error.dark",
      };
    }
    case 3: {
      return {
        color: "palette.primary.primary.light",
        backgroundColor: "palette.primary.primary.dark",
      };
    }
    default:
      break;
  }
};

const StatusStyle = styled(Box)(({ theme }) => ({
  padding: "4px 8px",
  fontSize: "12px",
  fontWeight: "600",
  borderRadius: "10px",
}));

const dummyOrderData = [
  {
    id: "495369",
    date: new Date(Date.UTC(96, 1, 2, 3, 4, 5)),
    fullName: "Lam Vo Khanh Phuong",
    price: 1000,
    status: 1,
  },
  {
    id: "495369",
    date: new Date(Date.UTC(96, 1, 2, 3, 4, 5)),
    fullName: "Lam Vo Khanh Phuong",
    price: 1000,
    status: 1,
  },
  {
    id: "495369",
    date: new Date(Date.UTC(96, 1, 2, 3, 4, 5)),
    fullName: "Lam Vo Khanh Phuong",
    price: 1000,
    status: 1,
  },
  {
    id: "495369",
    date: new Date(Date.UTC(96, 1, 2, 3, 4, 5)),
    fullName: "Lam Vo Khanh Phuong",
    price: 1000,
    status: 1,
  },
];

const OrderList = () => {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });
  const [params, setParams] = useState<OrderRequestModel>({
    Page: 1,
    PageSize: 10,
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
        headerName: "Order ID",
        field: "id",
        type: "string",

        width: 200,
      },

      {
        headerName: "Date",
        field: "date",
        type: "string",
        width: 250,
      },
      {
        headerName: "Customer Name",
        field: "fullName",
        type: "string",
        width: 400,
      },
      {
        headerName: "Price",
        field: "price",
        type: "number",
        align: "right",
        width: 100,
      },
      {
        headerName: "Status",
        field: "status",
        type: "string",
        align: "center",

        width: 100,
        renderCell: (statusValue: any) => {
          return (
            <StatusStyle sx={StatusColorStyle(statusValue)}>
              {statusValue.value}
            </StatusStyle>
          );
        },
      },
    ],
    pageState: pageState,
  };

  const pageChangeHandler = (newPage: number) => {
    setParams((old) => ({ ...old, Page: newPage + 1 }));
    setPageState((old) => ({ ...old, page: newPage + 1 }));
  };

  const pageSizeChangeHandler = (newPageSize: number) => {
    setParams((old) => ({ ...old, PageSize: newPageSize }));
    setPageState((old) => ({ ...old, pageSize: newPageSize }));
  };

  const fetchOrderData = () => {
    setPageState((old) => ({ ...old, isLoading: true, data: [] }));

    // const res = await getUsers(params);

    const dataRow = dummyOrderData.map((item: any, i: number) => ({
      no: i + 1,
      id: item.id,
      date: moment(item.date, "DD MM YYYY hh:mm:ss"),
      fullName: item.fullName,
      price: item.price,
      status: item.status,
    }));

    setPageState((pre) => ({
      ...pre,
      isLoading: false,
      data: [],
      total: 8,
    }));
  };

  useEffect(() => {
    fetchOrderData();
  }, [params]);

  return (
    <>
      <HeaderBreadcumbs
        heading="Danh sách đơn hàng"
        links={[{ name: "Trang chủ", to: "/" }, { name: "Danh sách đơn hàng" }]}
      />

      <DataTable
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
      />
    </>
  );
};

export default OrderList;
