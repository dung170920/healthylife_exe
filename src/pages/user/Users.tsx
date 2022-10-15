import { HeaderBreadcumbs, DataTable, FilterTab } from "components";
import React, { useEffect, useState } from "react";
import { UsersRequestModel } from "models";
import { getUsers } from "api/index";

const User = () => {
  const [tab, setTab] = useState(1);
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });
  const [params, setParams] = useState<UsersRequestModel>({
    Mode: 1,
    Page: 1,
    PageSize: 10,
  });

  const gridOptions = {
    columns: [
      {
        headerName: "No",
        field: "no",
        width: 70,
      },
      {
        headerName: "Ảnh đại diện",
        field: "pictureUrl",
        type: "string",
        width: 120,
        renderCell: (cellValue: any) => {
          return (
            <div>
              <img
                className="avatar-cell"
                src={cellValue.value}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt=""
              ></img>
            </div>
          );
        },
      },
      {
        headerName: "Tên khách hàng",
        field: "fullName",
        width: 450,
      },

      {
        headerName: "Email",
        field: "email",
        type: "string",
        width: 300,
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

  const handleTabChange = async (
    event: React.SyntheticEvent,
    value: number
  ) => {
    setTab(value);
    setPageState((pre) => ({ ...pre, Page: 1 }));
  };

  const setParamWhenTabChanging = () => {
    switch (tab) {
      //Customer
      case 1: {
        setParams((pre) => ({ ...pre, Mode: 1 }));
        break;
      }

      //Chefs
      case 2: {
        setParams((pre) => ({ ...pre, Mode: 2 }));
        break;
      }
      case 3: {
        setParams((pre) => ({ ...pre, Mode: 0 }));
        break;
      }
      default:
        break;
    }
  };

  const fetchUserData = async () => {
    setPageState((old) => ({ ...old, isLoading: true, data: [] }));

    const res = await getUsers(params);

    const dataRow = res.items.map((item: any, i: number) => ({
      no: i + 1,
      id: item.id,
      fullName: item.fullName,
      pictureUrl: item.pictureUrl,
      email: item.email,
    }));

    setPageState((pre) => ({
      ...pre,
      isLoading: false,
      data: dataRow,
      total: res.total,
    }));
  };

  useEffect(() => {
    setParamWhenTabChanging();
  }, [tab]);

  useEffect(() => {
    fetchUserData();
  }, [params]);

  return (
    <>
      <HeaderBreadcumbs
        heading="Danh sách người dùng"
        links={[
          { name: "Trang chủ", to: "/" },
          { name: "Danh sách người dùng" },
        ]}
      />

      <FilterTab
        defaultValue={tab}
        tabs={[
          { label: "Customers", value: 1 },
          { label: "Chefs", value: 2 },
          { label: "Members", value: 3 },
        ]}
        sx={{ marginBottom: "20px" }}
        onChangeTab={handleTabChange}
      />

      <DataTable
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
      />
    </>
  );
};
export default User;
