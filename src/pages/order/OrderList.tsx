import { HeaderBreadcumbs, DataTable } from "components";
import React, { useEffect, useState } from "react";
import { OrderRequestModel } from "models/OrderModel";
import { styled, Box } from "@mui/material";
import { getPaymentHistory } from "api/PaymentApi";
import moment from "moment";

const StatusColorStyle = (status: string) => {
  switch (status) {
    case "Thành công": {
      return {
        color: "#FFFF",
        backgroundColor: "#1AC073",
      };
    }
    case "Chờ thanh toán": {
      return {
        color: "#FFFF",
        backgroundColor: "#FFC542",
      };
    }
    case "Đã hủy": {
      return {
        color: "#FFFF",
        backgroundColor: "#B72136",
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
        headerName: "Mã đơn hàng",
        field: "id",
        type: "string",
        width: 350,
      },

      {
        headerName: "Ngày giao dịch",
        field: "date",
        type: "string",
        width: 180,
      },
      {
        headerName: "Loại hình",
        field: "paymentType",
        type: "string",
        width: 100,
      },
      {
        headerName: "Khoảng tiền",
        field: "price",
        type: "number",
        align: "right",
        width: 150,
      },
      {
        headerName: "Trạng thái",
        field: "status",
        type: "string",
        // align: "right",
        width: 150,
        renderCell: (statusValue: any) => {
          return (
            <StatusStyle sx={StatusColorStyle(statusValue.value)}>
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

  const fetchOrderData = async () => {
    setPageState((old) => ({ ...old, isLoading: true, data: [] }));

    const res = await getPaymentHistory({
      page: params.Page,
      pageSize: params.PageSize,
    });

    const dataRow = res.items.map((item: any, i: number) => ({
      no: i + 1,
      id: item.paymentId,
      date: item.date,
      paymentType: item.paymentType,
      price: item.amount,
      status: item.status,
    }));

    setPageState((pre) => ({
      ...pre,
      isLoading: false,
      data: dataRow,
      total: res.total,
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
