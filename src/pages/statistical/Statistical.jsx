import { HeaderBreadcumbs } from "components";
import { Select, MenuItem, Stack, Paper } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getStatisticalMenu } from "api/MenuApi";
import { useState, useEffect } from "react";

const Statistical = () => {
  const [months, setMonths] = useState([]);
  const [year, setYear] = useState(2022);
  const [totalCalo, setTotalCalo] = useState();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const convertMonth = (month) => {
    switch (month) {
      case 1: {
        return "Tháng 1";
      }
      case 2: {
        return "Tháng 2";
      }
      case 3: {
        return "Tháng 3";
      }
      case 4: {
        return "Tháng 4";
      }
      case 5: {
        return "Tháng 5";
      }
      case 6: {
        return "Tháng 6";
      }
      case 7: {
        return "Tháng 7";
      }
      case 8: {
        return "Tháng 8";
      }
      case 9: {
        return "Tháng 9";
      }
      case 10: {
        return "Tháng 10";
      }
      case 11: {
        return "Tháng 11";
      }
      case 12: {
        return "Tháng 12";
      }
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Biểu đồ thiêu thụ calories trong năm ${year}`,
      },
    },
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: "Tổng calories",
        data: totalCalo,
        borderColor: "#1AC073",
        backgroundColor: "#92E3A9",
      },
    ],
  };

  const handelChooseYear = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getStatisticalMenu(year);
      setMonths(res.map((month) => convertMonth(month.month)));
      setTotalCalo(res.map((calo) => calo.totalCalorie));
    };
    fetchData();
  }, [year]);
  return (
    <>
      <HeaderBreadcumbs
        heading="Thống kê tiêu thụ calories"
        links={[
          { name: "Trang chủ", to: "/" },
          { name: "Thống kê tiêu thụ calories" },
        ]}
      />

      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Stack direction="row" justifyContent="flex-end">
          <Select
            sx={{ width: "100px", backgroundColor: "#FFFF" }}
            value={year}
            label="Year"
            onChange={handelChooseYear}
            defaultValue={year}
          >
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
          </Select>
        </Stack>
        <Line options={options} data={data} />
      </Paper>
    </>
  );
};

export default Statistical;
