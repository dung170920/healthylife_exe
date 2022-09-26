import React from "react";
import {
  Pagination as MUIPagination,
  PaginationItem,
  styled,
} from "@mui/material";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

type PaginationProps = {
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  sx: Object;
  page: number;
};

const PaginationContainer = styled(MUIPagination)(({ theme }) => ({
  "& .MuiPagination-ul": {
    flexWrap: "nowrap",

    li: {
      borderRadius: 6,

      "> button": {
        backgroundColor: theme.palette.grey[200],
        height: 48,
        minWidth: 48,
        fontSize: 16,
      },

      ":first-of-type, :last-of-type": {
        "> button": {
          backgroundColor: theme.palette.primary.main,
          padding: "0 32px",
          flexBasis: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          color: "white",
        },
      },

      ":first-of-type": {
        marginRight: "20px",
        "> button::after": {
          marginLeft: "10px",
          content: '"Previous"',
        },
      },
      ":last-of-type": {
        marginLeft: "20px",
        "> button::before": {
          marginRight: "10px",
          content: '"Next"',
        },
      },
    },
  },
}));

export const Pagination = ({ count, sx, onChange, page }: PaginationProps) => {
  return (
    <PaginationContainer
      count={count}
      page={page}
      shape="rounded"
      onChange={onChange}
      sx={{ float: "right", ...sx }}
      renderItem={(item) => (
        <>
          <PaginationItem
            components={{
              previous: HiChevronDoubleLeft,
              next: HiChevronDoubleRight,
            }}
            {...item}
          />
        </>
      )}
    />
  );
};
