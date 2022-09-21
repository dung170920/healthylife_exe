import React from "react";
import {
  Pagination as MUIPagination,
  PaginationItem,
  styled,
} from "@mui/material";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

type PaginationProps = {
  count: number;
  sx: Object;
};

const PaginationContainer = styled(MUIPagination)(({ theme }) => ({
  "& .MuiPagination-ul": {
    flexWrap: "nowrap",

    li: {
      borderRadius: 6,
      backgroundColor: theme.palette.grey[200],

      "> button": {
        height: 53,
        minWidth: 53,
        fontSize: 16,
      },

      ":first-of-type, :last-of-type": {
        "> button": {
          backgroundColor: theme.palette.primary.main,
          padding: "0 20px",
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

export const Pagination = ({ count, sx }: PaginationProps) => {
  return (
    <PaginationContainer
      count={count}
      shape="rounded"
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
