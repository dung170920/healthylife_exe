import { Grid } from "@mui/material";
import { HeaderBreadcumbs, Pagination } from "components";
import { RecipeModel } from "models";
import React from "react";
import { RecipeItem } from "./components/RecipeItem";

const dummyRecipeData: RecipeModel[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "Trứng cuộn ngũ sắc",
    chef: {
      id: 1,
      name: "Roberto Jr.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    description:
      "Trứng cuộn ngũ sắc vô cùng bắt mắt, lạ miệng là một món cuốn giúp tô điểm thêm ...",
    type: "Nước uống",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "Trứng cuộn ngũ sắc",
    chef: {
      id: 1,
      name: "Roberto Jr.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    type: "món ăn",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "Trứng cuộn ngũ sắc",
    chef: {
      id: 1,
      name: "Roberto Jr.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    type: "món ăn",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "Trứng cuộn ngũ sắc",
    chef: {
      id: 1,
      name: "Roberto Jr.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    type: "món ăn",
  },
];

const RecipeList = () => {
  return (
    <>
      <HeaderBreadcumbs
        heading="Danh sách công thức"
        links={[{ name: "Trang chủ", to: "/" }, { name: "Danh sách món" }]}
      />
      <Grid container spacing={6}>
        {dummyRecipeData.map((item) => (
          <Grid item xs={4} key={item.id}>
            <RecipeItem item={item} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={10} sx={{ my: 4 }} />
    </>
  );
};

export default RecipeList;
