import React from "react";
import { Grid } from "@mui/material";
import { ChefModel } from "models";
import { HeaderBreadcumbs, Pagination } from "components";
import { ChefItem } from "./components/ChefItem";

const dummyChefData: ChefModel[] = [
  {
    id: "1",
    pictureUrl:
      "https://media.graphassets.com/resize=w:880,fit:crop,align:faces/compress=metadata:true/output=strip:true,f:webp/quality=value:85/tov4uZpWQMqgBxrP9TbO",
    fullName: "Gordon Ramsay",
    foodCount: 200,
  },
  {
    id: " 2",
    pictureUrl:
      "https://media.graphassets.com/resize=w:880,fit:crop,align:faces/compress=metadata:true/output=strip:true,f:webp/quality=value:85/tov4uZpWQMqgBxrP9TbO",
    fullName: "Gordon Ramsay",
    foodCount: 200,
  },
  {
    id: "3",
    pictureUrl:
      "https://media.graphassets.com/resize=w:880,fit:crop,align:faces/compress=metadata:true/output=strip:true,f:webp/quality=value:85/tov4uZpWQMqgBxrP9TbO",
    fullName: "Gordon Ramsay",
    foodCount: 200,
  },
  {
    id: "4",
    pictureUrl:
      "https://media.graphassets.com/resize=w:880,fit:crop,align:faces/compress=metadata:true/output=strip:true,f:webp/quality=value:85/tov4uZpWQMqgBxrP9TbO",
    fullName: "Gordon Ramsay",
    foodCount: 200,
  },
  {
    id: "4",
    pictureUrl:
      "https://media.graphassets.com/resize=w:880,fit:crop,align:faces/compress=metadata:true/output=strip:true,f:webp/quality=value:85/tov4uZpWQMqgBxrP9TbO",
    fullName: "Gordon Ramsay",
    foodCount: 200,
  },
  {
    id: "4",
    pictureUrl:
      "https://media.graphassets.com/resize=w:880,fit:crop,align:faces/compress=metadata:true/output=strip:true,f:webp/quality=value:85/tov4uZpWQMqgBxrP9TbO",
    fullName: "Gordon Ramsay",
    foodCount: 200,
  },
  {
    id: "4",
    pictureUrl:
      "https://media.graphassets.com/resize=w:880,fit:crop,align:faces/compress=metadata:true/output=strip:true,f:webp/quality=value:85/tov4uZpWQMqgBxrP9TbO",
    fullName: "Gordon Ramsay",
    foodCount: 200,
  },
  {
    id: "4",
    pictureUrl:
      "https://media.graphassets.com/resize=w:880,fit:crop,align:faces/compress=metadata:true/output=strip:true,f:webp/quality=value:85/tov4uZpWQMqgBxrP9TbO",
    fullName: "Gordon Ramsay",
    foodCount: 200,
  },
];

const ChefList = () => {
  return (
    <>
      <HeaderBreadcumbs
        heading="Danh sách đầu bếp"
        links={[{ name: "Trang chủ", to: "/" }, { name: "Danh sách đầu bếp" }]}
      />
      <Grid container spacing={4}>
        {dummyChefData.map((chef) => (
          <Grid item xs={3} key={chef.id}>
            <ChefItem item={chef} />
          </Grid>
        ))}
      </Grid>
      <Pagination page={1} onChange={(page) => {}} count={10} sx={{ my: 4 }} />
    </>
  );
};

export default ChefList;
